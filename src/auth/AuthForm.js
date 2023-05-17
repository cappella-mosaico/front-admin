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
    };

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
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <h3 style={{flex: 6}}>Administração do aplicativo da IP Mosaico</h3>
        <div style={{flex: 1}}>
          <button className="contrast"
                  onClick={() => setToken(null)}>
            sair
          </button>
        </div>
      </div>);
  }

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '200px'}}>
      <h1>Administração do aplicativo da IP Mosaico</h1>
      <div style={{maxWidth: '600px'}}>
        <form onSubmit={login}>
          <input placeholder="usuario" name="usuario" autoComplete="username"/>
          <input type="password" name="senha" placeholder="senha" autoComplete="current-password"/>
          <button>entrar</button>
        </form>
      </div>
    </div>
    
  );
};
