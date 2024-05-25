// src/features/RecipeFinderScreen.js
import React, { useState } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RecipeCard from "../../components/RecipeCard";
import RecipeService from "../../services/RecipeService";
import { cameraAndRecipeStyles } from "../../styles/cameraAndRecipeStyles";
import Header from "../../components/Header";

export default function RecipeFinderScreen() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigation();

  const findRecipe = async () => {
    const data = await RecipeService.findRecipesByIngredients(ingredients);
    if (data && Array.isArray(data)) {
      setRecipes(data);
    } else {
      console.error("Unexpected API response format");
    }
  };

  const handlePressRecipe = async (recipe) => {
    const detailedRecipe = await RecipeService.getRecipeDetails(recipe.id);
    if (detailedRecipe) {
      navigation.navigate("RecipeDetail", {
        detailedRecipe,
        allIngredients: detailedRecipe.extendedIngredients,
      });
    }
  };

  const renderItem = ({ item }) => (
    <RecipeCard recipe={item} onPress={() => handlePressRecipe(item)} />
  );

  return (
    <>
      <Header title="Find a recipe" />
      <View style={cameraAndRecipeStyles.recipeContainer}>
        <TextInput
          placeholder="Enter ingredients"
          value={ingredients}
          onChangeText={setIngredients}
          style={cameraAndRecipeStyles.input}
        />
        <Pressable style={cameraAndRecipeStyles.button} onPress={findRecipe}>
          <Text style={cameraAndRecipeStyles.buttonText}>Find</Text>
        </Pressable>
        <Pressable
          style={[
            cameraAndRecipeStyles.button,
            cameraAndRecipeStyles.secondaryButton,
          ]}
          onPress={() => navigation.navigate("CameraScreen")}
        >
          <Text
            style={[
              cameraAndRecipeStyles.buttonText,
              cameraAndRecipeStyles.secondaryButtonText,
            ]}
          >
            Take a Picture
          </Text>
        </Pressable>
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={cameraAndRecipeStyles.list}
        />
      </View>
    </>
  );
}
