
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Animated,Easing,TouchableWithoutFeedback} from 'react-native';
import Game from './Game';
import GameState from './GameState';

export default class Start extends Component{

  constructor(props){
    super(props);
    this.state = {
      pressed: false,
      autoplay: true,
      xValue: new Animated.Value(0.9),
    }
  }
  animate = (int,timing) => {
    Animated.timing(
      this.state.xValue,
      {
        toValue: int,
        duration: timing || GameState.DEFAULT_ANIMATION_TIME,
        easing: Easing.easeIn
      }
    ).start();
  }
  _onPress = () => {
    this.animate(0);
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

      }
    });
    return (
      <View style={styles.container}>
        <Game autoplay={this.state.autoplay}/>
        <TouchableWithoutFeedback onPress={this._onPress}>
        <Animated.View style={{...styles.absoluteWrapper,opacity: this.state.xValue}}>
          <Text style={styles.welcome}>X + Y</Text>
          <Text style={styles.start}>Press anywhere to start game</Text>
        </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

}
