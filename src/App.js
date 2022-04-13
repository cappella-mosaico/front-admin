import './App.css';
import {AuthForm} from "./auth/AuthForm";
import {useToken} from "./auth/useToken";
import {useState} from "react";
import logo from "./logo512.png";
import {Pastorais} from "./pastorais/Pastorais";

// localhost
// export const ROOT_URL = 'http://localhost:9090/pastorais';
// docker localhost
// export const ROOT_URL = 'http://localhost:8080/pastorais';
// production
export const ROOT_URL = 'http://admin.ipmosaico.com:8888/pastorais';

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


      <Pastorais token={token}
                 setToken={setToken}
                 pastorais={pastorais}
                 setPastorais={setPastorais} />
    </>
  );
};

export default App;
