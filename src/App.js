import './App.css';
import {PastoraisList} from "./pastorais/PastoraisList";
import {AuthForm} from "./auth/AuthForm";
import {PastoralForm} from "./pastorais/PastoralForm";
import {useToken} from "./auth/useToken";
import {useState} from "react";
import logo from "./logo512.png";

// localhost
export const ROOT_URL = 'http://localhost:9090/pastorais';
// docker localhost
// export const ROOT_URL = 'http://localhost:8080/pastorais';
// production
// export const ROOT_URL = 'http://ipmosaico.duckdns.org:8888/pastorais';

function App() {
  const { token, setToken } = useToken();
  const [ pastorais, setPastorais ] = useState([]);

  return (
    <>
      <div className="loginContainer">
        <img src={logo}
             alt="Logo"
             className="logo marginalized" />
        <AuthForm token={token}
                  setToken={setToken}/>
      </div>

      {pastorais.length > 0 && <h1>Pastorais</h1>}

      <PastoralForm token={token}
                    setToken={setToken}
                    pastorais={pastorais}
                    setPastorais={setPastorais}/>

      <PastoraisList token={token}
                     setToken={setToken}
                     pastorais={pastorais}
                     setPastorais={setPastorais}/>
    </>
  );
};

export default App;
