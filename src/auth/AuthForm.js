import { useCallback, useEffect, useState } from "react";
import { ROOT_URL } from "../App";

export const AuthForm = ({token, setToken, tokenExpirationTime}) => {
  const [error, setError] = useState("");

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
      .then(responseBody => {
        setToken(responseBody.token);
        setError('');
        })
      .catch(error => {
        console.error(error);
        setError('Usuário ou Senha inválidos');
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
    <div className='authForm'style={{}}>
      <div>
      {error && <h6>Ocorreu um erro ao logar! {error} </h6>}
        <h1>Administração do aplicativo da IP Mosaico</h1>
      </div>
      <div style={{maxWidth: '600px', backgroundColor: 'white', padding: '10px', borderRadius: '10px'}}>
        <form onSubmit={login}>
          <input placeholder="usuario" name="usuario" autoComplete="username"/>
          <input placeholder="senha" type="password" name="senha" autoComplete="current-password"/>
          <button>entrar</button>
        </form>

        

        

      </div>
    </div>
    
  );
};
