import { DeleteAction } from './DeleteAction';
import { mappedPeriods } from './CompromissoForm';

export const Equipe = ({ local, atividade, loadCompromisso, selectedSunday, token, setToken, deleteCompromissoListado, periodo, compromisso, selected }) => {
  const id = compromisso?.id;
  const equipe = compromisso?.equipe?.participantes;
  const period = mappedPeriods.get(compromisso?.periodo || periodo || 'AMBOS');


  const headerBackground = (selected?.id && selected.id === id) ? '#101820' : 'whitesmoke';
  const headerColor = (selected?.id && selected.id === id) ? 'whitesmoke' : '#101820';
  return(<div style={{display: 'flex', flexDirection: 'column', width: '180px', marginBottom: '10px'}}>
           <div style={{width: '100%',
                        background: headerBackground,
                        border: '1px solid lightgray',
                        borderRadius: '5px 5px 0px 0px',
                        boxSizing: 'border-box',
                        padding: '3px',
                        display: 'flex',
                        justifyContent: 'space-between'}}>
             <div style={{display: 'flex', alignItems: 'center'}}>
               <span style={{fontSize: '10pt', fontWeight: 'bold', color: headerColor}}>
                 {period.label}
               </span>
             </div>
             <div style={{cursor: 'pointer'}}>
               { compromisso && <DeleteAction token={token}
                                              setToken={setToken}
                                              compromisso={compromisso}
                                              deleteCompromissoListado={deleteCompromissoListado}>
                                🗑
                              </DeleteAction>
             }
             </div>
           </div>
           <div title={`Selecionar equipe ${equipe}`}
                onClick={() => {
                  window.scrollTo({ top: 250, behavior: 'smooth' });
                  loadCompromisso({
                    id,
                    nome: atividade,
                    local,
                    inicio: `${selectedSunday}${period.fullTime}`,
                    equipe
                  });
                }
                        }
                style={{cursor: 'pointer',
                        width: '100%',
                        backgroundColor: 'white',
                        padding: '3px',
                        display: 'flex',
                        boxSizing: 'border-box',
                        borderLeft: '1px solid lightgray',
                        borderRight: '1px solid lightgray',
                        borderBottom: '1px solid lightgray'
                       }}>
             <div>{equipe || <>☹<span style={{fontSize: '10pt'}}>Sem pessoas</span></> }</div>

           </div>

         </div>);
};
