// src/features/CameraScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { cameraAndRecipeStyles } from '../../styles/cameraAndRecipeStyles';
import RecipeService from '../../services/RecipeService';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: false, skipProcessing: false };
      const data = await cameraRef.current.takePictureAsync(options);
      const formData = new FormData();
      formData.append('file', {
        uri: data.uri,
        type: 'image/jpeg',
        name: `upload_${new Date().getTime()}.jpg`,
      });

      const imageData = await RecipeService.analyzeImage(formData);
      if (imageData) {
        navigation.navigate('ImageResultScreen', {
          imageData: imageData,
          imageUri: data.uri,
        });
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={cameraAndRecipeStyles.container}>
      <View style={cameraAndRecipeStyles.cameraContainer}>
        <Camera
          style={cameraAndRecipeStyles.camera}
          ref={cameraRef}
          type={Camera.Constants.Type.back}
          ratio="3:4"
        />
      </View>
      <Pressable style={cameraAndRecipeStyles.button} onPress={handleTakePicture}>
        <Text style={cameraAndRecipeStyles.buttonText}>Take Picture</Text>
      </Pressable>
    </View>
  );
};

export default CameraScreen;
