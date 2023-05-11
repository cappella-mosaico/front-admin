import { ROOT_URL } from "../App";
import { useState, useCallback, useEffect } from 'react';
import { SundaySelector } from './SundaySelector';
import { EnhancedCompromissosTable } from './EnhancedCompromissosTable';

const DEFAULT_TIPO = 'ESCALA';
const DEFAULT_MINISTERIO = 'MOSAIKIDS';


function getNextSunday() {
  const today = new Date();
  const daysUntilNextSunday = 7 - today.getDay();
  const nextSunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilNextSunday);
  const year = nextSunday.getFullYear();
  const month = String(nextSunday.getMonth() + 1).padStart(2, '0');
  const day = String(nextSunday.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

function isEbd(inicio) {
  if (!inicio) {
    return false;
  }
  return new Date(inicio).getHours() < 12;
}

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
    const [ebd, setEbd] = useState(isEbd(selected?.inicio));

    const [compromissosByDate, setCompromissosByDate] = useState(new Map());
    const [salas, setSalas] = useState([]);
    const [atividades, setAtividades] = useState([]);
    const [enhanced, setEnhanced] = useState(ministerio === 'MOSAIKIDS');

    useEffect(() => {
      if (selected) {
        setId(selected.id);
        setNome(selected.nome);
        setInicio(selected.inicio.split("T")[0]);
        setEquipe(selected.equipes?.[0].equipe || selected.equipe || "");
        setEbd(isEbd(selected.inicio));
      } else {
        setTipo(DEFAULT_TIPO);
        setId("");
        setNome("");
        setEquipe("");
        setEbd(false);
      }

    }, [selected]);

    useEffect(() => setEnhanced(ministerio === 'MOSAIKIDS'), [ministerio]);

    useEffect(() => {
      const salas = new Set();
      const atividades = new Set();
      const byDate = compromissos.reduce((acc, compromisso) => {
        if (compromisso.sala) {
          salas.add(compromisso.sala);
        }
        if (compromisso.atividade) {
          atividades.add(compromisso.atividade);
        }

        const date = compromisso.inicio.substr(0, 10);
        acc.set(date, [compromisso, ...(acc.get(date) || [])]);
        return acc;
      }, new Map());
      setCompromissosByDate(byDate);
      setSalas([...salas]);
      setAtividades([...atividades]);

      if (byDate.get(inicio) && !enhanced) {
        select(byDate.get(inicio));
      } else {
        clearSelected();
      }
    }, [compromissos]);

    const resetForm = () => {
      const nextSunday = getNextSunday();
      setTipo(DEFAULT_TIPO);
      setMinisterio(DEFAULT_MINISTERIO);
      setId("");
      setNome("");
      setInicio(nextSunday);
      setEquipe("");
      setEbd(isEbd(nextSunday));
      clearSelected();
    };

    const publish = (e) => {
      e.preventDefault();

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          nome,
          local: "IP Mosaico",
          endereco: "Rua T-53, 480 - Setor Marista",
          inicio: inicio + (ebd ? "T10:00:00" : "T19:00:00"),
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
            compromisso.equipes[0].equipe = compromisso.equipes[0].equipe.join(", ");
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

    return (<form id="formCompromisso" onSubmit={publish}>
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
                                  enhanced={enhanced}
                                  salas={salas}
                                  atividades={atividades}
                  />
                  <label style={{fontWeight: 'bold', fontSize: 'x-small'}}>{id  && `#${id.split('-')[0]}`}</label>
                  <label htmlFor="ebd">
                    EBD:&nbsp;
                    <input type="checkbox" id="ebd" onChange={(e) => setEbd(!ebd)} checked={ebd} />
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
                  <button>salvar compromisso</button>
                { enhanced && <EnhancedCompromissosTable compromissos={compromissosByDate.get(inicio)}
                                                         salas={salas}
                                                         atividades={atividades}
                                                         loadCompromisso={select}
                                                         selectedSunday={inicio}
                                                         token={token}
                                                         setToken={setToken}
                                                         deleteCompromissoListado={deleteCompromissoListado}
                              /> }
            </fieldset>
              </div>
            </form>);

  };
