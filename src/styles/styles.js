// src/styles/styles.js

import { StyleSheet } from "react-native";

// Define common values as constants
export const colors = {
  darkGreen: "#022e24",
  softWhite: "#ffffff",
  lightBlue: "#1f41bb",
  red: "#ff0000",
};

export const commonStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.softWhite, // Soft white background
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  input: {
    width: "100%",
    margin: 12,
    borderWidth: 1,
    borderColor: colors.darkGreen, // Dark green for input border
    padding: 10,
    borderRadius: 25,
    backgroundColor: colors.softWhite, // Soft white for input background
  },
  button: {
    backgroundColor: colors.darkGreen, // Dark green for button background
    width: "60%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: colors.lightBlue, // Light blue for button border
  },
  categoryButton: {
    backgroundColor: colors.darkGreen, // Dark green for button background
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 50,
  },
  buttonText: {
    color: colors.softWhite, // Soft white for button text for contrast
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
});
