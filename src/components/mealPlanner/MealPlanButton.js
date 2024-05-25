// src/components/mealPlanner/MealPlanButton.js
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { commonStyles } from "../../styles/styles";

const MealPlanButton = ({ onPress }) => (
  <Pressable style={[commonStyles.button, styles.button]} onPress={onPress}>
    <Text style={commonStyles.buttonText}>Get Meal Plan</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    alignContent: "center",
    alignSelf: "center",
  },
});

export default MealPlanButton;
