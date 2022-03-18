import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function App() {

  const [data, setData] = useState({});

  useEffect(() => {
    fetch('http://pastorais:8080/pastorais/p/pastoral')
      .then(response => response.json())
      .then(dat => setData(dat))
      .catch(e => console.error(e));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {data?.data?.children?.map(({data: topic}) => console.debug(topic) || (
          <a key={topic.created} href={topic.url}>{topic.title}</a>))}
      </header>
    </div>
  );
}

export default App;
