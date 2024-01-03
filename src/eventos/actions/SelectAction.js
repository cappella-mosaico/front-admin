export const SelectAction = ({

                               id,
                               select,
                               dataInicial
                             }) => {
                        const edicaoHabilitada = new Date(dataInicial) > new Date(); //quando a data inicial for posterior à data atual
  return (<button
                  onClick={() => {
                    select(id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={!edicaoHabilitada}
  >editar</button>)
}
