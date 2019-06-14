import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,SafeAreaView} from 'react-native';
import Game from './Game';
import Start from './Start';
import End from './End';
import AudioHelper from './AudioHelper';


export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      screen : 'start', //start,game,finish
      playing: false
    }
    this.STARTMUSIC = require('./assets/music/jazz.mp3');
    this.GAMEMUSIC = require('./assets/music/06.mp3');
    this.ENDING = require('./assets/music/ending.wav');

  }


  setScreen = (str) => {
    this.setState({
      screen: str
      });
  }
  startGame = () => {
    AudioHelper.stopAll().then(x=>{
    AudioHelper.init(this.GAMEMUSIC);
    });
    this.setState({
      screen: 'game'
      });


  }
  stopGame = () => {
    AudioHelper.stopAll().then(x=>{
    AudioHelper.init(this.ENDING);

    });
    this.setState({
      screen: 'end'
      });
  }
  componentDidMount(){
    AudioHelper.init(this.STARTMUSIC);
      this.setState({
        playing: true
      });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        { this.state.screen == 'start' && ( <Start startGame={this.startGame}/> ) }
        { this.state.screen == 'game' && ( <Game stopGame={this.stopGame}/> ) }
        { this.state.screen == 'end' && ( <End startGame={this.startGame}/> ) }

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
});
