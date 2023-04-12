export const Compromisso = ({ compromisso, token }) => {
  console.log(compromisso);
  const date = new Date(compromisso.inicio);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
  const formattedDate = date.toLocaleDateString('pt-BR', options);
  const formattedTime = date.toLocaleTimeString('pt-BR', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false });
  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return (<article>
            <header><strong>{compromisso.tipo} - {compromisso.ministerio}</strong></header>
            <div className="grid">
            <table>
            <tbody>
              <tr>
                <td><b>equipes:</b></td>
                <td>{compromisso.equipes}</td>
              </tr>
              <tr>
                <td><b>nome:</b></td>
                <td>{compromisso.nome}</td>
              </tr>
              <tr>
                <td><b>inicio:</b></td>
                <td>{formattedDateTime}</td>
              </tr>
              <tr>
                <td><b>local:</b></td>
                <td>{compromisso.local}</td>
              </tr>
              <tr>
                <td><b>endereco:</b></td>
                <td>{compromisso.endereco}</td>
              </tr>
          </tbody>
            </table>
            <img src={compromisso.imagem} width="300"/>
            </div>
            <footer className="grid">
              <button>editar</button>
              <button>apagar</button>
            </footer>
          </article>);
}
