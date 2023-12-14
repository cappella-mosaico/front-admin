import {ROOT_URL} from "../App";
import {useCallback, useEffect, useState} from "react";

export const EventoForm = ({token, setToken, eventos, setEventos, selectedEvento, clearEvento}) => {


  useEffect(() => {
    const evento = eventos.filter(p => p.id === selectedEvento)?.[0];
    if (evento) {
      document.getElementsByName('id').item(0).value = evento.id;
      document.getElementsByName('titulo').item(0).value = evento.titulo;
      document.getElementsByName('dataInicial').item(0).value = evento.dataInicial;
      document.getElementsByName('dataFinal').item(0).value = evento.dataFinal;
      document.getElementsByName('imagem').item(0).value = evento.imagem;
      document.getElementsByName('sobre').item(0).value = evento.sobre;
      document.getElementsByName('valor').item(0).value = evento.valor;
      document.getElementsByName('local').item(0).value = evento.local;
      document.getElementsByName('endereco').item(0).value = evento.endereco;
    }
  }, [selectedEvento, eventos]);

  const resetForm = () => {
    clearEvento();
    document.getElementsByName('id').item(0).value = '';
    document.getElementsByName('titulo').item(0).value = '';
    document.getElementsByName('dataInicial').item(0).value = '';
    document.getElementsByName('dataFinal').item(0).value = '';
    document.getElementsByName('imagem').item(0).value = '';
    document.getElementsByName('sobre').item(0).value = '';
    document.getElementsByName('valor').item(0).value = '';
    document.getElementsByName('local').item(0).value = '';
    document.getElementsByName('endereco').item(0).value = '';
  }

  const publish = useCallback((event) => {
    event.preventDefault();

    const id = document.getElementsByName('id').item(0).value;
    const titulo = document.getElementsByName('titulo').item(0).value;
    const dataInicial = document.getElementsByName('dataInicial').item(0).value;
    const dataFinal = document.getElementsByName('dataFinal').item(0).value;
    const imagem = document.getElementsByName('imagem').item(0).value;
    const sobre = document.getElementsByName('sobre').item(0).value;
    const valor = document.getElementsByName('valor').item(0).value;
    const local = document.getElementsByName('local').item(0).value;
    const endereco = document.getElementsByName('endereco').item(0).value;

    if (!titulo?.trim()) {
      alert('É importante preencher o título de eventos.');
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        titulo,
        dataInicial,
        dataFinal,
        imagem,
        sobre,
        valor,
        local,
        endereco
      })
    }

    fetch(`${ROOT_URL}/eventos`, requestOptions)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 409) {
          alert("O título desse evento já está em uso");
        }
      })
      .then(evento => {
        const novosEventos = new Map();
        eventos.forEach(p => novosEventos.set(p.id, p));
        if (novosEventos.get(evento.id)) {
          novosEventos.set(evento.id, evento);
          setEventos([...novosEventos.values()]);
        } else {
          // if this is a new item, I'm making sure it's added to the top
          const reversed = Array.from(novosEventos.values()).reverse();
          reversed.push(evento)
          setEventos(reversed.reverse());
        }

        resetForm();
      })
      .catch(error => {
        console.error(error);
        if (token) {
          setToken(null);
        }
      });
  }, [token, setToken, eventos, setEventos]);

  if (!token) {
    return null;
  }
  function LabeledInput(props) {
// Data Inicial
//transforma tudo para minusculas e substitui o 'í' com acento por 'i' sem acento e o 'ç' por 'c'.
    let transformandolabelParaMinusculas = props.label.toLowerCase().replace('í','i').replace('ç','c');
    // data inicial
    const posicaoEspacoVazio = transformandolabelParaMinusculas.indexOf(' ');
    //4
    if (posicaoEspacoVazio >= 0 ) {
      const primeiroCaracterAposEspacoVazio = transformandolabelParaMinusculas.charAt(posicaoEspacoVazio + 1);
      //i
      const primeiraMaiuscula = primeiroCaracterAposEspacoVazio.toUpperCase();
      //I
      transformandolabelParaMinusculas = transformandolabelParaMinusculas.substring(0, posicaoEspacoVazio) + // data
       primeiraMaiuscula + //I (data+I)
       transformandolabelParaMinusculas.substring(posicaoEspacoVazio + 2); // nicial (data+I+nicial)
    }
   
    return(<div style={{ display: 'flex'}}>
    <label style={{ flex: 1 }}> {props.label}: </label>
    <input name={transformandolabelParaMinusculas} type={props.type} style={{ flex: 5 }} />
  </div>)
  }

  return (<form onSubmit={publish}>
          <input name="id" type="hidden"/>
          <LabeledInput label="Título" type="text"/>
          <LabeledInput label="Data Inicial" type="datetime-local"/>
          <LabeledInput label="Data Final" type="datetime-local"/>
          <LabeledInput label="Imagem" type="text"/>
          <LabeledInput label="Sobre" type="text"/>
          <LabeledInput label="Valor" type="text"/>
          <LabeledInput label="Local" type="text"/>
          <LabeledInput label="Endereço" type="text"/>
         
          <div className="grid">
          <button>salvar</button>
          {selectedEvento && <button type="reset" className="secondary" onClick={resetForm}>cancelar</button>}
          </div>
          </form>);
}
