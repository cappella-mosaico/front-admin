export const CompromissosFilter = ({ ministerio, passado, setMinisterio, setPassado }) => {
  return (<>
            <hr />
            <h5>Filtros</h5>
            <div className="grid">
              <fieldset>
                <legend>Ministério</legend>
                <label htmlFor="musicaFilter">
                  <input type="radio"
                         id="musicaFilter"
                         name="ministerio"
                         value="Música"
                         defaultChecked
                         onChange={(e) => setMinisterio(e.target.value)} />
                  Música
                </label>
                <label htmlFor="midiaFilter">
                  <input type="radio"
                         id="midiaFilter"
                         name="ministerio"
                         value="Mídia"
                         onChange={(e) => setMinisterio(e.target.value)} />
                  Mídia
                </label>
                <label htmlFor="infantilFilter">
                  <input type="radio"
                         id="infantilFilter"
                         name="ministerio"
                         value="MOSAIKIDS"
                         onChange={(e) => setMinisterio(e.target.value)} />
                  MOSAIKIDS
                </label>
                <label htmlFor="acampamentoFilter">
                  <input type="radio"
                         id="acampamentoFilter"
                         name="ministerio"
                         value="Acampamento"
                         onChange={(e) => setMinisterio(e.target.value)} />
                  Acampamento
                </label>
              </fieldset>

              <label htmlFor="passadoCheck">
                <input type="checkbox"
                       id="passadoCheck"
                       checked={passado}
                       onChange={() => setPassado(!passado)} />
                Visualizar compromissos antigos
              </label>
            </div>
          </>);
};
