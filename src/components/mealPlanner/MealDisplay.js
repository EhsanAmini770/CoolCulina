// src/components/mealPlanner/MealDisplay.js
import React, { useEffect, useState } from "react";
import { View, SectionList, Text, StyleSheet, Image } from "react-native";
import { renderMealItem, fetchMealsWithDetails } from "./mealHelpers";

const MealDisplay = ({ mealPlan, timeFrame, prepareSections }) => {
  const [mealsWithImages, setMealsWithImages] = useState([]);

  useEffect(() => {
    if (mealPlan && mealPlan.meals) {
      fetchMealsWithDetails(mealPlan.meals).then((updatedMeals) => {
        setMealsWithImages(updatedMeals);
      });
    }
  }, [mealPlan]);

  if (!mealPlan) {
    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.noDataText}>No meal plan available.</Text>
      </View>
    );
  }

  const sectionData = prepareSections(mealPlan);

  return (
    <View style={styles.resultsContainer}>
      {timeFrame === "day" ? (
        mealsWithImages.length > 0 ? (
          mealsWithImages.map((meal, index) => (
            <View style={styles.mealCard} key={meal.id}>
              <Image source={{ uri: meal.image }} style={styles.mealImage} />
              {renderMealItem({ item: meal, index })}
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>
            No meals available for this day.
          </Text>
        )
      ) : (
        <SectionList
          key={timeFrame}
          sections={sectionData}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item, index }) => (
            <View style={styles.mealCard}>
              {/* there is no image url */}
              {/* <Image source={{ uri: item.image }} style={styles.mealImage} /> */}
              {renderMealItem({ item, index })}
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          style={styles.sectionList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  mealCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
    padding: 10,
  },
  mealImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 18,
    color: "#6c757d",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#e9ecef",
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    color: "#495057",
  },
  sectionList: {
    marginTop: 10,
  },
});

export default MealDisplay;
