import { ReactComponent as TeamIcon } from './team_icon.svg';

export const Sunday = ({
  sunday,
  selectedStyle,
  selectSunday,
  hasAssociatedTeam
}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div style={{marginBottom: '-9px', display: 'flex'}}>
        <div style={{borderRadius: '9px', width: '17px', height: '17px', backgroundColor: '#C0392B', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{borderRadius: '5px', width: '10px', height: '10px', backgroundColor: 'white'}} />
        </div>
        <div style={{borderRadius: '9px', width: '17px', height: '17px', backgroundColor: '#8E44AD', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{borderRadius: '5px', width: '10px', height: '10px', backgroundColor: 'white'}} />
        </div>
        <div style={{borderRadius: '9px', width: '17px', height: '17px', backgroundColor: '#27AE60', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{borderRadius: '5px', width: '10px', height: '10px', backgroundColor: 'white'}} />
        </div>
        <div style={{borderRadius: '9px', width: '17px', height: '17px', backgroundColor: '#34495E', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{borderRadius: '5px', width: '10px', height: '10px', backgroundColor: 'white'}} />
        </div>
      </div>
    <button style={{maxWidth: '70px', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', ...selectedStyle}}
            onClick={(e) => {
              e.preventDefault();
              selectSunday(sunday);
            }}>
      { hasAssociatedTeam && <TeamIcon /> }
      { sunday.getDate() }
    </button>
    </div>
  );
  
};
