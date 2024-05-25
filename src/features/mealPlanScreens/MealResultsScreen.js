// src/features/mealPlanScreens/MealResultsScreen.js
import React from "react";
import { Text, SectionList, StyleSheet, View } from "react-native";
import MealDisplay from "../../components/mealPlanner/MealDisplay"; // Adjust path as necessary
import BackButtonHandler from "../../components/BackButtonHandler";

export default function MealResultsScreen({ route }) {
  const { mealPlan, timeFrame } = route.params;

  const prepareSections = (mealData) => {
    if (!mealData.week) return [];
    return Object.entries(mealData.week).map(([day, dayInfo]) => ({
      key: day,
      title: `${day.charAt(0).toUpperCase() + day.slice(1)}'s Meals`,
      data: dayInfo.meals,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Meal Plan</Text>
        <BackButtonHandler color="black" />
      </View>

      <SectionList
        sections={[{ data: [mealPlan] }]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <MealDisplay
            mealPlan={item}
            timeFrame={timeFrame}
            prepareSections={prepareSections}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingTop: 50,

    backgroundColor: "#fff",
    alignItems: "center",
    zIndex: 1,  // Keep header on top
  },
  
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
