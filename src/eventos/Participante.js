import { useState, useEffect } from 'react';
import { Dependente } from './Dependente.js';
import { ROOT_URL } from '../App.js';

export const Participante = ({eventoId, participante, token}) => {

  const [dependentes, setDependentes] = useState([]);
  const loadDependentes = () => {

      fetch(`${ROOT_URL}/eventos/${eventoId}/${participante.id}/dependentes`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then(response => response.json())
        .then(d => {
          setDependentes(d);
          setLoaded(true);
        })
        .catch(error => console.error(error));

  }

  useEffect(loadDependentes, [eventoId, participante, token])

  return (
    <div>

      {participante.nome}
      <br />
      {dependentes.map(d => <Dependente key={d.id} dependente={d} />)}

    </div>
  );
}
