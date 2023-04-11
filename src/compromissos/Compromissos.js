import { useState } from 'react';
import { CompromissosList } from './CompromissosList';
import { CompromissoForm } from './CompromissoForm';

export const Compromissos = ({ token, setToken }) => {
  const [compromissos, setCompromissos] = useState([]);
  const addCompromisso = (c) => {
    setCompromissos([c, ...compromissos]);
  }

  return (<>
          <h3>Compromissos e Equipes</h3>

          <CompromissoForm
          token={token}
          setToken={setToken}
          addCompromisso={addCompromisso} />
          <br />
          formulario de cadastro de equipes
          <br />

          <CompromissosList
          token={token}
          compromissos={compromissos}
          addCompromisso={addCompromisso}
          setCompromissos={setCompromissos}/>

          </>);
}
