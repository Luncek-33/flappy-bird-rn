import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Bird from './src/component/Bird';
import { useEffect, useState } from 'react';

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  const birdLeft = screenWidth / 2;
  const gravity = 3;
  const jumpHeight = 50;

  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);

  let gameTimerId;

  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(b => b - gravity);
      }, 30);
    }

    return () => {
      clearInterval(gameTimerId);
    };
  }, [birdBottom]);

  const jump = () => {
    if (birdBottom < screenHeight - 50) {  
      setBirdBottom(birdBottom => birdBottom + jumpHeight);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <Bird birdBottom={birdBottom} birdLeft={birdLeft} color="red" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
