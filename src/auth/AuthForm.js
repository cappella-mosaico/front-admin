import {ROOT_URL} from "../App";
import {useCallback} from "react";

export const AuthForm = ({token, setToken}) => {
  const login = useCallback((event) => {
    event.preventDefault();

    const {usuario: {value: usuario}, senha: {value: senha}} = event.target.children;
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        usuario,
        senha,
      })
    }

    fetch(`${ROOT_URL}/pastorais/v1/auth/login`, requestOptions)
      .then(response => (response.json()))
      .then(responseBody => setToken(responseBody))
      .catch(error => {
        console.error(error);
        if (token) {
          setToken(null);
        }
      });
  }, [token, setToken]);

  if (token) {
    return (<button className="marginalized"
                    onClick={() => setToken(null)}>
      sair
    </button>)
  }

  return (<form onSubmit={login}>
    <input placeholder="usuario" name="usuario" autoComplete="username" className="auth" />
    <br />
    <input type="password" name="senha" placeholder="senha" autoComplete="current-password" className="auth" />
    <br /><br />
    <button className="marginalized">entrar</button>
  </form>);
}
