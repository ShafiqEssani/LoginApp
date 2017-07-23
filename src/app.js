import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Spinner, Button } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { LoggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
    apiKey: 'AIzaSyA5tVmY9DKVC0qphRjJ40UR-r0fiRlYJIk',
    authDomain: 'loginapp-df8d1.firebaseapp.com',
    databaseURL: 'https://loginapp-df8d1.firebaseio.com',
    projectId: 'loginapp-df8d1',
    storageBucket: 'loginapp-df8d1.appspot.com',
    messagingSenderId: '491701886687'
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({ LoggedIn: true });
    } else {
      this.setState({ LoggedIn: false });
    }
  });
  }

  formState() {
    switch (this.state.LoggedIn) {
      case true:
        return (
          <View style={styles.viewStyle}>
            <Button whenPressed={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.viewStyle}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.formState()}
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    height: 40
    //flexDirection: 'row',
    //justifyContent: 'center',
    //alignItems: 'center',
    //position: 'relative'
  }
};

export default App;
