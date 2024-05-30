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
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    fullName: false,
    dateOfBirth: false,
    email: false,
    password: false,
  });
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (isLoading) return; // Prevent multiple submits

    setIsLoading(true);

    // Check if all fields are filled
    const errors = {
      fullName: !fullName,
      dateOfBirth: !dateOfBirth,
      email: !email,
      password: !password,
    };

    if (Object.values(errors).some(error => error)) {
      setFieldErrors(errors);
      Alert.alert("Missing Information", "Please fill all the fields.");
      setIsLoading(false);
      return;
    }

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

    if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      // Check if the email is already in use
      const auth = getAuth();
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
      } else if (error.code === 'auth/weak-password') {
        setPasswordError("Password should be at least 6 characters long.");
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
        onChangeText={(text) => {
          setFullName(text);
          setFieldErrors((prev) => ({ ...prev, fullName: false }));
        }}
        style={[commonStyles.input, fieldErrors.fullName ? { borderColor: 'red' } : {}]}
      />
      {fieldErrors.fullName && <Text style={{ color: 'red' }}>Please enter your full name.</Text>}
      <TextInput
        placeholder="Date of Birth (01/01/2000)"
        value={dateOfBirth}
        onChangeText={(text) => {
          formatDateOfBirth(text);
          setFieldErrors((prev) => ({ ...prev, dateOfBirth: false }));
        }}
        style={[commonStyles.input, fieldErrors.dateOfBirth ? { borderColor: 'red' } : {}]}
        keyboardType="numeric"
        maxLength={10}
      />
      {fieldErrors.dateOfBirth && <Text style={{ color: 'red' }}>Please enter your date of birth.</Text>}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError("");
          setFieldErrors((prev) => ({ ...prev, email: false }));
        }}
        style={[commonStyles.input, fieldErrors.email ? { borderColor: 'red' } : {}, emailError ? { borderColor: 'red' } : {}]}
      />
      {fieldErrors.email && <Text style={{ color: 'red' }}>Please enter your email.</Text>}
      {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={(text) => {
          setPassword(text);
          setPasswordError("");
          setFieldErrors((prev) => ({ ...prev, password: false }));
        }}
        style={[commonStyles.input, fieldErrors.password ? { borderColor: 'red' } : {}]}
      />
      {fieldErrors.password && <Text style={{ color: 'red' }}>Please enter your password.</Text>}
      {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}
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
