import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, Animated, Pressable, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import PostRecipeScreen from "./PostRecipeScreen";
import RecipeModal from "../components/sharedRecipe/RecipeModal";
import RecipeIngredients from "../components/sharedRecipe/RecipeIngredients";
import RecipeInstructions from "../components/sharedRecipe/RecipeInstructions";
import RenderRecipeItem from "../components/sharedRecipe/RenderRecipeItem";
import useFetchRecipes from "../hooks/useFetchRecipes";
import useFabAnimation from "../hooks/useFabAnimation";
import useHandleLike from "../hooks/useHandleLike";
import useModalLogic from "../hooks/useModalLogic";
import styles from "../styles/OnlySharedRecipesScreenStyles";

const SharedRecipesScreen = () => {
  const { recipes, userDictionary, fetchRecipes, setRecipes } = useFetchRecipes();
  const { fadeAnim, buttonWidth, textOpacity, textTranslateX, descriptionVisible, fadeIn } = useFabAnimation();
  const { modalVisible, setModalVisible, selectedRecipe, openRecipeModal } = useModalLogic();
  const handleLike = useHandleLike(setRecipes, recipes);
  const [showPostScreen, setShowPostScreen] = useState(false);

  useEffect(() => {
    fadeIn();
  }, [fadeIn]);

  const handleGoBack = useCallback(() => {
    setShowPostScreen(false);
    fetchRecipes();
  }, [fetchRecipes]);

  const renderRecipeItem = ({ item }) => (
    <RenderRecipeItem
      item={item}
      handleLike={handleLike}
      openRecipeModal={openRecipeModal}
      fadeAnim={fadeAnim}
      userDictionary={userDictionary}
    />
  );

  if (showPostScreen) {
    return <PostRecipeScreen onBack={handleGoBack} />;
  }

  return (
    <>
      <Header title="Shared Recipes" />
      <View style={styles.container}>
        <FlatList
          data={recipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id}
        />
        <RecipeModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedRecipe={selectedRecipe}
          renderIngredients={(ingredients) => <RecipeIngredients ingredients={ingredients} />}
          renderInstructions={(instructions) => <RecipeInstructions instructions={instructions} />}
        />
        <Animated.View style={[styles.fab, { width: buttonWidth }]}>
          <Pressable
            style={styles.fabInner}
            onPress={() => setShowPostScreen(true)}
          >
            <MaterialCommunityIcons name="plus" size={24} color="#fff" />
            {descriptionVisible && (
              <Animated.Text
                style={[
                  styles.fabDescription,
                  {
                    opacity: textOpacity,
                    transform: [{ translateX: textTranslateX }],
                  },
                ]}
              >
                Create Recipe
              </Animated.Text>
            )}
          </Pressable>
        </Animated.View>
      </View>
    </>
  );
};

export default SharedRecipesScreen;