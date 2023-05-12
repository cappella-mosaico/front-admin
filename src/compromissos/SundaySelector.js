import { useState, useEffect } from 'react';
import { Sunday } from './Sunday';

function getSundaysInMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const sundays = [];

  // Get the first Sunday in the month
  let firstSunday = new Date(year, month, 1 + (7 - new Date(year, month, 1).getDay()) % 7);
  sundays.push(new Date(firstSunday));

  // Get all the other Sundays in the month
  while (firstSunday.getMonth() === month) {
    firstSunday.setDate(firstSunday.getDate() + 7);
    if (firstSunday.getMonth() == month) {
      sundays.push(new Date(firstSunday));
    }
  }

  // Return the array of Sundays
  return sundays;
}

function getFirstSundayOfPreviousMonth(inputDate) {
  const date = new Date(inputDate);
  let month = date.getUTCMonth() - 1;
  if (month < 0) {
    month = 11; // December of previous year
    date.setFullYear(date.getFullYear() - 1); // Subtract one year from date
  }
  date.setMonth(month);
  date.setDate(1);
  while (date.getDay() !== 0) {
    date.setDate(date.getDate() + 1);
  }
  return date;
}

function getFirstSundayOfNextMonth(inputDate) {
  const date = new Date(inputDate);
  let month = date.getUTCMonth() + 1;
  if (month > 11) {
    month = 0; // January of next year
    date.setFullYear(date.getFullYear() + 1); // Add one year from date
  }
  date.setMonth(month);
  date.setDate(1);
  while (date.getDay() !== 0) {
    date.setDate(date.getDate() + 1);
  }
  return date;
}

function formatDate(date) {
  return date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + (date.getUTCDate() -1).toString().padStart(2, "0");
}

export const SundaySelector = ({ value, selectDomingo, select, clearSelected, compromissos, salas, atividades }) => {
  const [selectedSunday, selectSunday] = useState(new Date(value.split('-')[0], value.split('-')[1]-1, value.split('-')[2]));
  const [domingos, setDomingos] = useState([]);
  const [compromissosBySunday, setCompromissosBySunday] = useState();

  useEffect(() => {
    setDomingos(getSundaysInMonth(selectedSunday));
    selectDomingo(selectedSunday.toISOString().substring(0, 10));

    const compromissoAtThisDate = compromissos.get(selectedSunday.toISOString().substring(0, 10));
    if (compromissoAtThisDate) {
      select(compromissoAtThisDate?.[0]);
    } else {
      clearSelected();
    }
  }, [selectedSunday]);

  useEffect(() => {
    selectSunday(new Date(value.split('-')[0], value.split('-')[1]-1, value.split('-')[2]));
  }, [value]);

  useEffect(() => setCompromissosBySunday(compromissos.get(value)), [value, compromissos]);

  return (
    <>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          { domingos.map(d => {
            const selectedStyle = d.getTime() == selectedSunday.getTime() ? { backgroundColor: '#101820', borderColor: '#101820', color: 'whitesmoke' } : {};
            const hasAssociatedTeam = compromissos.get(d.toISOString().substring(0, 10));
            return (<Sunday key={d}
                            sunday={d}
                            selectedStyle={selectedStyle}
                            hasAssociatedTeam={hasAssociatedTeam}
                            selectSunday={selectSunday}
                            compromissosBySunday={compromissos}
                            salas={salas}
                            atividades={atividades}
                    />);
          })
          }
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <button
            style={{width: '70px'}}
            onClick={(e) => {
              e.preventDefault();
              const previousMonth = getFirstSundayOfPreviousMonth(selectedSunday);
              selectSunday(previousMonth);
          }}>
            &lsaquo;&lsaquo;
          </button>

          <div style={{display: 'flex', placeContent: 'center'}}>
            { selectedSunday.toLocaleString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) }
            &nbsp;
          </div>

          <button style={{width: '70px'}}
                  onClick={(e) => {
                    e.preventDefault();
                    const nextMonth = getFirstSundayOfNextMonth(selectedSunday);
                    selectSunday(nextMonth);
                  }}>
            &rsaquo;&rsaquo;
          </button>
        </div>
    </>
  );
};
