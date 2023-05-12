import { useState, useEffect } from 'react';
import { ROOT_URL } from "../App";
import { CompromissosList } from './CompromissosList';
import { CompromissoForm } from './CompromissoForm';

const DEFAULT_MINISTERIO = 'MOSAIKIDS';

export const Compromissos = ({ token, setToken }) => {
  const [ministerio, setMinisterio] = useState(DEFAULT_MINISTERIO);
  const [compromissos, setCompromissos] = useState([]);
  const [selected, select] = useState();
  const clearSelected = () => select(null);
  const addCompromisso = (c) => setCompromissos([c, ...compromissos]);

  const deleteCompromissoListado = (compromissoId) => {
    const semItemRemovido = compromissos.filter(c => c.id !== compromissoId);
    setCompromissos(semItemRemovido);
  };

  const updateCompromisso = (compromisso) => {
    const semItemRemovido = compromissos.filter(c => c.id !== compromisso.id);
    setCompromissos([compromisso, ...semItemRemovido]);
  };

  useEffect(() => {
    if (token) {
      fetch(`${ROOT_URL}/compromissos?ministerio=${ministerio}&compromissosDoPassado=true`)
        .then(response => response.json())
        .then(d => {
          d.map(comp => {
            comp.equipes.forEach(e => e.equipe = e.equipe.join(", "));
            if (comp.nome.indexOf("_") >= 0) {
              const sala = comp.nome.split("_")[0];
              const atividade = comp.nome.split("_")[1];
              
              comp.sala = sala;
              comp.atividade = atividade;
            }
          });
          setCompromissos(d);
        }).catch(error => console.error(error));
    }
  }, [token, ministerio]);

  return (<>
          <h3>Compromissos e Equipes</h3>

          <CompromissoForm
            compromissos={compromissos}
            ministerio={ministerio}
            setMinisterio={setMinisterio}
            token={token}
            setToken={setToken}
            updateCompromisso={updateCompromisso}
            addCompromisso={addCompromisso}
            selected={selected}
            clearSelected={clearSelected}
            select={select}
            deleteCompromissoListado={deleteCompromissoListado}
          />
          </>);

};
