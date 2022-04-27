import './App.css';
import {AuthForm} from "./auth/AuthForm";
import {useToken} from "./auth/useToken";
import {useState} from "react";
import logo from "./logo512.png";
import {Pastorais} from "./pastorais/Pastorais";
import { Link, Route, Routes } from "react-router-dom";
import {Financeiro} from "./financeiro/Financeiro";

// localhost
// export const ROOT_URL = 'http://localhost:9090';
// docker localhost
export const ROOT_URL = 'http://localhost:8080';
// production
// export const ROOT_URL = 'http://admin.ipmosaico.com:8888';

function App() {
  const { token, setToken } = useToken();

  return (
    <>
      <div className="loginContainer">
        <img src={logo}
             alt="Logo"
             className="logo marginalized" />
        <AuthForm token={token}
                  setToken={setToken}/>
      </div>


      { token &&
      <>
        <Link to="pastorais"
              className="marginalized">Pastorais</Link>
        <Link to="financeiro"
              className="marginalized">Financeiro</Link>

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
            <Financeiro token={token}
                        setToken={setToken} />
          } />

        </Routes></>
      }

    </>
  );
};

export default App;
