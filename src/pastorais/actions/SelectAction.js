export const SelectAction = ({
                               pastoral,
                               selectPastoral
                             }) => {
  return (<button className="marginalized"
                  onClick={() => selectPastoral(pastoral.id)}
  >editar</button>)
}
