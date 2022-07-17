import { useCallback, useEffect } from "react";
import { ROOT_URL } from "../App";

export const AuthForm = ({token, setToken, tokenExpirationTime}) => {
  const login = useCallback((event) => {
    event.preventDefault();

    const {usuario: {value: username}, senha: {value: password}} = event.target.children;
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username,
        password
      })
    }

    fetch(`${ROOT_URL}/login`, requestOptions)
      .then(response => (response.json()))
      .then(responseBody => setToken(responseBody.token))
      .catch(error => {
        console.error(error);
        if (token) {
          setToken(null);
        }
      });
  }, [token, setToken]);

  useEffect(() => {
    const intervalId = token && setInterval(() => {
      if (tokenExpirationTime < Date.now()) {
        setToken(null);
        clearInterval(intervalId);
      }

    }, 1000);
    return () => clearInterval(intervalId);
  });

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
