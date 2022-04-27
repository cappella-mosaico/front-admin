import {FinanceiroForm} from "./FinanceiroForm";
import {useState} from "react";

export const Financeiro = ({token, setToken}) => {
  const [ relatorios, setRelatorios ] = useState([]);
  const [selectedRelatorio, selectRelatorio] = useState();
  const clearRelatorio = () => {
    selectRelatorio(null);
  }

  return (<>
    <h1>Resultados Financeiros Mensais</h1>
    <FinanceiroForm
      token={token}
      setToken={setToken}
      relatorios={relatorios}
      setRelatorios={setRelatorios}
      selectedRelatorio={selectedRelatorio}
      clearRelatorio={clearRelatorio}/>
  </>)
}
