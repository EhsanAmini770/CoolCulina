import React from "react";
import { Text, StyleSheet } from "react-native";

const RecipeInstructions = ({ instructions }) => {
  return instructions.split(".").map((instruction, index) => (
    <Text key={index} style={styles.instructionText}>
      {instruction.trim()}
      {index !== instructions.split(".").length - 1 && <Text>{". "}</Text>}
    </Text>
  ));
};

const styles = StyleSheet.create({
  instructionText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "left",
  },
});

export default RecipeInstructions;
