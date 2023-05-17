import { Equipe } from './Equipe';

export const Equipes = ({compromissos, local, atividade, loadCompromisso, selectedSunday, token, setToken, deleteCompromissoListado, selected}) => {
  const compromissosBySalaByAtividade = compromissos.filter(c => (c.local === local && c.atividade === atividade));
  const ebd = compromissosBySalaByAtividade.find(c => c.periodo === 'EBD');
  const culto = compromissosBySalaByAtividade.find(c => c.periodo === 'CULTO');
  const ambos = compromissosBySalaByAtividade.find(c => c.periodo === 'AMBOS');

  if (!ebd && !culto && !ambos) {
    return (<Equipe atividade={atividade}
                    {...({loadCompromisso,
                          selectedSunday,
                          token,
                          setToken,
                          deleteCompromissoListado,
                          local})}
            />);
  }

  if (ambos) {
    return (<>
            <Equipe compromisso={ambos}
                    atividade={atividade}
                    {...({loadCompromisso,
                          selectedSunday,
                          token,
                          setToken,
                          deleteCompromissoListado,
                          selected,
                          local})}
            />
              {ebd && <span style={{fontSize: '8pt',
                                    color: '#101820',
                                    backgroundColor: 'hsl(10, 85%, 95%)',
                                    borderRadius: '5px',
                                    border: '1px solid hsl(10, 85%, 41%)',
                                    width: '180px',
                                    padding: '5px',
                                    whiteSpace: 'break-spaces',
                                    display: 'block',
                                    marginBottom: '5px'
                                   }}>
                        Escala de <b>EBD</b> encontrada. Apague a escala de <b>Ambos</b> os períodos para visualizar.
                      </span>}

              {culto && <span style={{fontSize: '8pt',
                                      color: '#101820',
                                      backgroundColor: 'hsl(10, 85%, 95%)',
                                      borderRadius: '5px',
                                      border: '1px solid hsl(10, 85%, 41%)',
                                      width: '180px',
                                      padding: '5px',
                                      whiteSpace: 'break-spaces',
                                      display: 'block',
                                      marginBottom:'5px'}}>
                        Escala de <b>Culto</b> encontrada. Apague a escala de <b>Ambos</b> os períodos para visualizar.
                      </span>}
            </>);
  }

  return (<>
            <Equipe compromisso={ebd}
                    atividade={atividade}
                    periodo='EBD'
                    {...({loadCompromisso,
                          selectedSunday,
                          token,
                          setToken,
                          deleteCompromissoListado,
                          selected,
                          local})}
            />
            <Equipe compromisso={culto}
                    atividade={atividade}
                    periodo='CULTO'
                    {...({loadCompromisso,
                          selectedSunday,
                          token,
                          setToken,
                          deleteCompromissoListado,
                          selected,
                          local})}
            />
          </>);
};
