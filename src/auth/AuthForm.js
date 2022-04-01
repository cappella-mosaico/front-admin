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

    fetch(`${ROOT_URL}/auth/login`, requestOptions)
      .then(response => (response.json()))
      .then(responseBody => setToken(responseBody))
      .catch(error => {
        console.error(error);
        setToken(null);
      });
  }, [token]);

  if (token) {
    return (<button onClick={() => setToken(null)}>logout</button>)
  }

  return (<form onSubmit={login}>
    <input placeholder="usuario" name="usuario" />
    <br />
    <input type="password" name="senha" placeholder="senha" />
    <br /><br />
    <button>login</button>
  </form>);
}
