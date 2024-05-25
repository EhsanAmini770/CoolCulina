// src/components/mealPlanner/CaloriesInput.js
import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { commonStyles } from "../../styles/styles";

const CaloriesInput = ({ value, onChangeText }) => (
  <TextInput
    style={[commonStyles.input, styles.input]}
    placeholder="Target Calories (e.g., 2000)"
    keyboardType="numeric"
    value={value}
    onChangeText={onChangeText}
  />
);

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
});

export default CaloriesInput;
