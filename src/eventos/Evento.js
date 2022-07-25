import { useState, useEffect } from 'react';
import { Participante } from './Participante';
import { ROOT_URL } from '../App.js';

export const Evento = ({evento, token}) => {

  const [showParticipantes, setShowParticipantes] = useState(false);
  const [participantes, setParticipantes] = useState([]);

  useEffect(() => {
    if (token) {
      fetch(`${ROOT_URL}/eventos/${evento.id}/participantes`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then(response => response.json())
        .then(d => {
          setParticipantes(d);
        })
        .catch(error => console.error(error));
    }
  }, [token]);


  return (
    <div>
      <strong>{evento.titulo}</strong> possui 
      <strong>&nbsp;{participantes.length}</strong> famílias somando
      <strong>&nbsp;{evento.quantidadePessoas}</strong> pessoas
      <table>
        <tbody>
          <tr>
            <th>Nome</th>
            <th>Isento</th>
          </tr>
          {participantes.map(p => <Participante 
                                key={p.id} 
                                participante={p} 
                                eventoId={evento.id} 
                                token={token} />)}
        </tbody>
      </table>
    </div>
  );
}
