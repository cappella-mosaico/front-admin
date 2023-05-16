import { ROOT_URL } from "../App";
import { useState, useCallback, useEffect } from 'react';
import { SundaySelector } from './SundaySelector';
import { EnhancedCompromissosTable } from './EnhancedCompromissosTable';

const DEFAULT_TIPO = 'ESCALA';
const DEFAULT_MINISTERIO = 'MUSICA';

const AMBOS = {name: 'AMBOS', icon: '☀🌙', label: '☀🌙 Ambos', hour: 0, fullTime: 'T00:00:00'};
const EBD = {name: 'EBD', icon: '☀', label: '☀ EBD', hour: 10, fullTime: 'T10:00:00'};
const CULTO = {name: 'CULTO', icon: '🌙', label: '🌙 Culto', hour: 19, fullTime: 'T19:00:00'};
const periods = [AMBOS, EBD, CULTO];
export const mappedPeriods = periods.reduce((acc, p) => acc.set(p.name, p), new Map());


function getNextSunday() {
  const today = new Date();
  const daysUntilNextSunday = 7 - today.getDay();
  const nextSunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilNextSunday);
  const year = nextSunday.getFullYear();
  const month = String(nextSunday.getMonth() + 1).padStart(2, '0');
  const day = String(nextSunday.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function loadEbd(inicio) {
  if (!inicio) {
    return AMBOS;
  }

  const hour = new Date(inicio).getHours();
  let p;
  switch(hour) {
    case 0:
    p = AMBOS;
    break;

    case 10:
    p = EBD;
    break;

    default:
    p = CULTO;
  }
  return p;
};

export const CompromissoForm = ({
  token,
  setToken,
  compromissos,
  ministerio,
  setMinisterio,
  addCompromisso,
  updateCompromisso,
  select,
  selected,
  clearSelected,
  deleteCompromissoListado}) => {

    const [tipo, setTipo] = useState(DEFAULT_TIPO);
    const [id, setId] = useState(selected?.id || "");
    const [nome, setNome] = useState(selected?.nome || "");
    const [inicio, setInicio] = useState(selected?.inicio || getNextSunday());
    const [equipe, setEquipe] = useState(selected?.equipe || "");
    const [period, setPeriod] = useState(loadEbd(selected?.inicio));

    const [compromissosByDate, setCompromissosByDate] = useState(new Map());
    const [salas, setSalas] = useState([]);
    const [atividades, setAtividades] = useState([]);

    useEffect(() => {
      if (selected) {
        setId(selected.id);
        setNome(selected.nome);
        setInicio(selected.inicio.split("T")[0]);
        setEquipe(selected.equipe?.participantes || selected.equipe || "");
        setPeriod(loadEbd(selected.inicio));
      } else {
        setTipo(DEFAULT_TIPO);
        setId("");
        setNome("");
        setEquipe("");
        setPeriod(AMBOS);
      }

    }, [selected]);

    useEffect(() => {
      const salas = new Set();
      const atividades = new Set();
      const byDate = compromissos.reduce((acc, compromisso) => {
        const dateCompromisso = compromisso.inicio.substr(0, 10);

        acc.set(dateCompromisso, [compromisso, ...(acc.get(dateCompromisso) || [])]);
        return acc;
      }, new Map());

      compromissos.forEach(compromisso => {
        if (compromisso.inicio.substr(0, 8) === inicio.substr(0, 8)) {
          if (compromisso.sala) {
            salas.add(compromisso.sala);
          }
          if (compromisso.atividade) {
            atividades.add(compromisso.atividade);
          }          
        }
      });

      setCompromissosByDate(byDate);
      setSalas([...salas].sort());
      setAtividades([...atividades].sort());

      if (byDate.get(inicio)?.length > 0) {
        select(byDate.get(inicio)[0]);
      } else {
        clearSelected();
      }
    }, [compromissos, inicio]);

    const resetForm = () => {
      const nextSunday = getNextSunday();
      setTipo(DEFAULT_TIPO);
      setId("");
      setNome("");
      setEquipe("");
      clearSelected();
    };

    const publish = (e) => {
      e.preventDefault();
      const finalNome = nome.indexOf('_') >= 0 ? nome : `Templo_${nome}`;

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          nome: finalNome,
          local: "IP Mosaico",
          endereco: "Rua T-53, 480 - Setor Marista",
          inicio: inicio + period.fullTime,
          fim: "2023-04-22T21:00:00",
          tipo,
          ministerio,
          equipe
        })
      };

      fetch(`${ROOT_URL}/compromissos`, requestOptions)
        .then(response => response.json())
        .then(compromisso => {
          if (compromisso.id) {
            resetForm();
            compromisso.equipe.participantes = compromisso.equipe.participantes.join(", ");
            if (compromisso.nome.indexOf("_") >= 0) {
              const sala = compromisso.nome.split("_")[0];
              const atividade = compromisso.nome.split("_")[1];

              compromisso.sala = sala;
              compromisso.atividade = atividade;
            }
            if (selected?.id) {
              alert(`O compromisso ${compromisso.nome} alterado com sucesso.`);
              updateCompromisso(compromisso);
            } else {
              alert(`O compromisso ${compromisso.nome} cadastrado com sucesso.`);
              addCompromisso(compromisso);
            }
          } else {
            const error = `Falha ao cadastrar o compromisso.`;
            alert(error);
            throw new Error(error);
          }
        })
        .catch(error => {
          console.error(error);
          if (token) {
            setToken(null);
          }
        });

    };

    useEffect(() => {
      const compromissos = compromissosByDate.get(inicio) || [];
      const compromisso = compromissos.find(c => (c.nome === nome && ('T' + c.inicio.split('T')[1]) === period.fullTime)) || {
        nome,
        inicio: inicio.split('T')[0] + period.fullTime
      };
      select(compromisso);
    }, [period]);

    return (<>
              <div style={{display: 'flex', width: '100%'}}>
                <div style={{flex: '1'}}>
                  <div style={{ width: '100%' }}>
                    <legend>Ministério:</legend>
                    <label htmlFor="musica">
                      <input type="radio" id="musica" name="ministerio" value="MUSICA" onChange={(e) => setMinisterio(e.target.value)} checked={ministerio == "MUSICA"} />
                      Música
                    </label>
                    <label htmlFor="midia">
                      <input type="radio" id="midia" name="ministerio" value="MIDIA" onChange={(e) => setMinisterio(e.target.value)} checked={ministerio == "MIDIA"} />
                      Mídia
                    </label>
                    <label htmlFor="infantil">
                      <input type="radio" id="infantil" name="ministerio" value="MOSAIKIDS" onChange={(e) => setMinisterio(e.target.value)} checked={ministerio == "MOSAIKIDS"} />
                      MOSAIKIDS
                    </label>
                    <label htmlFor="diaconos">
                      <input type="radio" id="diaconos" name="ministerio" value="DIACONOS" onChange={(e) => setMinisterio(e.target.value)} checked={ministerio == "DIACONOS"} />
                      Diáconos
                    </label>
                  </div>
                  { atividades.length <= 2 && <EnhancedCompromissosTable 
                                                compromissos={compromissosByDate.get(inicio)}
                                                salas={salas}
                                                atividades={atividades}
                                                loadCompromisso={select}
                                                selectedSunday={inicio}
                                                token={token}
                                                setToken={setToken}
                                                deleteCompromissoListado={deleteCompromissoListado}
                                              />
                  }
                </div>

                <div style={{flex: '1'}}>
                  <form id="formCompromisso" onSubmit={publish}>
                    <input type="hidden"
                           name="id"
                           value={id}
                           onChange={(e) => setId(e.target.value)} />
                    <div className="grid">
                      <fieldset>
                        <SundaySelector value={inicio}
                                        selectDomingo={ domingo => setInicio(domingo) }
                                        compromissos={compromissosByDate}
                                        select={select}
                                        clearSelected={clearSelected}
                                        salas={salas}
                                        atividades={atividades}
                        />
                        <label htmlFor="ebd" style={{padding: '20px 0px 20px 0px'}}>
                          <div className="grid">
                            {periods.map(p => {
                              return (<div style={{width: '100%', marginBottom: '-40px'}} 
                                           key={p.name}>
                                        <button style={{
                                                  backgroundColor: 'whitesmoke',
                                                  color: '#101820',
                                                  borderColor: '#7B7D70',
                                                  ...(period == p ? { backgroundColor: '#101820', borderColor: '#101820', color: 'whitesmoke' } : {})}}
                                                onClick={(e) => {e.preventDefault(); 
                                                                 setPeriod(p);
                                                                }}>
                                          {p.label}
                                        </button>
                                        <label style={{ fontSize: 'x-small', 
                                                        textAlign: 'center', 
                                                        marginTop: '-20px',
                                                        color: 'lightgray'}}>
                                          &nbsp;{id && period === p  && `#${id.split('-')[0]}`}
                                        </label>
                                      </div>);
                            })}
                          </div>
                        </label>
                        <label>
                          Nome:
                          <input type="text"
                                 name="nome"
                                 placeholder="Louvor Culto"
                                 value={nome}
                                 onChange={(e) => setNome(e.target.value)}
                                 required />
                        </label>
                        <label htmlFor="equipe">
                          Equipe:
                          <input id="equipe"
                                 type="text"
                                 placeholder="José, Maria, João"
                                 value={equipe}
                                 onChange={(e) => setEquipe(e.target.value)}
                                 required />
                        </label>
                        <div className="grid">
                          <button>{id ? 'alterar' : 'salvar'}</button>
                          {id && <button onClick={(e) => {
                            e.preventDefault();
                            resetForm();
                          }}>novo</button>}
                        </div>
                      </fieldset>
                    </div>
                  </form>
                </div>
                
              </div>

              { atividades.length > 2 && <EnhancedCompromissosTable 
                                            compromissos={compromissosByDate.get(inicio)}
                                            salas={salas}
                                            atividades={atividades}
                                            loadCompromisso={select}
                                            selectedSunday={inicio}
                                            token={token}
                                            setToken={setToken}
                                            deleteCompromissoListado={deleteCompromissoListado}
                                          />
              }              
            </>);

  };
