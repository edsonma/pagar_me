import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import { Glyphicon, Row, Col, Grid } from 'react-bootstrap';
import './transaction.css';
import pagarme from 'pagarme';

class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card_number: '',
      card_holder_name: '',
      card_expiration_date: '',
      card_cvv: '',
      api_key: 'ak_test_TS9bFUr3GHFoMiMrFzALO7DG6hO3xN',
      enc_key: 'ek_test_O3BDfhxbrXrHTaDujCKP6BqYVyqqNl',
      card_hash: '',
      amount: '',
    };

    this.handleChangeNome = this.handleChangeNome.bind(this);
    this.handleChangeNumeroCartao = this.handleChangeNumeroCartao.bind(this);
    this.handleChangeValidade = this.handleChangeValidade.bind(this);
    this.handleChangecvv = this.handleChangecvv.bind(this);
    this.handleChangeValor = this.handleChangeValor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Todo: implement this later
  handleResponse(result, success, fail) {
    if(result.ok){
      console.log(result);
    } else {
      console.log(result.status);
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const card = {
      card_holder_name: this.state.card_holder_name,
      card_number: this.state.card_number,
      card_expiration_date: this.state.card_expiration_date.replace("-","/"),
      card_cvv: this.state.card_cvv,
    };

    const jsonCard = JSON.stringify(card);
    console.log(jsonCard);

    /* Todo: some bug related to "card number is missing"
     * var cardValidations = pagarme.validate({card: jsonCard})
     * */

    /* Todo: return json must be validated */
    pagarme.client.connect({ encryption_key: this.state.enc_key })
      .then(client => client.security.encrypt(card))
      .then((new_card_hash) => { this.setState({card_hash: new_card_hash})})

    /* Todo: refactor to modules each transaction steps */
    /* Todo: create forms for each data information */
    /* Todo: format expiration date for transaction */
    /* Todo: checkout how to allow amount payment test */
    const credit_card_transaction = {
      api_key: this.state.api_key,
      amount: this.state.amount,
      card_number: this.state.card_number,
      card_cvv: this.state.card_cvv,
      card_expiration_date: "1220",
      card_holder_name: this.state.card_holder_name,
      billing: {
        address: {
          street: "Guara",
          complementary: "apartamento",
          street_number: "2",
          neighborhood: "guara2",
          city: "brasilia",
          state: "df",
          zipcode: "70000123",
          country: "br",
        },
        name: "Trinity Moss"
      },
      items: [{
        id: "r2d3",
        title: "Red pills",
        unit_price: "50",
        quantity: "1",
        tangible: true
      }],
      customer: {
        external_id: "#3311",
        name: this.state.card_holder_name,
        type: "individual",
        country: "br",
        email: "mranderson@matrix.com",
        documents: [
          {
            type: "cpf",
            number: "47323515300"
          }
        ],
        phone_numbers: ["+556123124234", "+5561234523451"],
        birthday: "1982-01-02"
      }
    }

    const jsonTransaction = JSON.stringify(credit_card_transaction);
    console.log(jsonTransaction);

    fetch('https://api.pagar.me/1/transactions', {
      method: 'post', body:jsonTransaction, headers: {'Content-Type':'application/json'}
    }).then( transaction_status => { console.log(transaction_status) })
  }



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

  handleChangeValidade(event) {
    this.setState({
      card_expiration_date: event.target.value
    });
  }

  handleChangecvv(event) {
    this.setState({
      card_cvv: event.target.value
    });
  }

  handleChangeValor(event) {
    this.setState({
      amount: event.target.value
    })
  }

  /* todo: fields valiation */
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
              value={this.state.card_holder_name}
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
              value={this.state.card_number}
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
              value={this.state.card_cvv}
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
              value={this.state.card_expiration_date}
              placeholder="YYYY/MM"
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
                value={this.state.amount}
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

