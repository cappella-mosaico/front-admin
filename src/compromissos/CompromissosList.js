import { useEffect, useState } from 'react';
import { ROOT_URL } from '../App.js';
import { Compromisso } from './Compromisso';
import { CompromissosFilter } from './CompromissosFilter';

export const CompromissosList = ({ token, compromissos, addCompromisso, setCompromissos }) => {

  const [ministerioFilter, setMinisterioFilter] = useState("Música");
  const [passadoFilter, setPassadoFilter] = useState(true);

  useEffect(() => {
    if (token) {
      fetch(`${ROOT_URL}/compromissos?ministerio=${ministerioFilter}&compromissosDoPassado=${passadoFilter}`)
        .then(response => response.json())
        .then(d => {
          setCompromissos(d);
        })
        .catch(error => console.error(error));
    }
  }, [token, ministerioFilter, passadoFilter]);

  return (<>
            <CompromissosFilter
              ministerio={ministerioFilter}
              passado={passadoFilter}
              setMinisterio={setMinisterioFilter}
              setPassado={setPassadoFilter} />
            {compromissos.map(c => <Compromisso
                                     key={c.id}
                                     compromisso={c}
                                     token={token} />)}
          </>);
};
