import { DeleteAction } from './DeleteAction';

export const Equipe = ({ compromisso, sala, atividade, ebd, loadCompromisso, selectedSunday, token, setToken, deleteCompromissoListado }) => {
  const id = compromisso?.id;
  const equipe = compromisso?.equipes[0]?.equipe;
  
  const timingIcon = ebd ? '☀' : '🌙';
  const timingBackgroundStyle = '#373737';
  return(<div style={{display: 'flex', flexDirection: 'column', width: '180px', marginBottom: '10px'}}>
           <div style={{width: '100%',
                        background: timingBackgroundStyle,
                        borderRadius: '5px 5px 0px 0px',
                        boxSizing: 'border-box',
                        padding: '3px'}}>
             {timingIcon} <span style={{fontSize: '10pt', fontWeight: 'bold', color: 'white'}}>{ebd ? '10' : '19'}:00</span>
           </div>
           <div title='Selecionar equipe'
                onClick={() => {
                  window.scrollTo({ top: 250, behavior: 'smooth' });
                  loadCompromisso({
                    id: id,
                    nome: `${sala}_${atividade}`,
                    inicio: `${selectedSunday}T${ebd ? '10' : '19'}:00`,
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
             { compromisso && <DeleteAction token={token}
                                            setToken={setToken}
                                            compromisso={compromisso}
                                            deleteCompromissoListado={deleteCompromissoListado}>
                                🗑
                              </DeleteAction>
             }
           </div>
           
         </div>);
};
