import {useCallback} from "react";
import {ROOT_URL} from "../../App";

export const NotifyAction = ({
                               token,
                               setToken,
                               pastorais,
                               setPastorais,
                               pastoral
                             }) => {
  const notify = useCallback((pastoral) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(pastoral)
    }

    fetch(`${ROOT_URL}/pastorais/v1/notify`, requestOptions)
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

  return (<button
                  onClick={
                    () => {
                      if (window.confirm('deseja notificar "' + pastoral.titulo + "\"?")) {
                        notify(pastoral);
                      }
                    }

                  }>notificar</button>)
}
