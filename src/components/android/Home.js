/**
 * @module Home
 * 
 * @author Jorge Esteban Zaragoza Salazar
 */

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

import { wsWeather } from '../../constants/home.constants';

/**
* Component que muestra el home para android.
*
* @class Home
* @extends Component 
*/
export default class Home extends Component {
    constructor(context, props) {
        super(context, props);
        this.state = {
            weather: '',
            isLoading: false,
            name: ''
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
                    {'Prueba de concepto utilizando React Native'}
                </Text>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
                    />
                <Text style={styles.instructions}>
                    Por Jorge Esteban Zaragoza Salazar
                </Text>
                <View style={styles.button}>
                    <TouchableHighlight onPress={this._getWeather}>
                        <Text style={styles.buttonText}>Obtener Clima</Text>
                    </TouchableHighlight>
                </View>
                {this.state.isLoading ?
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
                    : null}
                <Text style={styles.instructions}>
                    {this.state.weather}
                </Text>
                <TextInput name="name"
                    style={{ borderRadius: 5, width: 200, height: 40, borderColor: 'black', backgroundColor: 'white', borderWidth: 1 }}
                    onChangeText={(name) => { this.setState({ name }) } }
                    value={this.state.name}
                    placeholder={'Escribe tu nombre'}
                    />
                <View style={styles.button}>
                    <TouchableHighlight onPress={this._redirect}>
                        <Text style={styles.buttonText}>{'Enviar'}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
    /**
	* Método que obtiene el clima de CDMX desde el api de openweather
	*
	* @method _getWeather
	* @param {Event} event, Evento del botón
	*/
    _getWeather(event) {
        var self = this;
        this.setState({ isLoading: true });
        request
            .get(wsWeather)
            .end(function (err, res) {
                if (res.status == 200) {
                    let clima = JSON.parse(res.text);
                    self.setState({
                        weather: clima.name + ': ' + clima.main.temp,
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
    /**
	* Método que redirige y envía los datos al segundo activity
	*
	* @method _redirect
	*/
    _redirect() {
        if (this.state.name !== '') {
            this.props.navigator.push({
                id: 'second', passProps: {
                    name: this.state.name
                }
            });
        } else {
            Alert.alert('Aviso', 'Debe ingresar un nombre');
        }
    }
}


/**
 * Constante para almacenar los estilos del component
 * @property styles
 * @public
 * @type {Object}
 */
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
        borderRadius: 10,
        borderColor: '#000000'
    },
    buttonText: {
        color: '#000000'
    }
});

AppRegistry.registerComponent('Home', () => Home);
