import { useState, useEffect } from 'react';
import { ROOT_URL } from '../App.js';
import { Evento } from './Evento';

export const Eventos = ({token}) => {

  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    if (token) {
      fetch(`${ROOT_URL}/eventos`)
        .then(response => response.json())
        .then(d => {
          setEventos(d);
        })
        .catch(error => console.error(error));
    }
  }, [token]);

  return (eventos.map(e => <Evento key={e.id} evento={e} token={token} />));
}
