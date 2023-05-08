import { ROOT_URL } from "../App";
import { useState, useCallback, useEffect } from 'react';
import { SundaySelector } from './SundaySelector';

const DEFAULT_TIPO = 'ESCALA';
const DEFAULT_MINISTERIO = 'MUSICA';

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
  addCompromisso,
  updateCompromisso,
  select,
  selected,
  clearSelected }) => {

    const [tipo, setTipo] = useState(DEFAULT_TIPO);
    const [ministerio, setMinisterio] = useState(DEFAULT_MINISTERIO);
    const [id, setId] = useState(selected?.id || "");
    const [nome, setNome] = useState(selected?.nome || "");
    const [inicio, setInicio] = useState(selected?.inicio || getNextSunday());
    const [equipe, setEquipe] = useState(selected?.equipe || "");
    const [ebd, setEbd] = useState(isEbd(selected?.inicio));

    const [compromissos, setCompromissos] = useState([]);
    const [compromissosByDate, setCompromissosByDate] = useState(new Map());

    useEffect(() => {
      if (selected) {
        setId(selected.id);
        setNome(selected.nome);
        setInicio(selected.inicio.split("T")[0]);
        setEquipe(selected.equipes[0].equipe || "");
        setEbd(isEbd(selected.inicio));
      } else {
        setTipo(DEFAULT_TIPO);
        setId("");
        setNome("");
        setEquipe("");
        setEbd(false);
      }

    }, [selected]);

    useEffect(() => {
      if (token) {
        fetch(`${ROOT_URL}/compromissos?ministerio=${ministerio}&compromissosDoPassado=true`)
          .then(response => response.json())
          .then(d => {
            d.map(comp => comp.equipes.forEach(e => e.equipe = e.equipe.join(", ")));
            setCompromissos(d);
          }).catch(error => console.error(error));
      }
    }, [token, ministerio]);

    useEffect(() => {
      const byDate = compromissos.reduce((acc, obj) => {
        acc.set(obj.inicio.substr(0, 10), obj);
        return acc;
      }, new Map());
      setCompromissosByDate(byDate);

      if (byDate.get(inicio)) {
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
            if (selected) {
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
                  <label htmlFor="acampamento">
                    <input type="radio" id="acampamento" name="ministerio" value="ACAMPAMENTO" onChange={(e) => setMinisterio(e.target.value)} checked={ministerio == "ACAMPAMENTO"} />
                    Acampamento
                  </label>
                  <table>
                    <thead>
                      <tr>
                        <td>Nome</td>
                        <td>História</td>
                        <td>Atividade</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{color: '#C0392B'}}>3-5 anos</td>
                        <td>
                          ☀ João
                          <br />
                          🌙 Maria
                        </td>
                        <td>
                          ☀ João
                          <br />
                          🌙 Maria
                        </td>
                        {/*                      <td><button>editar</button></td>
                           <td><button>apagar</button></td>*/}
                      </tr>
                      <tr>
                        <td style={{color: '#8E44AD'}}>6-11 anos</td>
                        <td>
                          ☀ Mateus
                          <br />
                          🌙 Mia, Isaac
                        </td>
                        <td>
                          ☀ Mateus
                          <br />
                          🌙 Mia, Isaac
                        </td>
                        {/*                      <td><button>editar</button></td>
                           <td><button>apagar</button></td>*/}
                      </tr>
                      <tr>
                        <td style={{color: '#27AE60'}}>Berçário</td>
                        <td>
                          ☀ Joyce, Fabiana
                          <br />
                          🌙 Mariana, Alana
                        </td>
                        <td>
                          ☀ Joyce, Fabiana
                          <br />
                          🌙 Mariana, Alana
                        </td>
                        {/*                      <td><button>editar</button></td>
                           <td><button>apagar</button></td>*/}
                      </tr>
                      <tr>
                        <td style={{color: '#34495E'}}>Louvor</td>
                        <td>
                          ☀ Walvir
                          <br />
                          🌙 Alberto
                        </td>
                        <td>
                          ☀ Walvir
                          <br />
                          🌙 Alberto
                        </td>
                        {/*                      <td><button>editar</button></td>
                           <td><button>apagar</button></td>*/}
                      </tr>
                    </tbody>
                  </table>
                </fieldset>

{/*                <ul>
                  <li>mosaikids precisa inserir vários compromissos para o mesmo dia, uns de EBD e uns dos subministerios</li>
                  <li>mosaikids precisa visualizar quais compromissos deveriam estar cadastrados, mas não estão</li>
                  <li>mosaikids precisa visualizar com facilidade quem foi cadastrado em cada dia e o que vai fazer</li>
                  <li>os outros ministerios talvez também precisem cadastrar duas escalas por causa da EBD (mas não acho que seja o caso)</li>
                </ul>*/}

                <fieldset>
                  <SundaySelector value={inicio}
                                   selectDomingo={ domingo => setInicio(domingo) }
                                   compromissos={compromissosByDate}
                                   select={select}
                                   clearSelected={clearSelected}
                  />
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
                </fieldset>
              </div>
              <div className="grid">
                <button>salvar compromisso</button>
              </div>
            </form>);

  };
