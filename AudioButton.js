
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Animated,Easing,TouchableWithoutFeedback,Image} from 'react-native';
import AudioHelper from './AudioHelper';

export default class AudioButton extends Component{

  constructor(props){
    super(props);
    this.state = {
      sound: true
    }
  }
  toggleSound = () => {
      this.setState(prevState => ({
      sound: !prevState.sound
    }));
    if(!this.state.sound){
      AudioHelper.unMuteAll();
    } else {
      AudioHelper.muteAll();
    }
  }



  render(){
    const styles = StyleSheet.create({
      container: {
        textAlign: 'center',
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        height:' 100%'
      },
      menu: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 10,
        fontSize: 20

      }
    });
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.toggleSound}>
        <Text style={styles.menu}>Sound: {this.state.sound ? 'ON' : 'OFF'}</Text>
      </TouchableWithoutFeedback>

      </View>
    );
  }

}
