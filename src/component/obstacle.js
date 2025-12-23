import React from "react";
import { Text, View, Image } from "react-native";

const Obstacles = ({
  color,
  obstacleWidth,
  obstacleHeight,
  randomBottom,
  gap,
  obstaclesLeft,
}) => (
  <>
    <Image
      style={{
        position: "absolute",
        backgroundColor: color,
        width: obstacleWidth,
        height: 500,
        left: obstaclesLeft,
        bottom: randomBottom + obstacleHeight + gap,
      }}
    ></Image>

    <Image
      style={{
        position: "absolute",
        backgroundColor: color,
        width: obstacleWidth,
        height: obstacleHeight,
        left: obstaclesLeft,
        bottom: randomBottom,
      }}
      source={require("../../assets/pipe.png")}
      resizeMode="cover"
    ></Image>
  </>
);

export default Obstacles;
