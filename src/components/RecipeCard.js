//src/components/RecipeCard.js
import React from "react";
import { Text, StyleSheet, Image, Pressable } from "react-native";
import { commonStyles } from "../styles/styles";
export default function RecipeCard({ recipe, onPress }) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(recipe)}>
      <Image source={{ uri: recipe.image }} style={styles.image} resizeMode="cover" />
      <Text style={commonStyles.title}>{recipe.title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
});