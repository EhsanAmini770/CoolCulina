
// src/services/RecipeService.js
import axios from "axios";
import { API_KEY } from "../utils/spoonacularConfig";

class RecipeService {
  static async fetchRandomRecipes(category) {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/random?number=10&tags=${category}&apiKey=${API_KEY}`
      );
      return response.data.recipes;
    } catch (error) {
      console.error("Error fetching random recipes:", error);
    }
  }

  static async analyzeImage(formData) {
    try {
      const response = await axios.post(
        `https://api.spoonacular.com/food/images/analyze?apiKey=${API_KEY}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
    }
  }

  static async findRecipesByIngredients(ingredients) {
    try {
      const response = await axios.post(
        "http://localhost:5000/analyze-ingredients",
        { ingredients }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching recipes by ingredients:", error);
    }
  }

  static async getRecipeDetails(recipeId) {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  }

  static async fetchMealPlan(diet, targetCalories, timeFrame) {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/mealplanner/generate?apiKey=${API_KEY}&diet=${diet}&targetCalories=${targetCalories}&timeFrame=${timeFrame}`
      );
      // console.log("Meal plan response:", response.data);
      console.log("url", `https://api.spoonacular.com/mealplanner/generate?apiKey=${API_KEY}&diet=${diet}&targetCalories=${targetCalories}&timeFrame=${timeFrame}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching meal plan:", error);
    }
  }
}

export default RecipeService;
