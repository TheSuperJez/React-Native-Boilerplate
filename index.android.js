/**
 * @module Common
 * 
 * @author Jorge Esteban Zaragoza Salazar
 */

import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import Home from './src/components/android/Home';
import Second from './src/components/common/Second';

/**
* Component que configura las rutas de la aplicación.
*
* @class Navigation
* @extends React.Component 
*/
class Navigation extends React.Component {
  render() {
    return (
      <Navigator
        configureScene={this.configureScene}
        initialRoute={{ id: 'home' }}
        renderScene={this.navigatorRenderScene} />
    );
  }
  /**
	* Método que configura las rutas del router
	*
	* @method navigatorRenderScene
	*/
  navigatorRenderScene(route, navigator) {
    switch (route.id) {
      case 'home':
        return (<Home navigator={navigator} {...route.passProps} title="Home" />);
      case 'second':
        return (<Second navigator={navigator}  {...route.passProps} title="second" />);
    }
  }
  /**
	* Método que configura el comportamiento del router
	*
	* @method configureScene
	*/
  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.VerticalDownSwipeJump
  }
}

AppRegistry.registerComponent('Boilerplate', () => Navigation);
