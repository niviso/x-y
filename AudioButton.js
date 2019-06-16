
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
        width: '100%',
        height: '100%',
      },
      text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        padding: 10,
        width: 150
      },
      menu: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 10

      }
    });
    return (
        <TouchableWithoutFeedback onPress={this.toggleSound}>
        <View style={styles.menu}>
        <Text style={{...styles.text,backgroundColor: this.state.sound ? 'green' : 'red'}}>SOUND {this.state.sound ? 'ON' : 'OFF'}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

}
