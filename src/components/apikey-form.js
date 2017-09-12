import React, { Component } from 'react';
import {Button, ControlLabel, FormGroup } from 'react-bootstrap';
import { Row, Col, Grid } from 'react-bootstrap';
class ApiKeyForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();

    var keys = {
      api_key: this.refs.api_key.value,
      enc_key: this.refs.enc_key.value
    }

    this.props.handleKey(keys);
  }

  render() {
    return(
    <div>
      <form onSubmit={ this.handleSubmit } >
        <Grid>
          <Row>
            <Col xs={6} md={6}>
              <h4> DEV - default uses as input bellow </h4>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={6}>
              <FormGroup>
                <ControlLabel> API_KEY: </ControlLabel>
                <input
                  type="text"
                  placeholder="API_KEY"
                  defaultValue={this.props.api_key}
                  ref="api_key"
                  required={true}
                  size={this.props.api_key.length+5}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={6}>
              <FormGroup>
                <ControlLabel> ENC_KEY: </ControlLabel>
                <input
                  type="text"
                  placeholder="ENC_KEY"
                  defaultValue={this.props.enc_key}
                  ref="enc_key"
                  required={true}
                  size={this.props.enc_key.length+5}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={3} md={3}>
              <FormGroup>
              <Button
                type="submit"
                bsStyle="warning"
                block>
                  Change KEYS
              </Button>
              </FormGroup>
            </Col>
          </Row>
        </Grid>
      </form>
    </div>
    )
  }
}

export default ApiKeyForm;
