import { CompromissosList } from './CompromissosList';

export const Compromissos = ({ token, setToken }) => {
  return (<div>
          formulario de cadastro de compromissos
          <br />
          formulario de cadastro de equipes
          <br />
          <CompromissosList token={token} />
          </div>);
}
