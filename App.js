import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,SafeAreaView} from 'react-native';
import Game from './Game';
import Start from './Start';
import End from './End';


export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      screen : 'start' //start,game,finish
    }
  }
  setScreen = (str) => {
    this.setState({
      screen: str
      });
  }
  startGame = () => {
    this.setState({
      screen: 'game'
      });
  }
  stopGame = () => {
    this.setState({
      screen: 'start'
      });
  }
  componentDidMount(){
    setTimeout(x=>{
      this.setState({
        message: 'big bop'
        })
      },5000);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        { this.state.screen == 'start' && ( <Start startGame={this.startGame}/> ) }
        { this.state.screen == 'game' && ( <Game stopGame={this.stopGame}/> ) }
        { this.state.screen == 'end' && ( <End setScreen={this.startGame}/> ) }

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
