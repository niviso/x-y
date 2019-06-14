
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Animated, TouchableWithoutFeedback} from 'react-native';
import GameState from './GameState';
import Answer from './Answer';
import AudioHelper from './AudioHelper';
import AsyncStorageHelper from './asyncStorageHelper'
export default class Game extends Component{

  constructor(props){
    super(props);
    this.state = {
      time: GameState.START_TIME,
      points: 0,
      combo: {
        index: 0,
        time: 1000
      },
      data: {
        question: '92 + 2?',
        answers: [2,3,4,94],
        rightAnswer: 94
      },
    }

    this.timer = null;
    this.rightAnswerSound = require('./assets/music/right.mp3');
    this.wrongAnswerSound = require('./assets/music/wrong.wav');


  }

  shuffle = (a) => {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
  }
  _pressAnswer = (i) => {
    if(parseInt(this.state.data.rightAnswer) === parseInt(this.state.data.answers[i])){
      this.setState(prevState => ({
        time: prevState.time + GameState.POINTS_ON_RIGHT
      }));
      if(!this.props.autoplay){
        AudioHelper.init(this.rightAnswerSound);
      }
      setTimeout(x=>{
        this.generateQuestion();
      },250);
    } else {
      this.setState(prevState => ({
        time: prevState.time - GameState.POINTS_ON_WRONG
      }));
      if(!this.props.autoplay){
        AudioHelper.init(this.wrongAnswerSound);
      }

    }
  }
  generateQuestion = () => {
    const total = Math.floor((Math.random() * 100) + 1);
    const minus = Math.floor((Math.random() * total) + 1);
    const difference = Math.abs(total - minus);
    const question = difference + " + " + minus;
    var answers = [total];
    for(let i = 0;i!=3;i++){
      const randomAnswer = (Math.floor((Math.random() * 100) + 1));
      if(answers.indexOf(randomAnswer) === -1){
      answers.push(randomAnswer);
    } else {
      i--;
    }
    }
    answers = this.shuffle(answers);
    this.setState({
      data: {
        question: question,
        answers: answers,
        rightAnswer: total
      }
    });

  }
  getTimerColor = (int) => {
    if(int > 60){
      return 'mediumseagreen';
    } else if(int > 20){
      return 'darkorange';
    } else {
      return 'firebrick';
    }
  }
  componentDidMount(){
    this.generateQuestion();
    this.timer = setInterval( x => {
      this.setState(prevState => ({
        time: prevState.time - (GameState.SECOND/GameState.FPS)
      }));
      if(this.state.time <= 0){
        if(this.props.autoplay){
          this.setState({
            time: GameState.START_TIME
          });
        } else {
          this.props.stopGame();
        }
      }

    },GameState.SECOND/GameState.FPS);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  render(){
    const NORMALIZED_TIME = (this.state.time/GameState.START_TIME) * 100;
    const NORMALIZED_COMBO_TIME = (this.state.combo.time/GameState.COMBO_TIMER_START) * 100;

    const TIMER_COLOR = this.getTimerColor(NORMALIZED_TIME);
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
      },
      timerBar: {
        backgroundColor: TIMER_COLOR,
        height: '15%',
        width: NORMALIZED_TIME.toString() + "%",
        color: '#333333',
      },
      comboBar: {
        backgroundColor: 'green',
        height: '5%',
        width: NORMALIZED_COMBO_TIME.toString() + "%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      whiteTxt: {
        color: 'white',
        fontSize: 20
      },
      question: {
        height: '40%',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      questionText: {
        color: '#333333',
        fontSize: 90
      },
      answerWrapper: {
        height: '50%',
        width: '100%',
      }
    });

    const answers = this.state.data.answers.map((item, i) => {
                return (
                    <Answer item={item} key={i} isRightOption={item === this.state.data.rightAnswer} autoplay={this.props.autoplay} onClick={() => this._pressAnswer(i)}/>
                );
              });
    return (
      <View style={styles.container}>
        <View style={styles.timerBar}></View>
        <View style={styles.comboBar}><Text style={styles.whiteTxt}>x{this.state.combo.index}</Text></View>

        <View style={styles.question}>
        <Text style={styles.questionText}>{this.state.data.question}</Text>
        </View>
        <View style={styles.answerWrapper}>
        {answers}
        </View>

      </View>
    );
  }

}
