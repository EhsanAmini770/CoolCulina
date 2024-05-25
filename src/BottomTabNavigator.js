import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './features/HomeScreen';
import RecipeFinderScreen from './features/recipeFinderScreens/RecipeFinderScreen'; 
import SharedRecipesScreen from './features/SharedRecipesScreen'; 
import AskAiScreen from './features/AskAiScreen';
import { colors } from './styles/styles';
import ProfileHeaderButton from './components/ProfileHeaderButton';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./utils/firebaseConfig";
import { useEffect, useState } from "react";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {
  const [userPhotoURL, setUserPhotoURL] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        getDoc(userRef).then((docSnap) => {
          if (docSnap.exists()) {
            setUserPhotoURL(docSnap.data().photoURL);
          }
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => <ProfileHeaderButton navigation={navigation} userPhotoURL={userPhotoURL} />,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "RecipeFinder") {
            iconName = focused ? "food-off" : "food-off-outline";
          } else if (route.name === "SharedRecipes") {
            iconName = focused ? "account-group" : "account-group-outline";
          } else if (route.name === "Ask AI") {
            iconName = focused ? "robot" : "robot-outline";
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.darkGreen,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="RecipeFinder" component={RecipeFinderScreen} options={{ headerShown: false }} />
      <Tab.Screen name="SharedRecipes" component={SharedRecipesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Ask AI" component={AskAiScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
