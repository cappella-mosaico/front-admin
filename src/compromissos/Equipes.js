import { Equipe } from './Equipe';

export const Equipes = ({compromissos, sala, atividade, loadCompromisso, selectedSunday, token, setToken, deleteCompromissoListado}) => {
  const compromissosBySalaByAtividade = compromissos.filter(c => (c.sala === sala && c.atividade === atividade));
  const ebd = compromissosBySalaByAtividade.find(c => c.ebd);
  const culto = compromissosBySalaByAtividade.find(c => !c.ebd);
  
  if (!ebd && !culto) {
    return (<>
              <Equipe sala={sala}
                      atividade={atividade}
                      ebd={true}
                      {...({loadCompromisso, 
                            selectedSunday, 
                            token, 
                            setToken, 
                            deleteCompromissoListado})}
              />
              <Equipe sala={sala}
                      atividade={atividade}
                      ebd={false}
                      {...({loadCompromisso, 
                            selectedSunday, 
                            token, 
                            setToken, 
                            deleteCompromissoListado})}
              />
            </>);
  }
  
  return (<>
            <Equipe compromisso={ebd}
                    sala={sala}
                    atividade={atividade}
                    ebd={true}
                    {...({loadCompromisso, 
                          selectedSunday, 
                          token, 
                          setToken, 
                          deleteCompromissoListado})}
            />
            <Equipe compromisso={culto}
                    sala={sala}
                    atividade={atividade}
                    ebd={false}
                    {...({loadCompromisso, 
                          selectedSunday, 
                          token, 
                          setToken, 
                          deleteCompromissoListado})}
            />
          </>);
};
