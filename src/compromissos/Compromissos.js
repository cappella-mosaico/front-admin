import { CompromissosList } from './CompromissosList';
import { CompromissoForm } from './CompromissoForm';

export const Compromissos = ({ token, setToken }) => {
  return (<>
          <h3>Compromissos e Equipes</h3>
          <CompromissoForm token={token} />
          <br />
          formulario de cadastro de equipes
          <br />
          <CompromissosList token={token} />
          </>);
}
