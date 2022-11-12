import { useState } from 'react';
import { ROOT_URL } from '../App.js';

export const Dependente = ({dependente, token, participanteId, eventoId}) => {
  const [ isento, setIsento ] = useState(dependente.isento);
  const [ idade, setIdade ] = useState(dependente.idade);

  const handleChange = () => {
    dependente.isento = !isento;
    dependente.participanteId = participanteId;
    fetch(`${ROOT_URL}/eventos/${eventoId}/${participanteId}/dependentes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(dependente),
    }).then(response => setIsento(!isento))
    .catch(error => console.error(error));
  }

  const handleIdadeChange = ({ target: { value: idade } }) => {
    dependente.idade = idade;
    dependente.participanteId = participanteId;
    fetch(`${ROOT_URL}/eventos/${eventoId}/${participanteId}/dependentes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(dependente),
    }).then(response => setIdade(idade))
    .catch(error => console.error(error));
  }

  return (<tr>
            <td><small>{dependente.nome}</small></td>
            <td><input type="number"
                 step="1"
                 value={idade}
                 onChange={handleIdadeChange} /></td>

            <td></td>
            <td>
              <input type="checkbox"
                     checked={isento}
                     onChange={handleChange} />
            </td>          
          </tr>)
}
