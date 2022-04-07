import './App.css';
import {PastoraisList} from "./pastorais/PastoraisList";
import {AuthForm} from "./auth/AuthForm";
import {PastoralForm} from "./pastorais/PastoralForm";
import {useToken} from "./auth/useToken";
import {useState} from "react";

// localhost
// export const ROOT_URL = 'http://localhost:9090/pastorais';
// docker localhost
export const ROOT_URL = 'http://localhost:8080/pastorais';
// production
// export const ROOT_URL = 'http://ipmosaico.duckdns.org:8888/pastorais';

function App() {
  const { token, setToken } = useToken();
  const [ pastorais, setPastorais ] = useState([]);

  return (
    <>
      <AuthForm token={token}
                setToken={setToken}/>

      <h1>Pastorais</h1>

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
}

export default App;
