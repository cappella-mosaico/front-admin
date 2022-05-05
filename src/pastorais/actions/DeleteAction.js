import {useCallback} from "react";
import {ROOT_URL} from "../../App";

export const DeleteAction = ({
                               token,
                               setToken,
                               pastorais,
                               setPastorais,
                               pastoral
                             }) => {
  const deleete = useCallback((pastoral) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(pastoral)
    }

    fetch(`${ROOT_URL}/pastorais/v1/delete`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.toString());
        }
        return response.json();
      })
      .then(deletedPastoralId => {
        const novasPastorais = pastorais.filter(p => p.id !== deletedPastoralId);
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
                      if (window.confirm('deseja apagar "' + pastoral.titulo + "\"?")) {
                        deleete(pastoral);
                      }
                    }
                  }
  >apagar</button>)
}
