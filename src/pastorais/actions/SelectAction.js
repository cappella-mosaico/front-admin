export const SelectAction = ({
                               pastoral,
                               selectPastoral
                             }) => {
  return (<button
                  onClick={() => {
                    selectPastoral(pastoral.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
  >editar</button>)
}
