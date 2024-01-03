import {useCallback} from "react";
import {ROOT_URL} from "../../App";
import { Participante } from "../Participante";

export const DeleteAction = ({
                               token,
                               setToken,
                               eventos,
                               setEventos,
                               evento
                             }) => {
                              const botaoDeleteHabilitado = (evento.quantidadePessoas == 0);
  const _delete = useCallback(({id}) => {
    fetch(`${ROOT_URL}/eventos/${id}`, {
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
      .then(deletedEventoId => {
        const novosEventos = eventos.filter(p => p.id !== deletedEventoId);
        console.log({deletedEventoId, eventos, novosEventos});
        setEventos(novosEventos);
      })
      .catch(error => {
        console.error(error);
        if (token) {
          setToken(null);
        }
      });
  }, [token, setToken, eventos, setEventos]);

  return (<button
                  onClick={
                    () => {
                      if (window.confirm('deseja apagar "' + evento.titulo + "\"?")) {
                        _delete(evento);
                      }
                    }
                  }
                  disabled={!botaoDeleteHabilitado}
  >apagar</button>)
}
