import { useState, useEffect } from 'react';
import { Dependente } from './Dependente.js';
import { ROOT_URL } from '../App.js';

export const Participante = ({eventoId, participante, token}) => {

  const [dependentes, setDependentes] = useState([]);
  const [isento, setIsento] = useState(participante.isento);
  const handleChange = () => {
    participante.isento = !isento;
    participante.eventoId = eventoId;
    fetch(`${ROOT_URL}/eventos/participante`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(participante),
    })
      .then(response => setIsento(!isento))
    .catch(error => console.error(error));
  }

  const loadDependentes = () => {
    fetch(`${ROOT_URL}/eventos/${eventoId}/${participante.id}/dependentes`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => response.json())
      .then(d => {
        setDependentes(d);
      })
    .catch(error => console.error(error));
  }

  useEffect(loadDependentes, [eventoId, participante, token])

  return (
    <div>

      <input type="checkbox" 
        checked={isento}
        onChange={handleChange} />
      {participante.nome}
      <br />
      {dependentes.map(d => <Dependente 
                       key={d.id} 
                       dependente={d}
                       token={token}
                       eventoId={eventoId}
                       participanteId={participante.id} /> 
                      )}

    </div>
  );
}
