// src/features/ImageResultScreen.js
import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import Utility from "../utils/Utility";

const ImageResultScreen = ({ route }) => {
  const { imageData, imageUri } = route.params;

  if (
    !imageData ||
    !imageData.nutrition ||
    !imageData.category ||
    !imageData.recipes
  ) {
    return (
      <View style={styles.container}>
        <Text>No valid data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Nutritional Analysis</Text>
      <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      <Text style={styles.title}>Category: {imageData.category.name}</Text>
      <Text style={styles.info}>
        Calories: {Utility.formatNutrition(imageData.nutrition.calories)}
      </Text>
      {/* Additional nutritional info */}
      {imageData.recipes.map((recipe, index) => (
        <Text
          key={index}
          onPress={() => Utility.openURL(recipe.url)}
          style={styles.recipeTitle}
        >
          {recipe.title}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    marginTop: 5,
  },
  recipeTitle: {
    fontSize: 16,
    color: "blue",
    marginTop: 5,
    marginBottom: 5,
  },
  imagePreview: {
    width: 300,
    height: 300,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ImageResultScreen;
