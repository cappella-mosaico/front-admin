import { ROOT_URL } from "../App";
import { useState, useCallback, useEffect } from 'react';

const DEFAULT_TIPO = 'ESCALA';
const DEFAULT_MINISTERIO = 'Música';

export const CompromissoForm = ({ token,
                                  setToken,
                                  addCompromisso,
                                  updateCompromisso,
                                  selected,
                                  clearSelected }) => {

  const [tipo, setTipo] = useState(DEFAULT_TIPO);
  const [ministerio, setMinisterio] = useState(DEFAULT_MINISTERIO);

  const fillField = (field) => {
    document.getElementsByName(field).item(0).value = selected[field];
  };

  useEffect(() => {
    if (selected) {
      setTipo(selected.tipo);
      setMinisterio(selected.ministerio);
      fillField('id');
      fillField('nome');
      fillField('local');
      fillField('endereco');
      fillField('inicio');
      fillField('fim');
      fillField('imagem');
    }

  }, [selected]);

  const resetForm = () => {
    document.getElementById('formCompromisso').reset();
    setTipo(DEFAULT_TIPO);
    setMinisterio(DEFAULT_MINISTERIO);
    clearSelected();
  };

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
        id,
        nome,
        local,
        endereco,
        inicio,
        fim,
        imagem,
        tipo,
        ministerio
      })
    };

    fetch(`${ROOT_URL}/compromissos`, requestOptions)
      .then(response => response.json())
      .then(compromisso => {
        if (compromisso.id) {
          resetForm();
          if (selected) {
            alert(`O compromisso ${compromisso.nome} alterado com sucesso.`);
            updateCompromisso(compromisso);
          } else {
            alert(`O compromisso ${compromisso.nome} cadastrado com sucesso.`);
            addCompromisso(compromisso);
          }
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

  };

  return (<form id="formCompromisso" onSubmit={publish}>
            <input type="hidden" name="id" />
            <div className="grid">
              <fieldset>
                <legend>Tipo</legend>
                <label htmlFor="escala">
                  <input type="radio" name="tipo" onChange={(e) => setTipo(e.target.value)} id="escala" value="ESCALA" checked={tipo == "ESCALA"} />
                  Escala
                </label>
                <label htmlFor="evento">
                  <input type="radio" name="tipo" onChange={(e) => setTipo(e.target.value)} id="evento" value="EVENTO" checked={tipo == "EVENTO"} />
                  Evento
                </label>
                <label htmlFor="reuniao">
                  <input type="radio" name="tipo" onChange={(e) => setTipo(e.target.value)} id="reuniao" value="REUNIAO" checked={tipo == "REUNIAO"} />
                  Reunião
                </label>
              </fieldset>
              <fieldset>
                <legend>Ministério</legend>
                <label htmlFor="musica">
                  <input type="radio" id="musica" name="ministerio" value="Música" onChange={(e) => setMinisterio(e.target.value)} checked={ministerio == "Música"} />
                  Música
                </label>
                <label htmlFor="midia">
                  <input type="radio" id="midia" name="ministerio" value="Mídia" onChange={(e) => setMinisterio(e.target.value)} checked={ministerio == "Mídia"} />
                  Mídia
                </label>
                <label htmlFor="infantil">
                  <input type="radio" id="infantil" name="ministerio" value="MOSAIKIDS" onChange={(e) => setMinisterio(e.target.value)} checked={ministerio == "MOSAIKIDS"} />
                  MOSAIKIDS
                </label>
                <label htmlFor="diaconos">
                  <input type="radio" id="diaconos" name="ministerio" value="Diáconos" onChange={(e) => setMinisterio(e.target.value)} checked={ministerio == "Diáconos"} />
                  Diáconos
                </label>
                <label htmlFor="acampamento">
                  <input type="radio" id="acampamento" name="ministerio" value="Acampamento" onChange={(e) => setMinisterio(e.target.value)} checked={ministerio == "Acampamento"} />
                  Acampamento
                </label>
              </fieldset>
            </div>
            <input type="text" name="nome" placeholder="Nome" />
            <input type="text" name="local" placeholder="Local" />
            <input type="text" name="endereco" placeholder="Endereço" />
            <input type="datetime-local" name="inicio" placeholder="Inicio" />
            <input type="datetime-local" name="fim" placeholder="Fim" />
            <input type="text" name="imagem" placeholder="Imagem" />
          <div className="grid">
            <button>salvar compromisso</button>
          </div>
          </form>);

};
