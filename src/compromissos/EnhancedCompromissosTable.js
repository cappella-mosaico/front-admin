import { useState, useEffect } from 'react';
import { generateHighContrastHexColor } from './hexColorGenerator';
import { DeleteAction } from './DeleteAction';

export const EnhancedCompromissosTable = ({ compromissos = [], salas, atividades, loadCompromisso, selectedSunday, token, setToken, deleteCompromissoListado}) => {
  const Equipe = ({ compromisso, sala, atividade, ebd }) => {
    const id = compromisso?.id;
    const equipe = compromisso?.equipes[0]?.equipe;

    const timingIcon = ebd ? '🌄' : '🌃';
    const timingBackgroundStyle = ebd ? "lightgray" : "lightgray";
    return(<div style={{display: 'flex', flexDirection: 'column', width: '180px', marginBottom: '10px'}}>
             <div style={{width: '100%',
                          background: timingBackgroundStyle,
                          borderRadius: '5px 5px 0px 0px',
                          boxSizing: 'border-box',
                          padding: '3px'}}>
               {timingIcon}
             </div>
             <div title='Selecionar equipe'
                  onClick={() => loadCompromisso({
               id: id,
               nome: `${sala}_${atividade}`,
               inicio: `${selectedSunday}T${ebd ? '10' : '19'}:00`,
               equipe: equipe
             })}
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
               <div>{equipe || '☹'}</div>
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

  const showEquipe = (compromissos, sala, atividade) => {
    const compromissosBySalaByAtividade = compromissos.filter(c => (c.sala === sala && c.atividade === atividade));
    const ebd = compromissosBySalaByAtividade.find(c => c.ebd);
    const culto = compromissosBySalaByAtividade.find(c => !c.ebd);
    if (!ebd && !culto) {
      return (<>
                <Equipe sala={sala}
                        atividade={atividade}
                        ebd={true}
                />
                {ebd && culto && <br />}
                <Equipe sala={sala}
                        atividade={atividade}
                        ebd={false}
                />
              </>);
    }

    return (<>
              <Equipe compromisso={ebd}
                      sala={sala}
                      atividade={atividade}
                      ebd={true}
              />
              {ebd && culto && <br />}
              <Equipe compromisso={culto}
                      sala={sala}
                      atividade={atividade}
                      ebd={false}
              />
            </>);
  };

  return (<table>
            <thead>
              <tr>
                <td>Sala</td>
                {atividades.map(atividade => (<td key={atividade}>{atividade}</td>))}
              </tr>
            </thead>
            <tbody>
              {salas.map(sala => (<tr key={sala}>
                                 <td style={{color: generateHighContrastHexColor(sala)}}>{sala}</td>
                                    {atividades.map(atividade => (
                                      <td key={sala + '-' + atividade}>
                                        {showEquipe(compromissos, sala, atividade)}
                                      </td>))}
                                  </tr>))}
            </tbody>
          </table>);
};
