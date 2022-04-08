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
          document.getElementsByName('autor').item(0).value = '';
          document.getElementsByName('titulo').item(0).value = '';
          document.getElementsByName('descricao').item(0).value = '';
        })
      .catch(error => {
        console.error(error);
        if (token) {
          setToken(null);
        }
      });
  }, [token, setToken, pastorais, setPastorais]);

  if (!token) {
    return null;
  }

  return (<form onSubmit={publish}>
    <input name="autor" placeholder="autor"/>
    <br />
    <input name="titulo" placeholder="titulo"/>
    <br />
    <textarea name="descricao" placeholder="descricao" className="marginalized" />
    <br />
    <button>salvar</button>
  </form>);
}
