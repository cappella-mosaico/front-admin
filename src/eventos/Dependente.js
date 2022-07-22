import { useState } from 'react';
import { ROOT_URL } from '../App.js';

export const Dependente = ({dependente, token, participanteId, eventoId}) => {
  const [ isento, setIsento ] = useState(dependente.isento);

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

  return (<>
            <input type="checkbox"
                   checked={isento}
                   onChange={handleChange} />
            &nbsp;&nbsp;&nbsp;&nbsp;\__ {dependente.nome}
            <br/>
          </>)
}
