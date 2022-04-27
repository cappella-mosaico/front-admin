import {useCallback} from "react";

export const FinanceiroForm = ({token, setToken}) => {
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

    fetch(`${ROOT_URL}/financeiro/v1/persist`, requestOptions)
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
  }, [token, setToken]);

  return (<form onSubmit={publish}>
    <input name="id" type="hidden"/>
    <input name="anomes" placeholder="ano/mês" type="date"/>
    <br/>
    <input name="entrada" placeholder="entrada"/>
    <br/>
    <input name="saida" placeholder="saída"/>
    <br/>
    <input name="orcado" placeholder="orçado"/>
    <br/>
    <button className="marginalized">salvar</button>
  </form>);
}
