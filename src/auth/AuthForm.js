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
    return (<button className="contrast"
                    onClick={() => setToken(null)}>
      sair
    </button>)
  }

  return (<form onSubmit={login}>
    <input placeholder="usuario" name="usuario" autoComplete="username"/>
    <input type="password" name="senha" placeholder="senha" autoComplete="current-password"/>
    <button>entrar</button>
  </form>);
}
