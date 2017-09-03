import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import { Glyphicon, Row, Col, Grid } from 'react-bootstrap';
import './transaction.css';

class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: '',
      numero_cartao: '',
      validate: '',
      cvv: '',
      api_key: 'ak_test_TS9bFUr3GHFoMiMrFzALO7DG6hO3xN',
      valor: '',
    };

    this.handleChangeNome = this.handleChangeNome.bind(this);
    this.handleChangeNumeroCartao = this.handleChangeNumeroCartao.bind(this);
    this.handleChangeValidade = this.handleChangeValidade.bind(this);
    this.handleChangecvv = this.handleChangecvv.bind(this);
    this.handleChangeValor = this.handleChangeValor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleResponse(result, success, fail) {
    if(result.ok){
      console.log(result);
    } else {
      console.log(result.status);
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const stateClone = {
      nome: this.state.nome,
      numero_cartao: this.state.numero_cartao,
      validate: this.state.validade,
      cvv: this.state.cvv,
      api_key: this.state.api_key
    };

    const jsonParams = JSON.stringify(stateClone);

    fetch('https://api.pagar.me/1/transactions', {
      method: 'post', body:jsonParams, headers: {'Content-Type': 'application/json'}
      })
  }


  handleChangeNome(event) {
    this.setState({
      nome: event.target.value
    });
  }

  handleChangeNumeroCartao(event) {
    this.setState({
      numero_cartao: event.target.value
    });
  }

  handleChangeValidade(event) {
    this.setState({
      validade: event.target.value
    });
  }

  handleChangecvv(event) {
    this.setState({
      cvv: event.target.value
    });
  }

  handleChangeValor(event) {
    this.setState({
      valor: event.target.value
    })
  }

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
          <FormGroup>
            <ControlLabel> Nome Completo: (deve ser igual ao do cartão) </ControlLabel>
            <FormControl
              type="text"
              placeholder="Nome Completo"
              value={this.state.nome}
              onChange={this.handleChangeNome}
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
              value={this.state.numero_cartao}
              onChange={this.handleChangeNumeroCartao}
            />
          </FormGroup>
        </Col>
        <Col xs={2} md={2}>
          <FormGroup>
            <ControlLabel> Código de Segurança </ControlLabel>
            <FormControl
              type="text"
              placeholder="cvv"
              value={this.state.cvv}
              onChange={this.handleChangecvv}
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
            <FormControl
              type="month"
              placeholder="MM-yyyy"
              value={this.state.validade}
              onChange={this.handleChangeValidade}
            />
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
            <InputGroup>
              <FormControl
                type="text"
                placeholder="50"
                value={this.state.valor}
                onChange={this.handleChangeValor}
              />
              <InputGroup.Addon>.00</InputGroup.Addon>
            </InputGroup>
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

    <div>
      <p>Nome: {this.state.nome}</p>
      <p>Numero: {this.state.numero_cartao}</p>
      <p>cvv: {this.state.cvv}</p>
      <p>Validade: {this.state.validade}</p>
      <p>Valor: {this.state.valor}</p>
    </div>
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

