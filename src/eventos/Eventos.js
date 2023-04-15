import { useState, useEffect } from 'react';
import { ROOT_URL } from '../App.js';
import { Evento } from './Evento';

export const Eventos = ({ token, setToken }) => {

  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    if (token) {
      fetch(`${ROOT_URL}/eventos`)
        .then(response => response.json())
        .then(d => setEventos(d))
        .catch(error => console.error(error));
    }
  }, [token]);

  return (<>
          <h3>Eventos</h3>
          {eventos.map(e => <Evento key={e.id}
                                    evento={e}
                                    token={token}
                                    setToken={setToken}/>)}
          </>
         );
};
