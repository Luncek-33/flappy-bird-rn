import React from "react";
import { Text, View } from "react-native";

const Bird = ({ birdBottom,birdLeft }) => {

  const birdWidth =50;
  const birdHeight = 50;
  return(
  <View
    style={{
      position: "absolute",
      backgroundColor: "blue",
      width: birdWidth,
      height: birdWidth,
      left: birdLeft - birdWidth/2,
      bottom: birdBottom = birdBottom - birdHeight/2
    }}
  ></View>
  );};

export default Bird;
