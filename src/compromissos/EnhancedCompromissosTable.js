import { useState, useEffect } from 'react';
import { generateHighContrastHexColor } from './hexColorGenerator';

export const EnhancedCompromissosTable = ({ compromissos, salas, loadCompromisso, selectedSunday }) => {
  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    const atividades = new Set();
    const salas = new Set();
    if (compromissos) {
      compromissos.forEach(compromisso => {
        if (compromisso.atividade)
          atividades.add(compromisso.atividade);
        if (compromisso.sala)
          salas.add(compromisso.sala);
      });

      setAtividades([...atividades]);
    }
  }, [compromissos]);

  const Equipe = ({ id, equipe, sala, atividade, ebd }) => {
    return(<div style={{cursor: 'pointer'}} 
                onClick={() => loadCompromisso({
                  id: id,
                  nome: `${sala}_${atividade}`,
                  inicio: `${selectedSunday}T${ebd ? '10' : '19'}:00`,
                  equipe: equipe
                })}>
             {ebd ? '🌄' : '🌃'}
             {equipe || '☹'}
           </div>);
  };

  const showEquipe = (compromissos, sala, atividade) => {
    const compromissosBySalaByAtividade = compromissos.filter(c => (c.sala === sala && c.atividade === atividade));
    const ebd = compromissosBySalaByAtividade.find(c => c.ebd);
    const culto = compromissosBySalaByAtividade.find(c => !c.ebd);

    if (!ebd && !culto) {
      return(<Equipe sala={sala} 
                     atividade={atividade} 
                     ebd={!ebd} />);
    }

    return (<>
              <Equipe id={ebd?.id} equipe={ebd?.equipes[0].equipe} sala={sala} atividade={atividade} ebd={true}/>
              <br />
              <Equipe id={culto?.id} equipe={culto?.equipes[0].equipe} sala={sala} atividade={atividade} ebd={false}/>
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
