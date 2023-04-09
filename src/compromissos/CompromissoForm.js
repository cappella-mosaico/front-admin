import {ROOT_URL} from "../App";
import { useState } from 'react';

export const CompromissoForm = ({ token }) => {
  
  const [tipo, setTipo] = useState('ESCALA');
  const [ministerio, setMinisterio] = useState('Música');

  const resetForm = () => {
    /*clearPastoral();
    document.getElementsByName('id').item(0).value = '';
    document.getElementsByName('autor').item(0).value = '';
    document.getElementsByName('titulo').item(0).value = '';
    document.getElementsByName('descricao').item(0).value = '';
    setDescricao('');*/
    console.log('resetForm');
  }

  const publish = (e) => {
    e.preventDefault();

    const { id: {value: id},
            nome: {value: nome},
            local: {value: local},
            endereco: {value: endereco},
            inicio: {value: inicio},
            fim: {value: fim},
            imagem: {value: imagem}
    } = e.target.children;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        nome,
        local,
        endereco,
        inicio,
        fim,
        imagem,
        tipo,
        ministerio
      })
    }

    fetch(`${ROOT_URL}/compromissos`, requestOptions)
      .then(response => console.log('response') || response.json())
      .then(compromisso => {
        console.log(compromisso);
        const novosCompromissos = new Map();
        //compromissos.forEach(p => novasPastorais.set(p.id, p));
        /*if (novasPastorais.get(pastoral.id)) {
          novasPastorais.set(pastoral.id, pastoral);
          setPastorais([...novasPastorais.values()]);
        } else {
          // if this is a new item, I'm making sure it's added to the top
          const reversed = Array.from(novasPastorais.values()).reverse();
          reversed.push(pastoral)
          setPastorais(reversed.reverse());
        }*/

        resetForm();
      })
      .catch(error => {
        console.error(error);
        if (token) {
          setToken(null);
        }
      });

  }

  return (<form onSubmit={publish}>
            <input type="hidden" name="id" />
            <input type="text" name="nome" placeholder="Nome" />
            <input type="text" name="local" placeholder="Local" />
            <input type="text" name="endereco" placeholder="Endereço" />
            <input type="datetime-local" name="inicio" placeholder="Inicio" />
            <input type="datetime-local" name="fim" placeholder="Fim" />
            <input type="text" name="imagem" placeholder="Imagem" />
            <div className="grid">
            <fieldset>
              <legend>Tipo</legend>
              <label htmlFor="escala">
                <input type="radio" id="escala" name="tipo" value="ESCALA" defaultChecked onChange={(e) => setTipo(e.target.value)} />
                Escala
              </label>
              <label htmlFor="evento">
                <input type="radio" id="evento" name="tipo" value="EVENTO" onChange={(e) => setTipo(e.target.value)}/>
                Evento
              </label>
            </fieldset>
            <fieldset>
              <legend>Ministério</legend>
              <label htmlFor="musica">
                <input type="radio" id="musica" name="ministerio" value="Música" defaultChecked onChange={(e) => setMinisterio(e.target.value)} />
                Música
              </label>
              <label htmlFor="midia">
                <input type="radio" id="midia" name="ministerio" value="Mídia" onChange={(e) => setMinisterio(e.target.value)} />
                Mídia
              </label>
            </fieldset>
          </div>
          <div className="grid">
            <button>salvar compromisso</button>
          </div>
          </form>);

}
