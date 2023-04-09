import {AuthForm} from "./auth/AuthForm";
import {useToken} from "./auth/useToken";

import logo from "./logo512.png";
import {Pastorais} from "./pastorais/Pastorais";
import { Link, Route, Routes, NavLink } from "react-router-dom";
import {Relatorio} from "./financeiro/Relatorio";
import {Eventos} from "./eventos/Eventos";
import {Compromissos} from "./compromissos/Compromissos";
import "./style.css";

export const ROOT_URL = `${process.env.REACT_APP_IPMOSAICO_ROOT_URL}`;

function App() {
  const { token, setToken, tokenExpirationTime } = useToken();

  return (
    <>
      <h1>Administração do aplicativo da IP Mosaico</h1>

      { token &&
      <>
        <nav style={{backgroundColor: 'whitesmoke', padding: '4px 12px 4px 12px', borderRadius: '4px'}}>
          <NavLink to="pastorais">Pastorais</NavLink>
          <NavLink to="financeiro">Financeiro</NavLink>
          <NavLink to="eventos">Eventos</NavLink>
          <NavLink to="compromissos">Compromissos</NavLink>
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
          <Route path="compromissos" element={
            <Compromissos token={token}
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
