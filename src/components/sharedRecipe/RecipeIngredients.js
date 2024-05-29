import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RecipeIngredients = ({ ingredients }) => {
  return ingredients.split("\n").map((ingredient, index) => (
    <View key={index} style={styles.ingredientItem}>
      <Text style={styles.bulletPoint}>•</Text>
      <Text style={styles.ingredientText}>{ingredient.trim()}</Text>
    </View>
  ));
};

const styles = StyleSheet.create({
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  bulletPoint: {
    marginRight: 10,
    fontSize: 18,
  },
  ingredientText: {
    fontSize: 16,
  },
});

export default RecipeIngredients;
