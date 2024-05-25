// src/components/BackButtonHandler.js
import React, { useEffect } from 'react';
import { Pressable, BackHandler } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BackButtonHandler = ({color = "white"}) => {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 1,
      }}
    >
      <FontAwesome5 name="arrow-left" size={24} color={color} />
    </Pressable>
  );
};

export default BackButtonHandler;
