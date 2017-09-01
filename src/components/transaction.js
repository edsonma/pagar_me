import React, { Component } from 'react';

class Transaction extends Component {
  render() {
    return (
      <div>
        <div>
          <h3> Pagamento por meio de cartão de crédito </h3>
        </div>
        <div>
          <form>
            <label> Nome: (deve ser igual ao do cartão) </label>
            <input name="nome" type="text"></input>

            <label> Sobrenome: (deve ser igual ao do cartão ) </label>
            <input name="sobrenome" type="text"></input>

            <label> Número do Cartão </label>
            <input name="cartao" type="password"></input>

            <label> Data de Validade </label>
            <input name="data_validade" type="month"></input>

            <label> Código de Segurança </label>
            <input name="codigo_seguranca" type="password"></input>

            <button> Pay </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Transaction;

