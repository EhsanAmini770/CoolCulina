// src/features/RegisterScreen.js
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
      setEmailError("Please enter a valid email address"); // Custom error message
      setIsLoading(false);
      return;
    }
    

    const emailVerificationResult = await verifyEmail(email);
    if (emailVerificationResult.status !== 'valid') {
      setEmailError(`Email verification failed: ${emailVerificationResult.message}`);
      setIsLoading(false);
      return;
    }

    fetchSignInMethodsForEmail(auth, email)
      .then((methods) => {
        if (methods.length > 0) {
          setEmailError("Email is already registered");
          setIsLoading(false);
        } else {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const userRef = doc(db, "users", userCredential.user.uid);
              setDoc(userRef, {
                fullName,
                dateOfBirth,
                email,
              })
                .then(() => {
                  navigation.replace("Main");
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                  setIsLoading(false);
                });
            })
            .catch((error) => {
              Alert.alert("Registration Error", error.message);
              setIsLoading(false);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking email: ", error);
        setIsLoading(false);
      });
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
        placeholder="Date of Birth (DD/MM/YYYY)"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
        style={commonStyles.input}
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

//logo path C:\\Users\\Pxy\\Desktop\\mobil-uygulama-gelistirme\\Projects\\CoolCulina\\CoolCulina\\assets\\logo.png





// // src/features/RegisterScreen.js

// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   Text,
//   StyleSheet,
//   Image,
//   Alert,
//   Pressable,
// } from "react-native";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { useNavigation } from "@react-navigation/native";
// import { commonStyles } from "../styles/styles";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../utils/firebaseConfig"; // Import Firestore

// export default function RegisterScreen() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const navigation = useNavigation();

//   const handleRegister = () => {
//     const auth = getAuth();
//     if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateOfBirth)) {
//       Alert.alert(
//         "Invalid Date",
//         "Date of birth must be in DD/MM/YYYY format."
//       );
//       return;
//     }

//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Successfully registered, now save additional data to Firestore
//         const userRef = doc(db, "users", userCredential.user.uid); // Correctly reference the users collection and the document ID
//         setDoc(userRef, {
//           fullName,
//           dateOfBirth,
//           email,
//         })
//           .then(() => {
//             navigation.replace("Main"); // Navigate to the main interface
//           })
//           .catch((error) => {
//             console.error("Error writing document: ", error);
//           });
//       })
//       .catch((error) => {
//         alert(error.message);
//       });
//   };

//   return (
//     <View style={[commonStyles.screenContainer, styles.container]}>
//       <Image
//         source={require("../../assets/logo.jpg")}
//         style={commonStyles.logo}
//       />
//       <TextInput
//         placeholder="Full Name"
//         value={fullName}
//         onChangeText={setFullName}
//         style={commonStyles.input}
//       />
//       <TextInput
//         placeholder="Date of Birth (DD/MM/YYYY)"
//         value={dateOfBirth}
//         onChangeText={setDateOfBirth}
//         style={commonStyles.input}
//       />
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         style={commonStyles.input}
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         secureTextEntry
//         onChangeText={setPassword}
//         style={commonStyles.input}
//       />
//       <Pressable onPress={handleRegister} style={commonStyles.button}>
//         <Text style={commonStyles.buttonText}>Register</Text>
//       </Pressable>
//       <Pressable
//         onPress={() => navigation.navigate("Login")}
//         style={[commonStyles.button, styles.loginButton]}
//       >
//         <Text style={commonStyles.buttonText}>I want to login</Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {},
//   loginButton: {
//     marginTop: 10,
//   },
// });

// //logo path C:\\Users\\Pxy\\Desktop\\mobil-uygulama-gelistirme\\Projects\\CoolCulina\\CoolCulina\\assets\\logo.png