export const SelectAction = ({
                               entity,
                               select
                             }) => {
  return (<button
                  onClick={() => select(entity.id)}
  >editar</button>)
}
