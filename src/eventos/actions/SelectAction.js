export const SelectAction = ({
                               id,
                               select
                             }) => {
  return (<button
                  onClick={() => {
                    select(id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
  >editar</button>)
}
