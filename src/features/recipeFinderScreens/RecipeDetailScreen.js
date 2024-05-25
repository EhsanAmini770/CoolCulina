// src/features/RecipeDetailScreen.js
import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import BackButtonHandler from '../../components/BackButtonHandler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cameraAndRecipeStyles } from '../../styles/cameraAndRecipeStyles';

const RecipeDetailScreen = ({ route }) => {
  const { detailedRecipe } = route.params;

  if (!detailedRecipe) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ backgroundColor: '#022e24', flex: 1 }}>
      <BackButtonHandler />
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          marginTop: 280,
          borderTopLeftRadius: 56,
          borderTopRightRadius: 56,
          alignItems: 'center',
        }}
      >
        <Text style={cameraAndRecipeStyles.title}>{detailedRecipe.title}</Text>
        <ScrollView style={cameraAndRecipeStyles.detailsContainer}>
          <View style={cameraAndRecipeStyles.section}>
            <Text style={cameraAndRecipeStyles.sectionTitle}>Ingredients:</Text>
            {detailedRecipe.extendedIngredients.map((ingredient, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="arrow-right" size={16} />
                <Text style={cameraAndRecipeStyles.ingredient}>{ingredient.original}</Text>
              </View>
            ))}
          </View>
          <View style={cameraAndRecipeStyles.section}>
            <Text style={cameraAndRecipeStyles.sectionTitle}>Instructions:</Text>
            {detailedRecipe.analyzedInstructions[0]?.steps.map((step, index) => (
              <Text key={index} style={cameraAndRecipeStyles.instruction}>
                {step.number}. {step.step}
              </Text>
            ))}
          </View>
        </ScrollView>
        <Image
          source={{ uri: detailedRecipe.image }}
          style={{
            height: 270,
            width: 270,
            borderRadius: 150,
            alignSelf: 'center',
            marginTop: 60,
            position: 'absolute',
            top: -220,
          }}
        />
      </View>
    </View>
  );
};

export default RecipeDetailScreen;
