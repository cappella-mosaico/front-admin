import { useEffect } from "react";
import {ROOT_URL} from "../App";
import {NotifyAction} from "./actions/NotifyAction";
import {DeleteAction} from "./actions/DeleteAction";
import {SelectAction} from "./actions/SelectAction";

export const PastoralList = ({ token, setToken, pastorais, setPastorais, selectPastoral }) => {

  useEffect(() => {
    if (token) {
      fetch(`${ROOT_URL}/pastorais/public/latest?amount=5`)
        .then(response => response.json())
        .then(d => {
          if (pastorais.length !== d.length) {
            setPastorais(d)
          }
        })
        .catch(error => console.error(error));
    }
  }, [token, setPastorais, pastorais.length]);

  return (pastorais?.map(pastoral => (<div key={pastoral.id}>
      <h4>#{pastoral.id} - {pastoral.titulo}</h4>
      <p>
        {pastoral.descricao}
      </p>
      <small>{pastoral.autor}</small>
      <br />
      <br />
      <div className="grid">
        { token && !pastoral.notificado &&
          <NotifyAction {...{token, setToken, pastorais, setPastorais, pastoral}} />
        }
        { token &&
          <SelectAction {...{token, setToken, pastorais, setPastorais, pastoral, selectPastoral}} />
        }
        { token &&
          <DeleteAction {...{token, setToken, pastorais, setPastorais, pastoral}} />
        }
      </div>
      <hr />
    </div>)
  ));
}
