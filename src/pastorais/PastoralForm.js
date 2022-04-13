import {ROOT_URL} from "../App";
import {useCallback, useEffect} from "react";

export const PastoralForm = ({token, setToken, pastorais, setPastorais, selectedPastoral, clearPastoral}) => {

  useEffect(() => {
    const pastoral = pastorais.filter(p => p.id === selectedPastoral)?.[0];
    if (pastoral) {
      document.getElementsByName('id').item(0).value = pastoral.id;
      document.getElementsByName('autor').item(0).value = pastoral.autor;
      document.getElementsByName('titulo').item(0).value = pastoral.titulo;
      document.getElementsByName('descricao').item(0).value = pastoral.descricao;
    }
  }, [selectedPastoral, pastorais]);

  const publish = useCallback((event) => {
    event.preventDefault();
    const { id: {value: id},
            autor: {value: autor},
            titulo: {value: titulo},
            descricao: {value: descricao}
    } = event.target.children;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        autor,
        titulo,
        descricao
      })
    }

    fetch(`${ROOT_URL}/v1/persist`, requestOptions)
      .then(response => response.json())
      .then(pastoral => {
        const novasPastorais = new Map();
        pastorais.forEach(p => novasPastorais.set(p.id, p));
        if (novasPastorais.get(pastoral.id)) {
          novasPastorais.set(pastoral.id, pastoral);
          setPastorais([...novasPastorais.values()]);
        } else {
          // if this is a new item, I'm making sure it's added to the top
          const reversed = Array.from(novasPastorais.values()).reverse();
          console.debug(reversed);
          reversed.push(pastoral)
          setPastorais(reversed.reverse());
        }



        clearPastoral();
        document.getElementsByName('id').item(0).value = '';
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
    <input name="id" type="hidden"/>
    <input name="autor" placeholder="autor"/>
    <br />
    <input name="titulo" placeholder="titulo"/>
    <br />
    <textarea name="descricao" placeholder="descricao" className="marginalized" />
    <br />
    <button>salvar</button>
  </form>);
}
