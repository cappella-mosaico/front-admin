import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function App() {

  const [data, setData] = useState({});

  const publish = (e) => {
    e.preventDefault();
    const {autor: {value: autor}, titulo: {value: titulo}, descricao: {value: descricao}} = e.target.children;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        autor,
        titulo,
        descricao
      })
    }
    console.debug({requestOptions});
    fetch('http://localhost:9090/pastorais/create', requestOptions)
      .then(response => response.json())
      .then(d => setData(d));
  };

  useEffect(() => {
    fetch('http://localhost:9090/pastorais/current')
      .then(response => response.json())
      .then(dat => setData(dat))
      .catch(e => console.error(e));
  }, []);

  return (
    <div>
        Admin Mosaico
      <form onSubmit={publish}>
        <input name="autor" />
        <input name="titulo" />
        <textarea name="descricao" />
        <button type="submit">publicar</button>
      </form>
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
