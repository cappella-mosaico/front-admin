export const SelectAction = ({
                               entity,
                               select
                             }) => {
  return (<button
                  onClick={() => {
                    select(entity.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
  >editar</button>)
}
