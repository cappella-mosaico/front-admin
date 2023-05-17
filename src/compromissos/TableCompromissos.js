import { useState, useEffect } from 'react';
import { generateHighContrastHexColor } from './hexColorGenerator';
import { Equipes } from './Equipes';

export const TableCompromissos = ({ compromissos = [], locais, atividades, loadCompromisso, selectedSunday, token, setToken, deleteCompromissoListado, selected}) => {
  if (compromissos.length === 0 && locais.length === 0 && atividades.length === 0) {
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
              {locais.map(local => (<tr key={local}>
                                 <td>
                                   <div style={{color: 'white',
                                                backgroundColor: generateHighContrastHexColor(local),
                                                borderRadius: '5px',
                                                padding: '5px'}}>
                                     {local}
                                   </div>
                                 </td>
                                    {atividades.map(atividade => (
                                      <td key={local + '-' + atividade}>
                                        <Equipes compromissos={compromissos}
                                                 local={local}
                                                 atividade={atividade}
                                                 {...({loadCompromisso,
                                                       selectedSunday,
                                                       token,
                                                       setToken,
                                                       deleteCompromissoListado,
                                                       selected})}
                                        />
                                      </td>))}
                                  </tr>))}
            </tbody>
          </table>);
};
