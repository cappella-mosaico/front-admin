import { useState, useEffect } from 'react';
import { ReactComponent as TeamIcon } from './team_icon.svg';
import { generateHighContrastHexColor } from './hexColorGenerator';

export const Sunday = ({
  sunday,
  selectedStyle,
  selectSunday,
  hasAssociatedTeam,
  enhanced,
  compromissosBySunday,
  salas,
  atividades
}) => {
  const [salasVazias, setSalasVazias] = useState(new Map());
  console.log(compromissosBySunday);

  useEffect(() => {
    const vazias = new Map();
    salas.forEach(sala => {
      vazias.set(sala, compromissosBySunday?.filter(compromisso => compromisso.sala === sala).length !== 2 * atividades.length); // 2 pq tem ebd e culto
    });
    setSalasVazias(vazias);
  }, [salas, atividades, compromissosBySunday, sunday]);

  const ColoredTeams = () => {
    return (<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

              {salas.map(sala => {
                const color = generateHighContrastHexColor(sala);
                return (
                  <div key={sala} 
                       title={sala} 
                       style={{borderRadius: '0px 0px 9px 9px', 
                               width: '17.5px', 
                               height: '18px',
                               backgroundColor: color,
                               display: 'flex',
                               alignItems: 'center',
                               justifyContent: 'center',
                               marginBottom: '-18px',
                               zIndex: '1'}}>
                    { salasVazias.get(sala) &&
                      <div style={{borderRadius: '5px',
                                   width: '10px',
                                   height: '10px',
                                   backgroundColor: selectedStyle.backgroundColor || 'white'}} />
                    }

                  </div>);
              })}
            </div>);
              };
              
              return (
              <div style={{width: '100%',
                           display: 'flex',
                           flexDirection: 'column',
                           alignItems: 'center'}}>
                { enhanced && (<ColoredTeams />)}
                <button style={{maxWidth: '70px',
                                backgroundColor: 'whitesmoke',
                                color: '#101820',
                                borderColor: '#7B7D70',
                                minHeight: '92.8px',
                                ...selectedStyle}}
                        onClick={(e) => {
                          e.preventDefault();
                          selectSunday(sunday);
                        }}>
                  { !enhanced && hasAssociatedTeam && <TeamIcon /> }
                  { sunday.getDate() }
                </button>
              </div>
              );
  
};
