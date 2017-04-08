/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const requireAudio = require('./advertising.mp3');
const Sound = require('react-native-sound');
const Button = ({ title, onPress, style }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={style}>{title}</Text>
  </TouchableOpacity>
);


export default class WaveyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sound: undefined,
      playing: false
    }
  }
  onPlay = (e) => {
    if (!this.state.playing) {
      sound = new Sound(requireAudio, (e) => {
        if (e) {
          console.log('error', e);
          return;
        }

        sound.play(() => sound.release());
      })
      this.setState({ sound: sound, playing: true });
    }
  }
  onStop = (e) => {
    var sound = this.state.sound;
    sound.stop(() => sound.release());
    this.setState({
      playing: false
    })
  }
  render() {
    var playingLabel = "nothing is playing";
    if (this.state.playing) {
      playingLabel = "playing....";
    }
    return (
      <View style={styles.container}>
        <Button style={[styles.button, styles.playButton]} title="Play" onPress={this.onPlay} />
        <Button style={[styles.button, styles.stopButton]} title="Stop" onPress={this.onStop} />
        <Text style={styles.playingLabel}>{playingLabel}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  button: {
    width: 100,
    height: 50,
    fontWeight: "bold",
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
    textAlign: 'center',
    margin: 4
  },
  playButton: {
    color: "red",
  },
  stopButton: {
    color: 'gray',
  },
  playingLabel: {
    height: 50,
    fontSize: 40,
    margin: 10,
    color: "orange"
  },
});

AppRegistry.registerComponent('WaveyApp', () => WaveyApp);