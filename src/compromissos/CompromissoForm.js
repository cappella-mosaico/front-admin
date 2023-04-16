import { ROOT_URL } from "../App";
import { useState } from 'react';

const DEFAULT_TIPO = 'ESCALA';
const DEFAULT_MINISTERIO = 'Música';

export const CompromissoForm = ({ token, setToken, addCompromisso }) => {
  
  const [tipo, setTipo] = useState(DEFAULT_TIPO);
  const [ministerio, setMinisterio] = useState(DEFAULT_MINISTERIO);

  const resetForm = () => {
    document.getElementById('formCompromisso').reset();
    setTipo(DEFAULT_TIPO);
    setMinisterio(DEFAULT_MINISTERIO)
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
      .then(response => response.json())
      .then(compromisso => {
        if (compromisso.id) {
          alert(`O compromisso ${compromisso.nome} foi cadastrado com sucesso.`);
          resetForm();
          addCompromisso(compromisso);
        } else {
          const error = `Falha ao cadastrar o compromisso.`;
          alert(error);
          throw new Error(error);
        }
      })
      .catch(error => {
        console.error(error);
        if (token) {
          setToken(null);
        }
      });

  }

  return (<form id="formCompromisso" onSubmit={publish}>
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
              <label htmlFor="reuniao">
                <input type="radio" id="reuniao" name="tipo" value="REUNIAO" onChange={(e) => setTipo(e.target.value)}/>
                Reunião
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
              <label htmlFor="infantil">
                <input type="radio" id="infantil" name="ministerio" value="MOSAIKIDS" onChange={(e) => setMinisterio(e.target.value)} />
                MOSAIKIDS
              </label>
              <label htmlFor="acampamento">
                <input type="radio" id="acampamento" name="ministerio" value="Acampamento" onChange={(e) => setMinisterio(e.target.value)} />
                Acampamento
              </label>
            </fieldset>
          </div>
          <div className="grid">
            <button>salvar compromisso</button>
          </div>
          </form>);

}
