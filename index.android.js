/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import Home from './src/components/android/Home';
import Second from './src/components/common/Second';

class Navigation extends React.Component {
  render() {
    return (
      <Navigator
        configureScene={this.configureScene}
        initialRoute={{ id: 'home' }}
        renderScene={this.navigatorRenderScene} />
    );
  }

  navigatorRenderScene(route, navigator) {
    switch (route.id) {
      case 'home':
        return (<Home navigator={navigator} {...route.passProps} title="Home" />);
      case 'second':
        return (<Second navigator={navigator}  {...route.passProps} title="second" />);
    }
  }
  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.VerticalDownSwipeJump
  }
}




AppRegistry.registerComponent('Boilerplate', () => Navigation);
