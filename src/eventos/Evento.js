import { useState, useEffect, useRef } from 'react';
import { CSVLink } from 'react-csv';
import { Participante } from './Participante';
import { ParticipanteForm } from './ParticipanteForm';
import { ROOT_URL } from '../App.js';

export const Evento = ({evento, token, setToken}) => {

  const [showParticipantes, setShowParticipantes] = useState(false);
  const [showFormParticipantes, setShowFormParticipantes] = useState(false);
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
        .then(d => setParticipantes(d))
        .catch(error => console.error(error));
    }
  }, [token, showParticipantes]);

  return (
    <>
      <div className="grid">
        <div>
          <span style={{fontWeight: 'bold', fontSize: '20pt'}}>{evento.titulo}</span>
          <br />
          <span style={{fontWeight: 'bold', fontSize: '16pt'}}>
            {new Date(evento.dataInicial).toLocaleDateString('pt-BR')}
          </span>
          <br />
          <span>Inscritos: {evento.quantidadePessoas}</span>
        </div>
        <div>
          <img src={evento.imagem} style={{maxWidth: '350px'}} />
        </div>
      </div>
      {!showParticipantes && <button onClick={() => setShowParticipantes(true)}>
                               carregar participantes
                             </button>}
      {showFormParticipantes && 
       <ParticipanteForm token={token} 
                         setToken={setToken}
                         eventoId={evento.id} 
                         hideForm={() => setShowFormParticipantes(false)}
       />
      }
      
      {showParticipantes &&    
       <>
         <div className="grid">
           <button onClick={() => setShowFormParticipantes(true)}>adicionar participante</button>
           <button onClick={() => setShowParticipantes(false)}>esconder participantes</button>
           {!showExportButton && <button onClick={() => setShowExportButton(true)}>exportar participantes</button>}
           {showExportButton && <CSVLink data={familias.current}>## DOWNLOAD ##</CSVLink>}
         </div>
         
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
       </>
      }
      <hr />
    </>
  );
};
