// src/components/mealPlanner/mealHelpers.js
import React from "react";
import { Text, StyleSheet, Linking, View } from "react-native";
import RecipeService from "../../services/RecipeService";

export const fetchMealsWithDetails = (meals) => {
  return Promise.all(
    meals.map((meal) =>
      RecipeService.getRecipeDetails(meal.id).then((details) => ({
        ...meal,
        image: details.image,
      }))
    )
  );
};

export const renderMealItem = ({ item, index }) => {
  let mealType = index === 0 ? "Breakfast" : index === 1 ? "Lunch" : "Dinner";
  return (
    <View style={styles.card}>
      <Text
        style={styles.cardTitle}
        numberOfLines={2}
      >{`${mealType}: ${item.title}`}</Text>
      <Text>Prep time: {item.readyInMinutes} minutes</Text>
      <Text
        style={styles.mealLink}
        onPress={() => Linking.openURL(item.sourceUrl)}
      >
        View Recipe
      </Text>
    </View>
  );
};

export const renderSectionHeader = ({ section: { title } }) => (
  <Text style={styles.mealsHeader}>{title}</Text>
);

const styles = StyleSheet.create({
  mealItem: {
    marginBottom: 10,
  },
  mealTitle: {
    fontSize: 16,
  },
  mealsHeader: {
    fontSize: 20,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  mealLink: {
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
});
