// src/components/mealPlanner/MealPicker.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const MealPicker = ({ selectedValue, onValueChange, options }) => (
  <View style={styles.picker}>
    <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
      {options.map((option) => (
        <Picker.Item
          key={option.value}
          label={option.label}
          value={option.value}
        />
      ))}
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  picker: {
    height: 50,
    marginBottom: 20,
    width: "100%",
  },
});

export default MealPicker;
