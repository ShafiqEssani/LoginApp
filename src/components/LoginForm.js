import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = { email: '', password: '', errorMsg: '', isLoading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ errorMsg: '', isLoading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    this.setState({
      errorMsg: 'Authentication Failed',
      isLoading: false
    });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      isLoading: false,
      errorMsg: ''
    })
  }

  checkButton() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
    return (
      <Button whenPressed={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  render() {
    return (
      <Card>

        <CardSection>
          <Input
            placeholder={'user@gmail.com'}
            label={'Email'}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
          secureTextEntry
          placeholder={'password'}
          label={'Password'}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorStyle}>
          {this.state.errorMsg}
        </Text>

        <CardSection>
          {this.checkButton()}
        </CardSection>

      </Card>
    );
  }
}

const styles = {
  errorStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
