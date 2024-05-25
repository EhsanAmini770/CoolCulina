// styles/cameraAndRecipeStyles.js
import { StyleSheet } from "react-native";

const colors = {
  background: "#f5f5f5",
  darkGreen: "#022e24",
  lightBackground: "#fff",
  border: "#ddd",
  text: "#",
};

const cameraAndRecipeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Adds contrast to the layout
  },
  cameraContainer: {
    width: 300, // Adjust width as needed
    height: 400, // Height adjusted to maintain 3:4 aspect ratio
    overflow: "hidden",
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  recipeContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  input: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.lightBackground,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.darkGreen,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: colors.lightBackground,
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: colors.lightBackground,
    borderWidth: 1,
    borderColor: colors.darkGreen,
  },
  secondaryButtonText: {
    color: colors.darkGreen,
  },
  list: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
    paddingTop: 120,
    textAlign: "center",
  },
  detailsContainer: {
    width: "90%",
    marginTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 5,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export { colors, cameraAndRecipeStyles };
