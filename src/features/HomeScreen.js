// src/features/HomeScreen.js
import React, { useState } from 'react';
import { View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import CategoryBar from '../components/category/CategoryBar';
import CategoryView from '../components/category/CategoryView';
import FABButton from '../components/FABButton';
import useScrollDirection from '../hooks/useScrollDirection';
import { homeScreenStyles } from '../styles/homeScreenStyles';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('breakfast');
  const categories = ['breakfast', 'lunch', 'dinner'];

  const { translateY, handleScroll } = useScrollDirection();

  return (
    <>
      <Header title="Today's Meals" />
      <View style={homeScreenStyles.container}>
        <Animated.View
          style={[homeScreenStyles.animatedCategoryBar, { transform: [{ translateY }] }]}
        >
          <CategoryBar
            categories={categories}
            onSelectCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </Animated.View>

        <Animated.ScrollView
          contentContainerStyle={{ paddingTop: 50 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <CategoryView category={selectedCategory} />
        </Animated.ScrollView>

        <FABButton navigation={navigation} />
      </View>
    </>
  );
}
