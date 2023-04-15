import { ROOT_URL } from "../App";
import { useState } from 'react';

export const ParticipanteForm = ({ eventoId, token, setToken }) => {
  
  const resetForm = () => {
    console.log("resetFormParticipante");
  };

  const publish = (e) => {
    e.preventDefault();

    const {
      nome: {value: nome},
      telefone: {value: telefone},
      email: {value: email},
      cpf: {value: cpf},
      idade: {value: idade}
    } = e.target.children;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        nome,
        telefone,
        email,
        cpf,
        idade,
        eventoId
      })
    };
    
    fetch(`${ROOT_URL}/eventos/participante`, requestOptions)
      .then(response => response.json())
      .then(participante => {
        if (participante.id) {
          alert(`O participante ${participante.nome} foi cadastrado com sucesso.`);
          resetForm();
        } else {
          console.error(participante);
          const error = `Falha ao cadastrar o participante.`;
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

  return (
    <form id="formParticipante" onSubmit={publish}>
      <input type="text" name="nome" placeholder="Nome" />
      <input type="text" name="telefone" placeholder="Telefone" />
      <input type="text" name="email" placeholder="Email" />
      <input type="text" name="cpf" placeholder="CPF" />
      <input type="text" name="idade" placeholder="Idade" />
      <div className="grid">
        <button>salvar participante</button>
      </div>
    </form>

  );
};
