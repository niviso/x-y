import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,SafeAreaView} from 'react-native';
import Game from './Game';
import Start from './Start';
import End from './End';
import AudioHelper from './AudioHelper';
import AudioList from './references/AudioList';


export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      screen : 'start', //start,game,finish
      playing: false
    }

  }


  setScreen = (str) => {
    this.setState({
      screen: str
      });
  }
  startGame = () => {
    AudioHelper.stopAll().then(x=>{
    AudioHelper.init(AudioList.BGM_01);
    });
    this.setState({
      screen: 'game'
      });


  }
  stopGame = () => {
    AudioHelper.stopAll().then(x=>{
    AudioHelper.init(AudioList.IDLE);

    });
    this.setState({
      screen: 'end'
      });
  }
  componentDidMount(){
    AudioHelper.init(AudioList.IDLE);
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
