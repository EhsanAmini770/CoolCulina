// src/components/category/CategoryView.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, ActivityIndicator, Pressable } from 'react-native';
import HomeRecipeCard from '../HomeRecipeCard';
import { useNavigation } from '@react-navigation/native';
import RecipeService from '../../services/RecipeService';
import { homeScreenStyles, colors } from '../../styles/homeScreenStyles';

const CategoryView = ({ category }) => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigation = useNavigation();

  const fetchRecipes = useCallback(
    async (pageNum = 1) => {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);
      const fetchedRecipes = await RecipeService.fetchRandomRecipes(category, pageNum);
      if (fetchedRecipes) {
        setRecipes((prevRecipes) =>
          pageNum === 1 ? fetchedRecipes : [...prevRecipes, ...fetchedRecipes]
        );
      }
      setLoading(false);
      setLoadingMore(false);
    },
    [category]
  );

  useEffect(() => {
    fetchRecipes(1);
  }, [category, fetchRecipes]);

  const handleLoadMore = () => {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      fetchRecipes(newPage);
      return newPage;
    });
  };

  const renderFooter = () => {
    if (loadingMore) {
      return <ActivityIndicator size="large" color={colors.primary} />;
    }

    if (recipes.length > 0) {
      return (
        <Pressable style={homeScreenStyles.loadMoreButton} onPress={handleLoadMore}>
          <Text style={homeScreenStyles.loadMoreText}>Load More</Text>
        </Pressable>
      );
    }

    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={recipes}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={homeScreenStyles.recipeCardContainer}>
              <HomeRecipeCard
                recipe={item}
                onPress={() =>
                  navigation.navigate('RecipeDetail', { detailedRecipe: item })
                }
              />
            </View>
          )}
          contentContainerStyle={homeScreenStyles.flatListContainer}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
};

export default CategoryView;
