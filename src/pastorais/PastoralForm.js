import {ROOT_URL} from "../App";
import {useCallback} from "react";

export const PastoralForm = ({token, setToken, pastorais, setPastorais}) => {

  const publish = useCallback((event) => {
    event.preventDefault();
    const {autor: {value: autor}, titulo: {value: titulo}, descricao: {value: descricao}} = event.target.children;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        autor,
        titulo,
        descricao
      })
    }

    fetch(`${ROOT_URL}/v1/create`, requestOptions)
      .then(response => response.json())
      .then(pastoral => {
          setPastorais([pastoral, ...pastorais]);
        })
      .catch(error => {
        console.error(error);
        setToken(null);
      });
  }, [token]);

  if (!token) {
    return null;
  }

  return (<form onSubmit={publish}>
    <input name="autor" placeholder="autor"/>
    <br />
    <input name="titulo" placeholder="titulo"/>
    <br />
    <textarea name="descricao" placeholder="descricao" rows='10' cols='26'/>
    <br />
    <button>salvar</button>
  </form>);
}
