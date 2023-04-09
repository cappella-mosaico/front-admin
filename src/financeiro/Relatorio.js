import {RelatorioForm} from "./RelatorioForm";
import {useState} from "react";
import {RelatorioList} from "./RelatorioList";

export const Relatorio = ({token, setToken}) => {
  const [relatorios, setRelatorios] = useState([]);
  const [selectedRelatorio, selectRelatorio] = useState();
  const clearRelatorio = () => {
    selectRelatorio(null);
  }

  return (<>
    <h3>Resultados Financeiros Mensais</h3>
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
