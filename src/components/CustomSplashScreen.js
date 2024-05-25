import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Image } from "react-native";

const CustomSplashScreen = ({ onFinished }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity for fade-out animation
  const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale for heartbeat animation

  useEffect(() => {
    // Heartbeat animation
    const heartbeat = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.25,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 3 }
    );

    heartbeat.start();

    // Wait for 1.5 seconds and fade out
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onFinished(); // Call the onFinished callback after animation completes
      });
    }, 1500);
  }, [fadeAnim, onFinished, scaleAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.Image
        source={require("../../assets/logo.png")}
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100, // Adjust the size of the logo here
  },
});

export default CustomSplashScreen;
