
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Animated,Easing,TouchableWithoutFeedback,Image} from 'react-native';
import AsyncStorageHelper from './asyncStorageHelper'
import Game from './Game';
import AudioButton from './AudioButton';

export default class End extends Component{

  constructor(props){
    super(props);
    this.state = {
      autoplay: true,
      points: 0
    }
  }
  componentDidMount(){

    AsyncStorageHelper.get("current_points").then(response=>{
      this.setState({
        points:response
      });
    });

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
        fontSize: 80,
        fontWeight:'bold',
        padding: 10,
        backgroundColor: 'black',
        width: '80%'

      },
      score: {
        fontSize: 80,
        textAlign: 'center',
        margin: 10,
        color: 'white',
        backgroundColor: 'black',
        padding: 10,
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
          <Text style={styles.welcome}>SCORE{this.state.points}</Text>
          <Text style={styles.start}>Press anywhere to play again</Text>
        </View>
        </TouchableWithoutFeedback>
        <View style={styles.menu}>
        <AudioButton/>
        </View>
      </View>
    );

}
}
