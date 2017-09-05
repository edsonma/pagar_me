import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

// Message component that could show better info
// Todo: need to fix handleDismiss
// Todo: need to change bsStyle (danger, info, warning, success) depending of type of message
class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alertVisible: true
    }

    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
  };

  handleAlertDismiss() {
    this.setState({
      alertVisible: false
    });
  }

  render() {
    return (
    <Alert bsStyle={this.props.message_type} onDismiss={this.handleAlertDismiss}>
      <h5>{this.props.message}</h5>
    </Alert>
    )
  }
}

export default Message;
