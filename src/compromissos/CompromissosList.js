import { useEffect, useState } from 'react';
import { ROOT_URL } from '../App.js';
import { Compromisso } from './Compromisso';
import { CompromissosFilter } from './CompromissosFilter';

export const CompromissosList = ({ token,
                                   setToken,
                                   compromissos,
                                   setCompromissos,
                                   deleteCompromissoListado,
                                   select }) => {

  const [ministerioFilter, setMinisterioFilter] = useState("MUSICA");
  const [passadoFilter, setPassadoFilter] = useState(false);

  useEffect(() => {
    if (token) {
      fetch(`${ROOT_URL}/compromissos?ministerio=${ministerioFilter}&compromissosDoPassado=${passadoFilter}`)
        .then(response => response.json())
        .then(d => {
          d.map(comp => comp.equipes.forEach(e => e.equipe = e.equipe.join(", ")));
          setCompromissos(d);
        }).catch(error => console.error(error));
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
                                     token={token}
                                     setToken={setToken}
                                     deleteCompromissoListado={deleteCompromissoListado}
                                     select={select} />
                             )}
          </>);
};
