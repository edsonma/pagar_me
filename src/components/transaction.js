import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { Glyphicon, Row, Col, Grid } from 'react-bootstrap';
import Datetime from 'react-datetime';
import Message from './message';

import moment from 'moment';
import pagarme from 'pagarme';

import './transaction.css';
import './react-datetime.css';

const api_key = 'ak_test_TS9bFUr3GHFoMiMrFzALO7DG6hO3xN'
const enc_key = 'ek_test_O3BDfhxbrXrHTaDujCKP6BqYVyqqNl'

class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card_number: '',
      card_holder_name: '',
      card_expiration_date: '',
      card_cvv: '',
      card_hash: '',
      amount: '',
      message: undefined
    };

    this.handleChangeNome = this.handleChangeNome.bind(this);
    this.handleChangeNumeroCartao = this.handleChangeNumeroCartao.bind(this);
    this.handleChangeValidade = this.handleChangeValidade.bind(this);
    this.handleChangecvv = this.handleChangecvv.bind(this);
    this.handleChangeValor = this.handleChangeValor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  // Todo: Get better information about errors with response status
  handleResponse(result, success, fail) {
    let info;

    if(result.ok){
      info = "Sua requisição foi processada com sucesso!";
    } else {
      if(result.status === 400) {
        info = "Algum parâmetro obrigatório não foi passado, ou os parâmetros passados não estão corretos";
      }else if(result.status === 401) {
        info = "Falta de autorização para acessar este endpoint";
      }else if(result.status === 404) {
        info = "Endpoint não encontrado, revise URL passada";
      }else if(result.status === 400) {
        info = "Erro interno do Pagar.me, tente sua requisição novamente. Caso o erro continue, entre em contato com suporte@pagar.me";
      }
    }

    this.setState({
      message: info
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const card = {
      card_holder_name: this.state.card_holder_name,
      card_number: this.state.card_number,
      card_expiration_date: this.state.card_expiration_date,
      card_cvv: this.state.card_cvv,
    };

    const jsonCard = JSON.stringify(card);
    console.log(jsonCard);

    // bugfix: pagar.me api always return that card_number doest not exist
    // var cardValidations = pagarme.validate({card: jsonCard})

    /* Todo: return json must be validated */
    pagarme.client.connect({ encryption_key: enc_key })
      .then(client => client.security.encrypt(card))
      .then((new_card_hash) => { this.setState({card_hash: new_card_hash})})

    /* Todo: refactor to modules each transaction steps */
    /* Todo: create forms for each required data information (billing, itens, consumer)*/
    /* Todo: Antifraud disabled to make the test easier */
    const credit_card_transaction = {
      api_key: api_key,
      amount: this.state.amount,
      card_number: this.state.card_number,
      card_cvv: this.state.card_cvv,
      card_expiration_date: (this.state.card_expiration_date).slice(0,2)+(this.state.card_expiration_date).slice(5,7),
      card_holder_name: this.state.card_holder_name,
    }

    const jsonTransaction = JSON.stringify(credit_card_transaction);
    console.log(jsonTransaction);

    fetch('https://api.pagar.me/1/transactions', {
       method: 'post', body:jsonTransaction, headers: {'Content-Type':'application/json'}
    }).then(
      result => this.handleResponse(result,
        (r) => { window.location = r.redirect || ''},
        (r) => { this.setState({message: r.message})}
      )
    )}

  /* Todo: one handler for all inputs*/
  handleChangeNome(event) {
    this.setState({
      card_holder_name: event.target.value
    });
  }

  handleChangeNumeroCartao(event) {
    this.setState({
      card_number: event.target.value
    });
  }

  handleChangeValidade(date, event) {
    this.setState({
      card_expiration_date: moment(date).format('MM-YYYY')
    });
  }

  handleChangecvv(event) {
    this.setState({
      card_cvv: event.target.value
    });
  }

  handleChangeValor(event) {
    var nonNumericRegex = /[^0-9.]+/g;

    this.setState({
      amount: event.target.value
              .replace(nonNumericRegex, "")
              .replace(/(\.\d\d)\d+/g, "$1")
              .replace(/^\./g, "0.")
    })
  }

  /* todo: fields validation */
  renderCardForm() {
    return(
    <div>
      <Grid>
        <Row>
        <Col>
          <h3> Pagamento por meio de cartão de crédito </h3>
        </Col>
        </Row>
      </Grid>
      <form className="TransactionForm" onSubmit={ this.handleSubmit }>
        <Grid>
        <Row>
        <Col xs={5} md={5}>
          {this.state.message && <Message message={this.state.message} message_type="info" />}
        </Col>
        </Row>

        <Row>
        <Col xs={5} md={5}>
          <FormGroup>
            <ControlLabel> Nome Completo: (deve ser igual ao do cartão) </ControlLabel>
            <FormControl
              type="text"
              placeholder="Nome Completo"
              value={this.state.card_holder_name}
              onChange={this.handleChangeNome}
              required={true}
            />
          </FormGroup>
        </Col>
        </Row>

        <Row>
        <Col xs={3} md={3}>
          <FormGroup>
            <ControlLabel>
              Número do Cartão <Glyphicon glyph="lock" />
            </ControlLabel>
            <FormControl
              type="text"
              placeholder="xxxx xxxx xxxx xxxx"
              value={this.state.card_number}
              onChange={this.handleChangeNumeroCartao}
              required={true}
            />
          </FormGroup>
        </Col>
        <Col xs={2} md={2}>
          <FormGroup>
            <ControlLabel> Código de Segurança </ControlLabel>
            <FormControl
              type="text"
              placeholder="cvv"
              value={this.state.card_cvv}
              onChange={this.handleChangecvv}
              required={true}
            />
          </FormGroup>
        </Col>
        </Row>

        <Row>
        <Col xs={3} md={3}>
          <div>
            <ul className="credit-card-list clearfix">
              <li><i data-brand="visa" className="fa fa-cc-visa"></i></li>
              <li><i data-brand="mastercard" className="fa fa-cc-mastercard"></i></li>
              <li><i data-brand="amex" className="fa fa-cc-amex"></i></li>
              <li><i data-brand="dinersclub" className="fa fa-cc-diners-club"></i></li>
            </ul>
          </div>
        </Col>
        <Col xs={2} md={2}>
          <FormGroup>
            <ControlLabel> Data de Validade </ControlLabel>
              <Datetime viewMode='months' 
                        defaultValue='' 
                        dateFormat='MM-YYYY' 
                        closeOnSelect={true}
                        onChange={ (value) => { this.handleChangeValidade(value._d); } }> 
              </Datetime>
          </FormGroup>
        </Col>
        </Row>
        <Row>
        <Col xs={5} md={5}>
          <hr></hr>
        </Col>
        </Row>
        <Row>
        <Col xs={4} md={4}>
          <FormGroup>
            <ControlLabel> Valor do Pagamento R$: </ControlLabel>
              <FormControl
                type="text"
                pattern="^\d+(?:\.\d{1,2})?$"
                step="0.01"
                placeholder="0.00"
                value={this.state.amount}
                onChange={this.handleChangeValor}
                required={true}
              />
          </FormGroup>
        </Col>
      </Row>

      <Row>
      <Col xs={5} md={5}>
        <FormGroup>
          <Button
            type="submit"
            bsStyle="success"
            block>
              Processar
          </Button>
        </FormGroup>
      </Col>
      </Row>
      </Grid>
    </form>
    </div>

    )
  }

  render() {
    return (
      <div className="Transaction">
        { this.renderCardForm() }
      </div>
    );
  }
}

Transaction.propTypes = {};

export default Transaction;

