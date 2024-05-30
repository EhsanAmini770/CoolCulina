// src/features/LoginScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { commonStyles } from "../styles/styles"; // Ensure this path is correct
import Lottie from "react-lottie"; // Import Lottie from react-lottie
import cookingLogin from "../../assets/animations/cookingLogin.json"; // Import the animation

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    console.log(auth);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Main"); // Navigate to the main interface
      } else {
        setLoading(false); // Only allow login attempt if no user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, [navigation]);

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.replace("Main");
      })
      .catch((error) => alert(error.message));
  };

  const defaultOptions = { //lottie stuff animation stuff nobody cares about  :D
    loop: true,
    autoplay: true,
    animationData: cookingLogin,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (loading) {
    return (
      <View
        style={[
          commonStyles.screenContainer,
          styles.container,
          styles.centered,
        ]}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={[commonStyles.screenContainer, styles.container]}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Lottie options={defaultOptions} height={200} width={200} />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={commonStyles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={commonStyles.input}
      />
      <Pressable onPress={handleLogin} style={commonStyles.button}>
        <Text style={commonStyles.buttonText}>Login</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Register")}
        style={commonStyles.button}
      >
        <Text style={commonStyles.buttonText}>Don't have an account?</Text>
      </Pressable>
    </View>
  );
}

// Local styles
const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: "center", // Center the logo horizontally
    marginTop: 20, // Add some margin to the top
  },
});
