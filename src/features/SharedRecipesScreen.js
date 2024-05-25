import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, FlatList, Animated, Pressable, StyleSheet, Text } from "react-native";
import { collection, getDocs, doc, runTransaction } from "firebase/firestore";
import { db, auth } from "../utils/firebaseConfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import PostRecipeScreen from "./PostRecipeScreen";
import RecipeListItem from "../components/sharedRecipe/RecipeListItem";
import RecipeModal from "../components/sharedRecipe/RecipeModal";
import { colors } from "../styles/styles";

const SharedRecipesScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [userDictionary, setUserDictionary] = useState({});
  const [showPostScreen, setShowPostScreen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const buttonWidth = useRef(new Animated.Value(56)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateX = useRef(new Animated.Value(-20)).current;
  const [descriptionVisible, setDescriptionVisible] = useState(true);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    Animated.timing(buttonWidth, {
      toValue: 200,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(textOpacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(textTranslateX, {
              toValue: -20,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => {
            Animated.timing(buttonWidth, {
              toValue: 56,
              duration: 500,
              useNativeDriver: false,
            }).start(() => setDescriptionVisible(false));
          });
        }, 3000);
      });
    });
  }, []);

  const fetchUsers = useCallback(async () => {
    const userSnapshot = await getDocs(collection(db, "users"));
    const usersData = {};
    userSnapshot.forEach((doc) => {
      usersData[doc.id] = { id: doc.id, ...doc.data() };
    });
    setUserDictionary(usersData);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const fetchRecipes = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "recipes"));
    const recipeData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRecipes(recipeData);
    fadeIn();
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleGoBack = useCallback(() => {
    setShowPostScreen(false);
    fetchRecipes();
  }, [fetchRecipes]);

  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const handleLike = async (recipeId) => {
    const recipeRef = doc(db, "recipes", recipeId);
    const user = auth.currentUser;
    const userId = user.uid;

    await runTransaction(db, async (transaction) => {
      const recipeDoc = await transaction.get(recipeRef);
      if (!recipeDoc.exists()) {
        throw "Document does not exist!";
      }
      let newLikes = recipeDoc.data().likes || 0;
      let likedBy = recipeDoc.data().likedBy || [];

      if (likedBy.includes(userId)) {
        newLikes--;
        likedBy = likedBy.filter((id) => id !== userId);
      } else {
        newLikes++;
        likedBy.push(userId);
      }

      transaction.update(recipeRef, { likes: newLikes, likedBy: likedBy });
    });

    setRecipes(
      recipes.map((recipe) => {
        if (recipe.id === recipeId) {
          const liked = recipe.likedBy?.includes(userId);
          return {
            ...recipe,
            likes: liked ? recipe.likes - 1 : recipe.likes + 1,
            likedBy: liked
              ? recipe.likedBy.filter((id) => id !== userId)
              : [...(recipe.likedBy || []), userId],
          };
        }
        return recipe;
      })
    );
  };

  const renderRecipeItem = ({ item }) => (
    <RecipeListItem
      item={item}
      handleLike={handleLike}
      openRecipeModal={openRecipeModal}
      fadeAnim={fadeAnim}
      userDictionary={userDictionary}
    />
  );

  const renderIngredients = (ingredients) => {
    return ingredients.split("\n").map((ingredient, index) => (
      <View key={index} style={styles.ingredientItem}>
        <Text style={styles.bulletPoint}>•</Text>
        <Text style={styles.ingredientText}>{ingredient.trim()}</Text>
      </View>
    ));
  };

  const renderInstructions = (instructions) => {
    return instructions.split(".").map((instruction, index) => (
      <Text key={index} style={styles.instructionText}>
        {instruction.trim()}
        {index !== instructions.split(".").length - 1 && <Text>{". "}</Text>}
      </Text>
    ));
  };

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
          renderIngredients={renderIngredients}
          renderInstructions={renderInstructions}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: colors.darkGreen,
    borderRadius: 28,
    elevation: 8, // Only for Android for shadow
  },
  fabInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingHorizontal: 16,
  },
  fabIcon: {
    fontSize: 24,
    color: "white",
  },
  fabDescription: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  bulletPoint: {
    marginRight: 10,
    fontSize: 18,
  },
  ingredientText: {
    fontSize: 16,
  },
  instructionText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "left",
  },
});

export default SharedRecipesScreen;
