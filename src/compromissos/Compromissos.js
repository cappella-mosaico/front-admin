import { useState, useEffect } from 'react';
import { ROOT_URL } from "../App";
import { CompromissoForm } from './CompromissoForm';

const DEFAULT_MINISTERIO = 'MUSICA';

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
            comp.equipe.participantes = comp.equipe.participantes.join(", ");
            comp.atividade = comp.nome;
          });
          setCompromissos(d);
        }).catch(error => console.error(error));
    }
  }, [token, ministerio]);

  return (<>
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
