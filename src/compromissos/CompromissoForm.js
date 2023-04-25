import { ROOT_URL } from "../App";
import { useState, useCallback, useEffect } from 'react';

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

export const CompromissoForm = ({
  token,
  setToken,
  addCompromisso,
  updateCompromisso,
  selected,
  clearSelected }) => {

    const [tipo, setTipo] = useState(DEFAULT_TIPO);
    const [ministerio, setMinisterio] = useState(DEFAULT_MINISTERIO);
    const [id, setId] = useState(selected?.id || "");
    const [nome, setNome] = useState(selected?.nome || "");
    const [inicio, setInicio] = useState(selected?.inicio || getNextSunday());
    const [equipe, setEquipe] = useState(selected?.equipe || "");

    useEffect(() => {
      if (selected) {
        setId(selected.id);
        setNome(selected.nome);
        setInicio(selected.inicio.split("T")[0]);
        setEquipe(selected.equipes[0].equipe || "");
      }

    }, [selected]);

    const resetForm = () => {
      setTipo(DEFAULT_TIPO);
      setMinisterio(DEFAULT_MINISTERIO);
      setId("");
      setNome("");
      setInicio(getNextSunday());
      setEquipe("");
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
          inicio: inicio + "T00:00:00",
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
                </fieldset>

                <fieldset>
                  <label>
                    Nome:
                    <input type="text"
                           name="nome"
                           placeholder="Louvor Culto"
                           value={nome}
                           onChange={(e) => setNome(e.target.value)}
                           required />
                  </label>
                  <label htmlFor="inicio">
                    Domingo:
                    <input type="date"
                           name="inicio"
                           value={inicio}
                           min="2023-04-23"
                           max="2030-12-28"
                           step="7"
                           onChange={(e) => setInicio(e.target.value)}
                           required />
                  </label>
                  <label htmlFor="equipe">
                    Equipe:
                    <textarea id="equipe"
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
