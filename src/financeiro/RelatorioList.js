import {ROOT_URL} from "../App";
import {useEffect} from "react";
import {DeleteAction} from "./actions/DeleteAction";
import {SelectAction} from "./actions/SelectAction";

export const RelatorioList = ({token, setToken, relatorios, setRelatorios, selectRelatorio}) => {

  useEffect(() => {
    if (token) {
      fetch(`${ROOT_URL}/financeiro?amount=5`)
        .then(response => response.json())
        .then(d => {
          if (relatorios.length !== d.length) {
            setRelatorios(d)
          }
        })
        .catch(error => console.error(error));
    }
  }, [token, setRelatorios, relatorios.length]);

  return (relatorios?.map(relatorio => (<div key={relatorio.id}>
      <h4>{relatorio.anoMes?.[1]} / {relatorio.anoMes?.[0]}</h4>
      <label>
        entradas: {relatorio.entradas}
      </label>
      <br/>
      <label>
        saídas: {relatorio.saidas}
      </label>
      <br/>
      <label>
        orçado: {relatorio.orcado}
      </label>
      <br/>
      <br/>
      <div className="grid">
        {token &&
        <SelectAction entity={relatorio} select={selectRelatorio}/>
        }
        {token &&
        <DeleteAction {...{token, setToken, relatorios, setRelatorios, relatorio}} />
        }
      </div>
      <hr/>
    </div>)
  ));
}
