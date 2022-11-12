import { useState, useEffect } from 'react';
import { Dependente } from './Dependente.js';
import { ROOT_URL } from '../App.js';

export const Participante = ({eventoId, participante, token}) => {

  const [dependentes, setDependentes] = useState([]);
  const [valorPago, setValorPago] = useState(participante.valorPago);
  const [isento, setIsento] = useState(participante.isento);
  const [idade, setIdade] = useState(participante.idade);

  const handleIsentoChange = () => {
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

  const handleValorChange = ({target: { value: valorPago }}) => {
    participante.valorPago = valorPago;
    participante.eventoId = eventoId;
    fetch(`${ROOT_URL}/eventos/participante`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(participante),
    })
      .then(response => setValorPago(valorPago))
    .catch(error => console.error(error));
  }

  const handleIdadeChange = ({target: { value: idade }}) => {
    participante.idade = idade;
    participante.eventoId = eventoId;
    fetch(`${ROOT_URL}/eventos/participante`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(participante),
    })
      .then(response => setIdade(idade))
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
    <>
    <tr>
      <td><strong><h5>{participante.nome}</h5></strong></td>
      <td><input type="number"
                 step="1"
                 value={idade}
                 onChange={handleIdadeChange} /></td>
      <td>
        <input type="number"
               min="0.00"
               step="0.01"
               value={valorPago}
               onChange={handleValorChange} />
      </td>
      <td>
        <input type="checkbox"
               checked={isento}
               onChange={handleIsentoChange} />
      </td>
    </tr>


      {dependentes.map(d => <Dependente
                       key={d.id}
                       dependente={d}
                       token={token}
                       eventoId={eventoId}
                       participanteId={participante.id} />
                      )}
    </>
  );
}
