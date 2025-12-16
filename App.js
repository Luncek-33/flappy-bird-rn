import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Bird from './src/component/Bird';
import { useEffect, useState } from 'react';
import Obstacles from './src/component/obstacle';

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  const [obstaclesLeft,setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo,setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 +30);
  let obstacleWidth= 60;
  let obstacleHeight = 300;
  let gap = 200;

  const [obstacleNegativeHeight, setObstacleNegativeHeight] = useState(0);
  const [obstacleNegativeHeightTwo, setObstacleNegativeHeightTwo] = useState(0);
  


  const birdLeft = screenWidth/2;
  const [birdBottom, setBirdBottom] = useState(screenHeight/2);
  const gravity = 3;
  let gameTimerId;
  let obstacleTimerId;
  let obstacleTimerIdTwo;
  let setObstaclesTimerTwo;
  let[score, setScore] = useState(0);
  



  useEffect(() => {
    if(obstaclesLeftTwo > -60) {
      obstacleTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo((obstaclesLeftTwo)=> obstaclesLeftTwo-5)
      },30)
      return () => {
        clearInterval(obstacleTimerIdTwo);
      }
    } else {
      setObstaclesLeftTwo(screenWidth);
      setObstacleNegativeHeightTwo(-Math.random() * 100)

    }
  }, [obstaclesLeftTwo]);

  useEffect(() => {
    if(obstaclesLeft > -60) {
      obstacleTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft)=> obstaclesLeft-5)
      },30)
      return () => {
        clearInterval(obstacleTimerId);
      }
    } else {
      setObstaclesLeft(screenWidth);
      setObstacleNegativeHeight(-Math.random() * 100)
    }
  }, [obstaclesLeft]);

  useEffect(() => {
    if(birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom=>birdBottom-gravity)
      }, 30)
    }

    return () => {
      clearInterval(gameTimerId);
    };
  }, [birdBottom]);

  return (
    <View style={styles.container}>
      <Bird birdBottom={birdBottom} birdLeft={birdLeft} color={"red"} />

      <Obstacles
      color={"green"}
      obstacleWidth={obstacleWidth}
      obstacleHeight={obstacleHeight}
      randomBottom={obstacleNegativeHeight}
      gap={gap}
      obstaclesLeft={obstaclesLeft}></Obstacles>

      
      <Obstacles
      color={"yellow"}
      obstacleWidth={obstacleWidth}
      obstacleHeight={obstacleHeight}
      randomBottom={obstacleNegativeHeightTwo}
      gap={gap}
      obstaclesLeft={obstaclesLeftTwo}></Obstacles>
    </View>
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
