import { DeleteAction } from "./DeleteAction";
import { SelectAction } from "./SelectAction";

export const Compromisso = ({ compromisso, token, setToken, deleteCompromissoListado, select }) => {
  const date = new Date(compromisso.inicio);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
  const formattedDate = date.toLocaleDateString('pt-BR', options);
  const formattedDateTime = `${formattedDate}`;

  return (<article>
            <header>
              <hgroup>
                <h5>{compromisso.ministerio}</h5>
                <h6>#{compromisso.id.split("-")[0]}</h6>
              </hgroup>
            </header>
            <table>
              <tbody>
                <tr>
                  <td><b>Líder</b></td>
                  <td>{compromisso.equipe.lider}</td>
                </tr>
                <tr>
                  <td><b>Equipe:</b></td>
                  <td>{compromisso.equipe.equipe}</td>
                </tr>
                <tr>
                  <td><b>Nome:</b></td>
                  <td>{compromisso.nome}</td>
                </tr>
                <tr>
                  <td><b>Domingo:</b></td>
                  <td>{formattedDateTime}</td>
                </tr>
              </tbody>
            </table>
            <footer className="grid">
              <SelectAction entity={compromisso}
                            select={select}/>
              <DeleteAction token={token}
                            setToken={setToken}
                            compromisso={compromisso}
                            deleteCompromissoListado={deleteCompromissoListado} />
            </footer>
          </article>);
};
