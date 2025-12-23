import React from "react";
import { Text, View, Image } from "react-native";

const Bird = ({ birdBottom,birdLeft, color }) => {

  const birdWidth =50;
  const birdHeight = 50;
  return(
  <Image
    style={{
      position: "absolute",
      backgroundColor: color,
      width: birdWidth,
      height: birdWidth,
      left: birdLeft - birdWidth/2,
      bottom: birdBottom = birdBottom - birdHeight/2,
      
    }}
    source={require("../../assets/bird1.png")}
    resizeMode="stretch"
  ></Image>
  );};

export default Bird;
