import { useState, useEffect } from 'react';
import { generateHighContrastHexColor } from './hexColorGenerator';
import { Equipes } from './Equipes'; 

export const EnhancedCompromissosTable = ({ compromissos = [], salas, atividades, loadCompromisso, selectedSunday, token, setToken, deleteCompromissoListado}) => {
  if (compromissos.length === 0 || selectedSunday.split('-')[1] !== new Date().toISOString().split('-')[1]) {
    const split = selectedSunday.split('-');
    const date = new Date(split[0], split[1]-1, split[2]);
    const formatted = date.toLocaleString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
    return (<article style={{width: '400px'}}>
                <header>
                  <hgroup>
                    <h5>nenhuma escala cadastrada</h5>
                    <h6>{ formatted }</h6>
                  </hgroup>
                </header>
                Preencha os nomes no formulário ao lado e salve.
            </article>);
  }

  return (<table>
            <thead>
              <tr>
                <td>Local</td>
                {atividades.map(atividade => (<td key={atividade}>{atividade}</td>))}
              </tr>
            </thead>
            <tbody>
              {salas.map(sala => (<tr key={sala}>
                                 <td style={{color: generateHighContrastHexColor(sala)}}>{sala}</td>
                                    {atividades.map(atividade => (
                                      <td key={sala + '-' + atividade}>
                                        <Equipes compromissos={compromissos}
                                                 sala={sala}
                                                 atividade={atividade}
                                                 {...({loadCompromisso, 
                                                       selectedSunday, 
                                                       token, 
                                                       setToken, 
                                                       deleteCompromissoListado})}
                                        />
                                      </td>))}
                                  </tr>))}
            </tbody>
          </table>);
};
