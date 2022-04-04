// import './App.css';
import {PastoraisList} from "./pastorais/PastoraisList";
import {AuthForm} from "./auth/AuthForm";
import {PastoralForm} from "./pastorais/PastoralForm";
import {useToken} from "./auth/useToken";

export const ROOT_URL = 'http://ipmosaico.duckdns.org:8888/pastorais';

function App() {
  const {token, setToken} = useToken();

  return (
    <>
      <AuthForm token={token} setToken={setToken}/>
      <h1>Pastorais</h1>
      <PastoralForm token={token} setToken={setToken}/>
      <PastoraisList />
    </>
  );
}

export default App;
