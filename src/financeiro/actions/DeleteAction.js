import {ROOT_URL} from "../../App";
import {useCallback} from "react";

export const DeleteAction = ({
                               token,
                               setToken,
                               relatorios,
                               setRelatorios,
                               relatorio
                             }) => {
  const _delete = useCallback(({ id }) => {
    fetch(`${ROOT_URL}/financeiro/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.toString());
        }
        return response.json();
      })
      .then(deletedRelatorioId => {
        const novosRelatorios = relatorios.filter(p => p.id !== deletedRelatorioId);
        setRelatorios(novosRelatorios);
      })
      .catch(error => {
        console.error(error);
        if (token) {
          setToken(null);
        }
      });
  }, [token, setToken, relatorios, setRelatorios]);

  return (<button
                  onClick={
                    () => {
                      if (window.confirm('deseja apagar "' + relatorio.id + "\"?")) {
                        _delete(relatorio);
                      }
                    }
                  }
  >apagar</button>)
}
