// src/components/category/CategoryBar.js
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { homeScreenStyles } from '../../styles/homeScreenStyles';

const CategoryBar = ({ onSelectCategory, categories }) => (
  <View style={homeScreenStyles.categoryBar}>
    {categories.map((category, index) => (
      <View key={index} style={homeScreenStyles.buttonStyle}>
        <Pressable
          style={homeScreenStyles.categoryButton}
          onPress={() => onSelectCategory(category)}
        >
          <Text style={homeScreenStyles.buttonText}>{category}</Text>
        </Pressable>
      </View>
    ))}
  </View>
);

export default CategoryBar;
