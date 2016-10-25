import request from 'superagent';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  BackAndroid
} from 'react-native';

import { wsWeather } from '../../constants/home.constants';

export default class Second extends Component {
  constructor(context, props) {
    super(context, props);
    this.state = {
      saludos: ['Hallo ',
        'Hello ',
        'Konnichiwa',
        'Ni Hao',
        'Salut',
        'Hola ']
    }
    this._redirect = this._redirect.bind(this);
  }
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress',  () => {
      this._redirect();
      return true;
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.saludos.map((saludo, index) => {
            return <Text key={index}>{saludo} {this.props.name}{'\n'}</Text>
          })}
        </Text>
        <View style={styles.button}>
          <TouchableHighlight onPress={this._redirect}>
            <Text style={styles.buttonText}>{'< Regresar'}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  _redirect() {
    this.props.navigator.pop(1);
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#666666',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
  },
  instructions: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 5,
    marginTop: 5,
    borderRadius: 10
  },
  buttonText: {
    color: '#000000'
  }
});

AppRegistry.registerComponent('Second', () => Second);
