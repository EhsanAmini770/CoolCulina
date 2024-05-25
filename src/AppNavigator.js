import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./features/LoginScreen";
import RegisterScreen from "./features/RegisterScreen";
import ProfileScreen from "./features/ProfileScreen";
import RecipeDetailScreen from "./features/recipeFinderScreens/RecipeDetailScreen";
import ImageResultScreen from "./features/ImageResultScreen";
import CameraScreen from "./features/recipeFinderScreens/CameraScreen";
import MealPlanScreen from "./features/mealPlanScreens/MealPlanScreen";
import MealResultsScreen from "./features/mealPlanScreens/MealResultsScreen";
import EditProfileScreen from "./features/EditProfileScreen";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecipeDetail"
          component={RecipeDetailScreen}
          options={{ animation: "slide_from_right", headerShown: false }}
        />
        <Stack.Screen name="ImageResultScreen" component={ImageResultScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen
          name="mealPlanScreen"
          component={MealPlanScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MealResultsScreen"
          component={MealResultsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
