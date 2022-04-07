import { useCallback, useEffect } from "react";
import {ROOT_URL} from "../App";

export const PastoraisList = ({ token, setToken, pastorais, setPastorais }) => {
  const notify = useCallback((pastoral) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(pastoral)
    }

    fetch(`${ROOT_URL}/v1/notify`, requestOptions)
      .then(response => response.json())
      .then(pastoral => {
        const novasPastorais = pastorais.map(p => {
          if (p.id === pastoral.id) {
            p.notificado = pastoral.notificado;
          }
          return p;
        });
        console.debug({
          novasPastorais
        });
        setPastorais(novasPastorais);
      })
      .catch(error => {
        console.error(error);
        if (token) {
          setToken(null);
        }
      });
  }, [token, setToken, pastorais, setPastorais]);

  useEffect(() => {
    fetch(`${ROOT_URL}/public/latest?amount=1`)
      .then(response => response.json())
      .then(d => {
        if (pastorais.length !== d.length) {
          setPastorais(d)
        }
      })
      .catch(error => console.error(error));
  }, [token, setPastorais]);

  return (pastorais?.map(pastoral => (<div key={pastoral.id}>
      <h4>#{pastoral.id} - {pastoral.titulo}</h4>
      <p>
        {pastoral.descricao}
      </p>
      <small>{pastoral.autor}</small>
      <br />
      <br />
      { token && !pastoral.notificado &&
        <button onClick={() => notify(pastoral)}>notificar</button>
      }
      <hr />
    </div>)
  ));
}
