import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Animated
} from "react-native";
import { RNFFmpeg } from "react-native-ffmpeg";

const videoUrl =
  "https://ia800308.us.archive.org/30/items/popeye_shuteye_popeye/popeye_shuteye_popeye_512kb.mp4";

export default class App extends Component {
  state = {
    command: `-i ${videoUrl}`,
    isExecuting: false,
    rc: null,
    animatedWidth: new Animated.Value(50)
  };

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.animatedWidth, {
          toValue: 200
        }),
        Animated.timing(this.state.animatedWidth, {
          toValue: 50
        })
      ])
    ).start();
  }

  onChangeCommand = command => {
    this.setState({ command });
  };

  executeCommand = async () => {
    if (this.state.isExecuting) return;

    this.setState({ isExecuting: true, rc: null });
    const rc = await RNFFmpeg.execute(this.state.command);
    this.setState({ isExecuting: false, rc });
  };

  render() {
    const { command, isExecuting, animatedWidth } = this.state;

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.animatedSquare, { width: animatedWidth }]}
        />

        <TextInput
          value={command}
          onChangeText={this.onChangeCommand}
          style={[styles.withPadding, styles.textInput]}
        />

        <Button
          title="RUN"
          color="green"
          onPress={this.executeCommand}
          style={styles.withPadding}
          disabled={isExecuting}
        />

        {isExecuting && (
          <Text style={styles.withPadding}>Executing command...</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  withPadding: {
    padding: 10
  },
  animatedSquare: {
    padding: 10,
    width: 50,
    height: 50,
    backgroundColor: "green"
  },
  textInput: {
    width: "90%",
    margin: 10,
    borderWidth: 1
  }
});
