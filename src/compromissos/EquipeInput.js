export const EquipeInput = ({ sugestoes = [], equipe, setEquipe }) => {
  return (
    <>
      <label htmlFor="equipe">
        Equipe:
      </label>
      {
        sugestoes
          .filter(pessoa => !equipe.includes(pessoa))
          .map(pessoa => (<a key={pessoa}
                             href="#"
                             role="button"
                             className="secondary"
                             style={{margin: '0px 4px 4px 0px'}}
                             onClick={(e) => {
                               e.preventDefault();
                               if (equipe.trim().length == 0) {
                                 setEquipe(pessoa);
                               } else {
                                 setEquipe(equipe + ', ' + pessoa);
                               }

                             }}>
                            <small>
                              {pessoa}
                            </small>
                          </a>))
      }

      <textarea id="equipe"
                type="text"
                placeholder="José, Maria, João"
                value={equipe}
                onChange={(e) => setEquipe(e.target.value)}
                required />
    </>
  );
}
