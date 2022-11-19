import { useState, useEffect, useRef } from 'react';
import { CSVLink } from 'react-csv';
import { Participante } from './Participante';
import { ROOT_URL } from '../App.js';

export const Evento = ({evento, token}) => {

  const [showParticipantes, setShowParticipantes] = useState(false);
  const [participantes, setParticipantes] = useState([]);
  const [showExportButton, setShowExportButton] = useState(false);
  const familias = useRef([]);

  useEffect(() => {
    if (token && showParticipantes) {
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
  }, [token, showParticipantes]);

  if (!showParticipantes) {
    return (
      <div>
        <span>{evento.titulo} de {new Date(evento.dataInicial).toLocaleString('pt-BR')} à {new Date(evento.dataFinal).toLocaleString('pt-BR')} </span>
        <br />
        <a href="#" onClick={() => setShowParticipantes(true)}>mostrar participantes</a>
      </div>
    );
  }


  return (
    <div>
      <strong>{evento.titulo}</strong> possui 
      <strong>&nbsp;{participantes.length}</strong> famílias somando
      <strong>&nbsp;{evento.quantidadePessoas}</strong> pessoas
      <br />
      <a href="#" onClick={() => setShowParticipantes(false)}> esconder participantes</a>
      <br />
      
      {!showExportButton && <a href="#" onClick={() => {setShowExportButton(true)}}>exportar participantes</a>}
      {showExportButton && <CSVLink data={familias.current}>
        ## DOWNLOAD ##
      </CSVLink>}
      
      <table>
        <tbody>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Valor Pago</th>
            <th>Isento</th>
          </tr>
          {participantes.map(p => <Participante 
                                key={p.id} 
                                participante={p} 
                                eventoId={evento.id} 
                                token={token}
                                familias={familias}/>)}
        </tbody>
      </table>
    </div>
  );
}
