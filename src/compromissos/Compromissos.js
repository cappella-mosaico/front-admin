import { useState } from 'react';
import { CompromissosList } from './CompromissosList';
import { CompromissoForm } from './CompromissoForm';

export const Compromissos = ({ token, setToken }) => {
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

  return (<>
          <h3>Compromissos e Equipes</h3>

          <CompromissoForm
            token={token}
            setToken={setToken}
            updateCompromisso={updateCompromisso}
            addCompromisso={addCompromisso}
            selected={selected}
            clearSelected={clearSelected}
            select={select}
          />
          </>);

};
