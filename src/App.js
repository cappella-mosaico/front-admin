//import './App.css';
import {AuthForm} from "./auth/AuthForm";
import {useToken} from "./auth/useToken";

import logo from "./logo512.png";
import {Pastorais} from "./pastorais/Pastorais";
import { Link, Route, Routes } from "react-router-dom";
import {Relatorio} from "./financeiro/Relatorio";

// localhost
// export const ROOT_URL = 'http://localhost:9090';
// docker localhost
export const ROOT_URL = 'http://localhost:9000';
// production
// export const ROOT_URL = 'http://admin.ipmosaico.com:8888';

function App() {
  const { token, setToken } = useToken();

  return (
    <>
      <img src={logo}
           alt="Logo"/>

      { token &&
      <>
        <nav>
          <ul>
            <li><Link to="pastorais">Pastorais</Link></li>
            <li><Link to="financeiro">Financeiro</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route index element={
            <Pastorais token={token}
                       setToken={setToken} />
          } />
          <Route path="pastorais" element={
            <Pastorais token={token}
                       setToken={setToken} />
          } />
          <Route path="financeiro" element={
            <Relatorio token={token}
                       setToken={setToken} />
          } />

        </Routes>
      </>
      }
      <AuthForm token={token}
                setToken={setToken}/>
    </>
  );
};

export const zeroPad = (num, places) => {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

export default App;
