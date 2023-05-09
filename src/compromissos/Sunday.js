import { ReactComponent as TeamIcon } from './team_icon.svg';

export const Sunday = ({
  sunday,
  selectedStyle,
  selectSunday,
  hasAssociatedTeam,
  enhanced
}) => {

  const ColoredTeams = () => {
    return (<div style={{marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{borderRadius: '9px', width: '18px', height: '18px', backgroundColor: '#C0392B', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{borderRadius: '5px', width: '10px', height: '10px', backgroundColor: 'white'}} />
        </div>
        <div style={{borderRadius: '9px', width: '18px', height: '18px', backgroundColor: '#8E44AD', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{borderRadius: '5px', width: '10px', height: '10px', backgroundColor: 'white'}} />
        </div>
        <div style={{borderRadius: '9px', width: '18px', height: '18px', backgroundColor: '#27AE60', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{borderRadius: '5px', width: '10px', height: '10px', backgroundColor: 'white'}} />
        </div>
        <div style={{borderRadius: '9px', width: '18px', height: '18px', backgroundColor: '#34495E', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{borderRadius: '5px', width: '10px', height: '10px', backgroundColor: 'white'}} />
        </div>
      </div>);
  }

  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      { enhanced && (<ColoredTeams />)}
      <button style={{maxWidth: '70px', backgroundColor: '#7B7D7D', borderColor: '#7B7D70', ...selectedStyle}}
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
