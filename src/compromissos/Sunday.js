import { useState } from 'react';
import { ReactComponent as TeamIcon } from './team_icon.svg';
import { generateHighContrastHexColor } from './hexColorGenerator';

export const Sunday = ({
  sunday,
  selectedStyle,
  selectSunday,
  hasAssociatedTeam,
  enhanced,
  compromissosBySunday,
  salas
}) => {
  const ColoredTeams = () => {
    console.log(compromissosBySunday);
    const isSalaVazia = (sala) => {
      return Math.floor(Math.random() * 10) % 2 === 0;
    };

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
                    { isSalaVazia(sala) &&
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
