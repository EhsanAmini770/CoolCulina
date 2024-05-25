
import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

const HomeRecipeCard = ({ recipe, onPress }) => {
  const formatTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return title;
  };

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: recipe.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{formatTitle(recipe.title)}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180, // Adjust width as needed
    height: 250, // Adjust height as needed
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: "100%",
    height: "75%", // 75% of the card height for the image
  },
  textContainer: {
    height: "25%", // 25% of the card height for the text
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});

export default HomeRecipeCard;
