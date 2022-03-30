// import './App.css';
import {useEffect, useState} from "react";

const ROOT_URL = 'http://localhost:8080/pastorais';

function PastoralForm({token, setToken}) {

  if (!token) {
    return null;
  }

  const publish = (event) => {
    event.preventDefault();
    const {autor: {value: autor}, titulo: {value: titulo}, descricao: {value: descricao}} = event.target.children;
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
      .catch(error => {
        console.error(error);
        setToken(null);
      });
  };

  return (<form onSubmit={publish}>
    <input name="autor" placeholder="autor"/>
    <br />
    <input name="titulo" placeholder="titulo"/>
    <br />
    <textarea name="descricao" placeholder="descricao" rows='10' cols='26'/>
    <br />
    <button>salvar</button>
  </form>);
}

function AuthForm({token, setToken}) {

  const login = (event) => {
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
  };

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

function App() {

  const [data, setData] = useState({});
  const [token, setLocalStateToken] = useState(localStorage.getItem('token'));

  const setToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.clear();
    }
    setLocalStateToken(newToken);
  }

  useEffect(() => {
    fetch(`${ROOT_URL}/current`)
      .then(response => response.json())
      .then(d => setData(d))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <AuthForm token={token} setToken={setToken}/>
      <h1>Pastorais</h1>
      <PastoralForm token={token} setToken={setToken}/>

      <h4>{data?.titulo}</h4>
      <p>
        {data?.descricao}
      </p>
      <small>{data?.autor}</small>
    </>
  );
}

export default App;
