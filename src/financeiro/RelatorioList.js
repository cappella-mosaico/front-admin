import {ROOT_URL} from "../App";
import {useEffect} from "react";
import {DeleteAction} from "./actions/DeleteAction";
import {SelectAction} from "./actions/SelectAction";

export const RelatorioList = ({token, setToken, relatorios, setRelatorios, selectRelatorio}) => {

  useEffect(() => {
    if (token) {
      fetch(`${ROOT_URL}/financeiro?amount=12`)
        .then(response => response.json())
        .then(d => {
          if (relatorios.length !== d.length) {
            setRelatorios(d)
          }
        })
        .catch(error => console.error(error));
    }
  }, [token, setRelatorios, relatorios.length]);

  const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
      });

  return (relatorios?.map(relatorio => (<div key={relatorio.id}>
      <h4>{relatorio.anoMes?.[1]} / {relatorio.anoMes?.[0]}</h4>
      <div style={{fontSize: '1.75rem'}}>
        entradas: <strong>{formatter.format(relatorio.entradas)}</strong>
        <br/>
        saídas: <strong>{formatter.format(relatorio.saidas)}</strong>
        <br/>
        orçado: <strong>{formatter.format(relatorio.orcado)}</strong>
        <br/>
        <br/>
      </div>
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
