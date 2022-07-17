import {AuthForm} from "./auth/AuthForm";
import {useToken} from "./auth/useToken";

import logo from "./logo512.png";
import {Pastorais} from "./pastorais/Pastorais";
import { Link, Route, Routes } from "react-router-dom";
import {Relatorio} from "./financeiro/Relatorio";
import {Eventos} from "./eventos/Eventos";

export const ROOT_URL = `${process.env.REACT_APP_IPMOSAICO_ROOT_URL}`;

function App() {
  const { token, setToken, tokenExpirationTime } = useToken();

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
            <li><Link to="eventos">Eventos</Link></li>
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
          <Route path="eventos" element={
            <Eventos token={token}
                       setToken={setToken} />
          } />

        </Routes>
      </>
      }
      <AuthForm token={token}
                setToken={setToken}
                tokenExpirationTime={tokenExpirationTime}/>
    </>
  );
};

export const zeroPad = (num, places) => {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

export default App;
