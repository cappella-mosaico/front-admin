export const SelectAction = ({
                               entity,
                               select
                             }) => {
  return (<button className="marginalized"
                  onClick={() => select(entity.id)}
  >editar</button>)
}
