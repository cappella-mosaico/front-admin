export const CompromissosFilter = ({ ministerio, passado, setMinisterio, setPassado }) => {
  const flipMinisterio = () => {
    if (ministerio == "Música") {
      setMinisterio("Mídia");
    } else {
      setMinisterio("Música");
    }
  }

  const flipPassado = () => {
    setPassado(!passado);
  }

  return (<span>
          { ministerio } - { passado }
          <button onClick={flipMinisterio}>flip ministerio</button>
          <button onClick={flipPassado}>flip passado</button>
          </span>)
}
