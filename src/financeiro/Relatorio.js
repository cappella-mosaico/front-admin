import {RelatorioForm} from "./RelatorioForm";
import {useState} from "react";
import {RelatorioList} from "./RelatorioList";

export const FINANCEIRO_URL = 'http://localhost:8081';

export const Relatorio = ({token, setToken}) => {
  const [relatorios, setRelatorios] = useState([]);
  const [selectedRelatorio, selectRelatorio] = useState();
  const clearRelatorio = () => {
    selectRelatorio(null);
  }

  return (<>
    <h1>Resultados Financeiros Mensais</h1>
    <RelatorioForm
      token={token}
      setToken={setToken}
      relatorios={relatorios}
      setRelatorios={setRelatorios}
      selectedRelatorio={selectedRelatorio}
      clearRelatorio={clearRelatorio}/>

    <RelatorioList
      token={token}
      setToken={setToken}
      relatorios={relatorios}
      setRelatorios={setRelatorios}
      selectRelatorio={selectRelatorio}/>
  </>)
}
