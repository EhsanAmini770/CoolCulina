// src/components/FABButton.js
import React, { useRef, useState, useEffect } from "react";
import { Animated, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { homeScreenStyles } from "../styles/homeScreenStyles";

const FABButton = ({ navigation }) => {
  const buttonWidth = useRef(new Animated.Value(56)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateX = useRef(new Animated.Value(-20)).current;
  const [descriptionVisible, setDescriptionVisible] = useState(true);

  useEffect(() => {
    Animated.timing(buttonWidth, {
      toValue: 200,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(textOpacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(textTranslateX, {
              toValue: -20,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => {
            Animated.timing(buttonWidth, {
              toValue: 56,
              duration: 500,
              useNativeDriver: false,
            }).start(() => setDescriptionVisible(false));
          });
        }, 3000);
      });
    });
  }, []);

  return (
    <Animated.View style={[homeScreenStyles.fab, { width: buttonWidth }]}>
      <Pressable
        style={homeScreenStyles.fabInner}
        onPress={() => navigation.navigate("mealPlanScreen")}
      >
        <MaterialCommunityIcons
          name="plus"
          size={24}
          color="white"
          style={homeScreenStyles.fabIcon}
        />
        {descriptionVisible && (
          <Animated.Text
            style={[
              homeScreenStyles.fabDescription,
              {
                opacity: textOpacity,
                transform: [{ translateX: textTranslateX }],
              },
            ]}
          >
            Create Meal Plan
          </Animated.Text>
        )}
      </Pressable>
    </Animated.View>
  );
};

export default FABButton;
