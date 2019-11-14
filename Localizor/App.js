import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: './assets/walkforest.jpg'
    };
  }


  render() {
    return (
      <ImageBackground source={require('./assets/walkforest.jpg')} style={styles.welcomeScreen}> 

        <Text style={styles.textStyle}> On My Way</Text>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  welcomeScreen: {
    height: '100%',
    width:'100%',
  },

  textStyle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
//    position: 'absolute',
    top: '30%',


  },
  
  // CSS flexbox > flexbox froggy
  
});