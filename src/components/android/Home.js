import request from 'superagent';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  TextInput,
  Alert
} from 'react-native';

import {wsWeather} from '../../constants/home.constants';

export default class Home extends Component {
    constructor(context, props){
        super(context, props);
        this.state = {
            weather: '',
            isLoading: false
        }
        this._getWeather = this._getWeather.bind(this);
        this._redirect = this._redirect.bind(this);
    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
         {'Hallo Welt!'}
        </Text>
        <Text style={styles.instructions}>
          Prueba de concepto utilizando React Native
        </Text>
         <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://linuxreflejo.files.wordpress.com/2008/11/tux-7-4.png'}}
        />
        <Text style={styles.instructions}>
          Por Jorge Esteban Zaragoza Salazar
        </Text>
         <View style={styles.button}>
        <TouchableHighlight onPress={this._getWeather}>
            <Text style={styles.buttonText}>Obtener Clima</Text>
        </TouchableHighlight>
        </View>
        {this.state.isLoading?
        <View>
            <ActivityIndicator
                animating={true}
                style={
                {
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                size="large"
            />
        </View>
        :null}
         <Text style={styles.instructions}>
          {this.state.weather}
        </Text>
        <TextInput name="name"
            style={{borderRadius: 5, width: 200, height: 40, borderColor: 'black', backgroundColor: 'white', borderWidth: 1}}
            onChangeText={(name) => {this.setState({name})}}
            value={this.state.name}
            placeholder={'Escribe tu nombre'}
            />
            <View style={styles.button}>
            <TouchableHighlight onPress={this._redirect}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableHighlight>
            </View>
      </View>
    );
  }
  _getWeather(event) {
        var self = this;
        this.setState({isLoading: true});
        request
            .get(wsWeather)
            .end(function (err, res) {
                if (res.status == 200) {
                     let clima = JSON.parse(res.text);
                    self.setState({
                        weather: clima.name + ': '+ clima.main.temp,
                        isLoading: false
                    });
                } else {
                    self.setState({
                        weather: 'Ha ocurrido un error al conectar al servicio!',
                         isLoading: false
                    });
                }
            });
    }
    _redirect() {
        if(this.state.name !== '') {
            this.props.navigator.push({id: 'second', passProps: {
            name: this.state.name}
        });
        } else {
            Alert.alert('Aviso', 'Debe ingresar un nombre');
        }
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
      marginTop:5,
      borderRadius: 10
  },
  buttonText: {
      color: '#000000'
  }
});

AppRegistry.registerComponent('Home', () => Home);
