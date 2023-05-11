import { ROOT_URL } from "../App";
import { useCallback } from "react";

export const DeleteAction = ({ children, token, setToken, compromisso, deleteCompromissoListado }) => {

    const _delete = useCallback(({ id }) => {
    fetch(`${ROOT_URL}/compromissos/${id}`, {
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
      .then(deletedId => deleteCompromissoListado(deletedId))
      .catch(error => {
        console.error(error);
        if (token) {
          setToken(null);
        }
      });
  }, [token, setToken, deleteCompromissoListado]);
  return (<span
            onClick={
              (e) => {
                e.preventDefault();
                if (window.confirm('Deseja apagar "' + compromisso.nome + '"?')) {
                  _delete(compromisso);
                }
              }
            }>
            {children}
          </span>);
};
