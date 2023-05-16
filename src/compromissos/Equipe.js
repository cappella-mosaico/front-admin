import { DeleteAction } from './DeleteAction';
import { mappedPeriods } from './CompromissoForm';

export const Equipe = ({ compromisso, sala, atividade, loadCompromisso, selectedSunday, token, setToken, deleteCompromissoListado, periodo }) => {
  const id = compromisso?.id;
  const equipe = compromisso?.equipe?.participantes;
  const period = mappedPeriods.get(compromisso?.periodo || periodo || 'AMBOS');

  return(<div style={{display: 'flex', flexDirection: 'column', width: '180px', marginBottom: '10px'}}>
           <div style={{width: '100%',
                        background: '#101820',
                        borderRadius: '5px 5px 0px 0px',
                        boxSizing: 'border-box',
                        padding: '3px',
                        display: 'flex',
                        justifyContent: 'space-between'}}>
             <div style={{display: 'flex', alignItems: 'center'}}>
               <span style={{fontSize: '10pt', fontWeight: 'bold', color: 'whitesmoke'}}>
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
           <div title='Selecionar equipe'
                onClick={() => {
                  window.scrollTo({ top: 250, behavior: 'smooth' });
                  loadCompromisso({
                    id: id,
                    nome: `${sala}_${atividade}`,
                    inicio: `${selectedSunday}${period.fullTime}`,
                    equipe: equipe
                  });
                }
                        }
                style={{cursor: 'pointer',
                        width: '100%',
                        backgroundColor: 'whitesmoke',
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
