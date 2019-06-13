
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Animated,Easing, TouchableWithoutFeedback} from 'react-native';
import GameState from './GameState';

export default class Answer extends Component{

  constructor(props){
    super(props);
    this.state = {
      pressed: false,
      right: false,
      backgroundColor: new Animated.Value(0),
    }
  }
  startAutoPlay = () => {
    this.autoPlay = setInterval(x=> {
      this._onPress();
    },(Math.floor((Math.random() * 4000) + 2000)));
  }

  stopAutoPlay = () => {
    clearInterval(this.autoPlay);
  }
  componentDidMount(){
    if(this.props.autoplay){
      this.startAutoPlay();
    }
  }
  componentWillUnmount(){
    if(this.props.autoplay){
      this.stopAutoPlay();
    }
  }
  componentWillReceiveProps(newProps) {
    const oldProps = this.props

    if(newProps.item !== oldProps.item){
        this.animate(0);
        this.setState({
          pressed: false,
          right: false
        });
    }
  }

  animate = (int,timing) => {
    this.state.backgroundColor.setValue(int-1);
    Animated.timing(
      this.state.backgroundColor,
      {
        toValue: int,
        duration: timing || GameState.DEFAULT_ANIMATION_TIME,
        easing: Easing.easeIn
      }
    ).start();
  }
  _onPress = () => {
    if(this.state.pressed){
      return;
    }
    var result = this.props.onClick();
    this.setState({
      pressed: true
    });
    if(this.props.isRightOption) {
      this.setState({
        right: true
      });
    }
    }

  getColor = () => {
    if(this.state.pressed && !this.props.isRightOption){
      return 'firebrick'
    }else if(this.state.right){
      return 'mediumseagreen'
    }else{
      return 'white';
    }
  }
  render(){
    const backgroundColor = this.state.backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 1)', 'rgba(214, 69, 65, 1)']
  });
  const textcolor = this.state.backgroundColor.interpolate({
  inputRange: [0, 1],
  outputRange: ['rgba(0, 0, 0, 1)', 'rgba(255, 255, 255, 1)']
});
    const styles = StyleSheet.create({
      answer: {
        borderTopColor: 'rgba(0,0,0,0.9)',
        borderTopWidth:1,
        height: '100%',
        width: '100%',
        color: '#333333',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -1,
        padding: 0
      },
      answerText: {
        color: 'black',
        fontSize: 50
      },
      wrapper: {
        height: '25%'
      }
    });

    return (
      <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={this._onPress}>
      <View                 // Special animatable View
  style={{
    ...styles.answer,
    backgroundColor: this.getColor(),
        // Bind opacity to animated value
  }}
>
          <Text style={{...styles.answerText,
          color: this.state.pressed ? 'white' : 'black'
        }}>{this.props.item}</Text>
        </View>

      </TouchableWithoutFeedback>
      </View>
    );
  }

}
