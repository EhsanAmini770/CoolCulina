// src/features/mealPlanScreens/MealPlanScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MealPicker from "../../components/mealPlanner/MealPicker";
import CaloriesInput from "../../components/mealPlanner/CaloriesInput";
import MealPlanButton from "../../components/mealPlanner/MealPlanButton";
import RecipeService from "../../services/RecipeService";
import { useNavigation } from "@react-navigation/native";
import BackButtonHandler from "../../components/BackButtonHandler";

const dietOptions = [
  { label: "Gluten Free", value: "glutenFree" },
  { label: "Ketogenic", value: "ketogenic" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Pescetarian", value: "pescetarian" },
  { label: "Paleo", value: "paleo" },
  { label: "Primal", value: "primal" },
  { label: "Low FODMAP", value: "lowFodmap" },
  { label: "Whole30", value: "whole30" },
];

export default function MealPlanScreen() {
  const [diet, setDiet] = useState("");
  const [calories, setCalories] = useState("");
  const [timeFrame, setTimeFrame] = useState("day");
  const [mealPlan, setMealPlan] = useState(null);
  const navigation = useNavigation();

  const handleFetchMealPlan = async () => {
    try {
      const plan = await RecipeService.fetchMealPlan(diet, calories, timeFrame);
      setMealPlan(plan);
      navigation.navigate('MealResultsScreen', { mealPlan: plan, timeFrame });
    } catch (error) {
      console.error("Failed to fetch meal plan:", error);
      alert("Failed to fetch meal plan");
    }
  };

  return (
    <View style={styles.container}>
      <BackButtonHandler color="black" />
      <View style={styles.cardContainer}>
        <Text style={styles.header}>Create Your Meal Plan</Text>
        <MealPicker
          selectedValue={diet}
          onValueChange={setDiet}
          options={[{ label: "Choose a diet", value: "" }, ...dietOptions]}
        />
        <MealPicker
          selectedValue={timeFrame}
          onValueChange={setTimeFrame}
          options={[
            { label: "Day", value: "day" },
            { label: "Week", value: "week" },
          ]}
        />
        <CaloriesInput value={calories} onChangeText={setCalories} />
        <MealPlanButton onPress={handleFetchMealPlan} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
  },
  cardContainer: {
    alignItems: "center",
    width: "100%",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
  },
});
