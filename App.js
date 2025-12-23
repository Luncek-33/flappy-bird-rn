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
  const [isGameOver,setIsGameOver] = useState(false);
  const[score, setScore] = useState(0);




  const birdLeft = screenWidth/2;
  const [birdBottom, setBirdBottom] = useState(screenHeight/2);
  const gravity = 3;
  let gameTimerId;
  let obstacleTimerId;
  let obstacleTimerIdTwo;
  let setObstaclesTimerTwo;
  

  useEffect(() => {
    if(
      ((birdBottom< (obstacleHeight+obstacleNegativeHeight +30)||
    birdBottom > (obstacleHeight + obstacleNegativeHeight + gap -30))&&
    (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft <screenWidth/2 +30))
    ||
      ((birdBottom< (obstacleNegativeHeightTwo + obstacleHeight +30)||
    birdBottom > (obstacleHeight + obstacleNegativeHeightTwo + gap -30))&&
    (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo <screenWidth/2 +30))

    )
    {
      console.log("Game Over")
      gameOver()
    }
  })

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstacleTimerId)
    clearImmediate(obstacleTimerIdTwo)
  }


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

  const jump = () => {
    if (!isGameOver && (birdBottom < screenHeight)) {
      setBirdBottom(birdBottom => birdBottom +50)
      console.log("jumped")
    }
  }

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
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
      <Image source={require('./assets/background.png')} style={styles.backgroundImage} />
        <Text style={styles.score}>Score: {score}</Text>
        <Bird 
          birdBottom = {birdBottom} 
          birdLeft = {birdLeft}
        />
        <Obstacles 
          color={'green'}
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          randomBottom = {obstaclesNegHeight}
          gap = {gap}
          obstaclesLeft = {obstaclesLeft}
        />
        <Obstacles 
          color={'yellow'}
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          randomBottom = {obstaclesNegHeightTwo}
          gap = {gap}
          obstaclesLeft = {obstaclesLeftTwo}
        />
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
  score: {
    fontSize: 32,
    top: 50,
    position: 'absolute',
    zIndex: 1,
    color: 'white'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  } 
});
