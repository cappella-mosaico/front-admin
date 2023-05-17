import { useState, useEffect } from 'react';
import { generateHighContrastHexColor } from './hexColorGenerator';

export const Sunday = ({
  sunday,
  selectedStyle,
  selectSunday,
  hasAssociatedTeam,
  compromissosBySunday,
  locais,
  atividades
}) => {
  const [salasVazias, setSalasVazias] = useState(new Map());
  useEffect(() => {
    const vazias = new Map();
    locais.forEach(sala => {
      const isoSunday = sunday.toISOString().substring(0, 10);
      const numberCompromissosThisSunday = compromissosBySunday?.get(isoSunday)?.filter(compromisso => compromisso.local === sala).reduce((acc, compromisso) => acc + (compromisso.periodo === 'AMBOS' ? 2 : 1), 0);
      vazias.set(sala, numberCompromissosThisSunday !== (2 * atividades.length)); // 2 pq tem ebd e culto
    });
    setSalasVazias(vazias);
  }, [locais, atividades, compromissosBySunday, sunday]);

  const ColoredTeams = () => {
    return (<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

              {locais.map(sala => {
                const color = generateHighContrastHexColor(sala);
                return (
                  <div key={sala} 
                       title={sala} 
                       style={{borderRadius: '0px 0px 9px 9px', 
                               width: '17.5px', 
                               height: '18px',
                               backgroundColor: color,
                               boxSizing: 'border-box',
                               borderBottom: '1px solid white',
                               display: 'flex',
                               alignItems: 'center',
                               justifyContent: 'center',
                               marginBottom: '-18px',
                               zIndex: '1'}}>
                    { salasVazias.get(sala) &&
                      <div style={{borderRadius: '5px',
                                   width: '10px',
                                   height: '10px',
                                   backgroundColor: 'white'}} />
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
                { (<ColoredTeams />)}
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
                  { sunday.getDate() }
                </button>
              </div>
              );
  
};
