export const SelectAction = ({
                               pastoral,
                               selectPastoral
                             }) => {
  return (<button
                  onClick={() => selectPastoral(pastoral.id)}
  >editar</button>)
}
