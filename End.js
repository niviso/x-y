
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class End extends Component{

  constructor(props){
    super(props);
  }

  render(){
    const styles = StyleSheet.create({
      container: {
        textAlign: 'center',
        color: '#333333',
      },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'black',
        opacity: 0.9,
        fontSize: 50

      },
    });
    return (
      <View style={styles.container} onPress={this.props.onClick}>
        <Text style={styles.welcome}>End Game</Text>
      </View>
    );
  }

}
