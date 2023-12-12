import { useState, useEffect } from 'react';
import { ROOT_URL } from '../App.js';
import { Evento } from './Evento';
import { EventoForm } from './EventoForm';

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
          <EventoForm token={token}
                      setToken={setToken}
                      setEventos={setEventos}
                      clearEvento={()=>{}}
                      eventos={eventos}/>
          {eventos.map(e => <Evento key={e.id}
                                    evento={e}
                                    token={token}
                                    setToken={setToken}/>)}
          </>
         );
};
