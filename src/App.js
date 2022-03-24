import './App.css';
import {useEffect, useState} from "react";

const ROOT_URL = 'http://localhost:9090/pastorais';

function PastoralForm({token, setToken}) {

  if (!token) {
    return null;
  }

  const publish = (e) => {
    e.preventDefault();
    const {autor: {value: autor}, titulo: {value: titulo}, descricao: {value: descricao}} = e.target.children;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        autor,
        titulo,
        descricao
      })
    }

    fetch(`${ROOT_URL}/create`, requestOptions)
      .then(response => response.json())
      .then(d => console.debug(d))
      .catch(e => {
        console.error(e);
        setToken(null);
      });
  };

  return (<form onSubmit={publish}>
    <input name="autor" placeholder="autor"/>
    <input name="titulo" placeholder="titulo"/>
    <textarea name="descricao" placeholder="descricao"/>
    <button>publicar</button>
  </form>);
}

function AuthForm({token, setToken}) {

  const login = (e) => {
    e.preventDefault();

    const {usuario: {value: usuario}, senha: {value: senha}} = e.target.children;
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
      .catch(e => {
        console.error(e);
        setToken(null);
      });
  };

  if (token) {
    return (<button onClick={() => setToken(null)}>logout</button>)
  }

  return (<form onSubmit={login}>
    <input placeholder="usuario" name="usuario"/>
    <input type="password" name="senha" placeholder="senha"/>
    <button>login</button>
  </form>);
}

function App() {

  const [data, setData] = useState({});
  const [token, setToken] = useState();

  useEffect(() => {
    fetch(`${ROOT_URL}/current`)
      .then(response => response.json())
      .then(d => setData(d))
      .catch(e => console.error(e));
  }, []);

  return (
    <div>
      Admin Mosaico
      <PastoralForm token={token} setToken={setToken}/>
      <AuthForm token={token} setToken={setToken}/>
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
