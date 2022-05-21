import {useCallback} from "react";
import {ROOT_URL} from "../../App";

export const NotifyAction = ({
                               token,
                               setToken,
                               pastorais,
                               setPastorais,
                               pastoral
                             }) => {
  const notify = useCallback((pastoralToNotify) => {
    fetch(`${ROOT_URL}/pastorais/${pastoralToNotify.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(notifiedPastoral => {
        const novasPastorais = pastorais.map(p => {
          if (p.id === notifiedPastoral.id) {
            p.notificado = notifiedPastoral.notificado;
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
