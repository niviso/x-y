
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Animated,Easing,TouchableWithoutFeedback,Image} from 'react-native';
import Game from './Game';
import GameState from './GameState';
import AudioHelper from './AudioHelper';
import AudioButton from './AudioButton';
export default class Start extends Component{

  constructor(props){
    super(props);
    this.state = {
      pressed: false,
      autoplay: true,
      sound: true
    }
  }
  toggleSound = () => {
    console.log(AudioHelper.list);
      this.setState(prevState => ({
      sound: !prevState.sound
    }));
    if(!this.state.sound){
      AudioHelper.unMuteAll();
    } else {
      AudioHelper.muteAll();
    }
  }

  _onPress = () => {
    this.setState({
      autoplay: false
    });
      this.props.startGame();
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
      welcome: {
        textAlign: 'center',
        margin: 10,
        color: 'white',
        fontSize: 100,
        fontWeight:'bold',
        padding: 10,
        backgroundColor: 'black',
        width: '80%'

      },
      start: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'white',
        backgroundColor: 'black',
        marginBottom:100,
        padding: 10,
        width: '80%'


      },
      absoluteWrapper: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height:' 100%',
        backgroundColor: 'white',
        opacity: 0.95,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

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
        <Game autoplay={this.state.autoplay}/>
        <TouchableWithoutFeedback onPress={this._onPress}>
        <View style={styles.absoluteWrapper}>
          <Text style={styles.welcome}>X + Y</Text>
          <Text style={styles.start}>Press anywhere to start game</Text>
        </View>
        </TouchableWithoutFeedback>
        <View style={styles.menu}>
        <AudioButton/>
        </View>


      </View>
    );
  }

}
