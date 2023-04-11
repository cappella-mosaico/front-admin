import { useEffect } from 'react';
import { ROOT_URL } from '../App.js';
import { Compromisso } from './Compromisso';

export const CompromissosList = ({ token, compromissos, addCompromisso, setCompromissos }) => {

  useEffect(() => {
    if (token) {
      fetch(`${ROOT_URL}/compromissos?ministerio=Música`)
        .then(response => response.json())
        .then(d => {
          setCompromissos(d);
        })
        .catch(error => console.error(error));
    }
  }, [token]);

  return (compromissos.map(c => <Compromisso
                           key={c.id}
                           compromisso={c}
                           token={token} />));
}
