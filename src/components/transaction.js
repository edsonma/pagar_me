import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import { Glyphicon, Row, Col, Grid } from 'react-bootstrap';
import { Payment } from 'payment';
import './transaction.css';

class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: "",
      numero_cartao: 0,
      sobrenome: "",
      validate_mes: "",
      validade_ano: "",
      cvc: 0,
      token: "",
      valor: 0,
    };
  }

  componentDidMount() {
    const { numero_cartao, validade_mes, validade_ano, cvc  } = this.refs;
    /*
    Payment.formatCardNumber(numero_cartao);
    Payment.formatCardExpiry(data_validade);
    Payment.formatCardCVC(cvc);
    */
  }

  handleSubmit(event) {
    event.preventDefault();
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
            <ControlLabel> Nome: (deve ser igual ao do cartão) </ControlLabel>
            <FormControl
              type="text"
              placeholder="Nome"
              inputRef={ref => { this.nome = ref; }}
            />
            <ControlLabel> Sobrenome: (deve ser igual ao do cartão ) </ControlLabel>
            <FormControl
              type="text"
              placeholder="Sobrenome"
              inputRef={ref => { this.sobrenome = ref; }}
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
              type="number"
              placeholder="xxxx xxxx xxxx xxxx"
              inputRef={ref => { this.input = ref; }}
            />
          </FormGroup>
        </Col>
        <Col xs={2} md={2}>
          <FormGroup>
            <ControlLabel> Código de Segurança </ControlLabel>
            <FormControl
              type="number"
              placeholder="CVC"
              inputRef={ref => { this.input = ref; }}
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
              placeholder="MM/YYYY"
            />
          </FormGroup>
        </Col>
        </Row>

        <Row>
        <Col xs={4} md={4}>
          <FormGroup>
            <ControlLabel> Valor do Pagamento R$: </ControlLabel>
            <InputGroup>
              <FormControl
                type="number"
                placeholder="50"
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
      <div>
        { this.renderCardForm() }
      </div>
    );
  }
}

Transaction.propTypes = {};

export default Transaction;

