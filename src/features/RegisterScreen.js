import React, { useState } from "react";
import {
  View, TextInput, Text, StyleSheet, Image, Alert, Pressable, ActivityIndicator
} from "react-native";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { commonStyles } from "../styles/styles";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import Lottie from "react-lottie";
import cookingRegister from "../../assets/animations/cookingRegister.json";
import { validateEmailFormat, verifyEmail } from "../utils/emailValidation";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (isLoading) return; // Prevent multiple submits

    setIsLoading(true);
    const auth = getAuth();
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateOfBirth)) {
      Alert.alert("Invalid Date", "Date of birth must be in DD/MM/YYYY format.");
      setIsLoading(false);
      return;
    }

    if (!validateEmailFormat(email)) {
      setEmailError("Error. Please enter a valid email");
      setIsLoading(false);
      return;
    }

    try {
      // Check if the email is already in use
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setEmailError("Email already in use. Try logging in.");
        setIsLoading(false);
        return;
      }

      // Verify email existence using the external API
      const emailVerificationResult = await verifyEmail(email);
      if (emailVerificationResult.status !== 'valid') {
        setEmailError(emailVerificationResult.message);
        setIsLoading(false);
        return;
      }

      // If email is valid and not already in use, proceed with registration
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        fullName,
        dateOfBirth,
        email,
      });
      navigation.replace("Main");

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setEmailError("Email already in use. Try logging in.");
      } else {
        console.error("Error during registration: ", error);
        Alert.alert("Registration Error", error.message);
      }
      setIsLoading(false);
    }
  };

  const formatDateOfBirth = (text) => {
    // Remove non-numeric characters
    const cleaned = text.replace(/\D/g, '');

    // Format the date as DD/MM/YYYY
    const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);
    if (match) {
      const formatted = [match[1], match[2], match[3]].filter(Boolean).join('/');
      setDateOfBirth(formatted);
    } else {
      setDateOfBirth(text);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: cookingRegister,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <View style={[commonStyles.screenContainer, styles.container]}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Lottie options={defaultOptions} height={200} width={200} />
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={commonStyles.input}
      />
      <TextInput
        placeholder="Date of Birth (01/01/2000)"
        value={dateOfBirth}
        onChangeText={formatDateOfBirth}
        style={commonStyles.input}
        keyboardType="numeric"
        maxLength={10}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError("");
        }}
        style={[commonStyles.input, emailError ? { borderColor: 'red' } : {}]}
      />
      {emailError && <Text style={{ color: 'red' }}>{emailError}</Text>}
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={commonStyles.input}
      />
      <Pressable onPress={handleRegister} style={commonStyles.button} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={commonStyles.buttonText}>Register</Text>
        )}
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Login")}
        style={[commonStyles.button, styles.loginButton]}
      >
        <Text style={commonStyles.buttonText}>I want to login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 20
  },
  loginButton: {
    marginTop: 10,
  },
});
