import {useCallback} from "react";

import {FINANCEIRO_URL} from "../Relatorio";

export const DeleteAction = ({
                               token,
                               setToken,
                               relatorios,
                               setRelatorios,
                               relatorio
                             }) => {
  const deleete = useCallback((relatorio) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(relatorio)
    }

    fetch(`${FINANCEIRO_URL}/financeiro/v1/delete`, requestOptions)
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

  return (<button className="marginalized"
                  onClick={
                    () => {
                      if (window.confirm('deseja apagar "' + relatorio.id + "\"?")) {
                        deleete(relatorio);
                      }
                    }
                  }
  >apagar</button>)
}
