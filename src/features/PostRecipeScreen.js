import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import Lottie from 'react-lottie';  // Import Lottie from react-lottie
import { launchImageLibrary } from "react-native-image-picker";
import { db, auth } from "../utils/firebaseConfig";
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { commonStyles } from "../styles/styles";
import { FontAwesome5 } from "@expo/vector-icons";
import animationData from "../../assets/animations/uploading.json";  // Import your animation JSON file

export default function PostRecipeScreen({ onBack }) {
  const [imageUri, setImageUri] = useState(null);
  const [caption, setCaption] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = () => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setImageUri(source.uri);
      }
    });
  };

  const postNewRecipe = async () => {
    if (!imageUri || !caption || !ingredients || !instructions) {
      alert("Please fill all fields.");
      return;
    }
  
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to post a recipe.");
      return;
    }

    setIsLoading(true); // Start the loading indicator

    try {
      // Fetch user document to get the full name
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userName = userDoc.exists() ? userDoc.data().fullName : "Anonymous";  // Using fullName
  
      const storage = getStorage();
      const storageRef = ref(storage, `recipes/${Date.now()}`);
      const response = await fetch(imageUri);
      const blob = await response.blob();
  
      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress
        },
        (error) => {
          console.error("Upload failed", error);
          alert("Error uploading image: " + error.message);
          setIsLoading(false); // Stop the loading indicator on error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addDoc(collection(db, "recipes"), {
              imageUri: downloadURL,
              caption,
              ingredients,
              instructions,
              userName,  // Use the fetched full name
              createdAt: new Date(),
              likes: 0,
              likedBy: [],  // Initialize likedBy array
              userId: user.uid  // Save user ID
            })
            .then(() => {
              alert("Recipe posted!");
              setIsLoading(false); // Stop the loading indicator
              onBack();
            })
            .catch((error) => {
              console.error("Error posting recipe: ", error);
              alert("Error posting recipe");
              setIsLoading(false); // Stop the loading indicator on error
            });
          });
        }
      );
    } catch (error) {
      console.error("Error posting recipe: ", error);
      alert("Error posting recipe");
      setIsLoading(false); // Stop the loading indicator on error
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onBack}
        style={{
          position: "absolute",
          top: 40,
          left: 20,
          zIndex: 1,
        }}
      >
        <FontAwesome5 name="arrow-left" size={24} color="black" />
      </Pressable>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.cardContainer}>
          <Text style={styles.header}>Post a New Recipe</Text>
          <TextInput
            style={[commonStyles.input, styles.input]}
            placeholder="Enter a caption..."
            value={caption}
            onChangeText={setCaption}
            multiline
          />
          <TextInput
            style={[commonStyles.input, styles.input]}
            placeholder="Enter ingredients..."
            value={ingredients}
            onChangeText={setIngredients}
            multiline
          />
          <TextInput
            style={[commonStyles.input, styles.input]}
            placeholder="Enter instructions..."
            value={instructions}
            onChangeText={setInstructions}
            multiline
          />
          <Pressable onPress={pickImage} style={[commonStyles.button, {alignSelf:"center"}]}>
            <Text style={commonStyles.buttonText}>Select Photo</Text>
          </Pressable>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
          <Pressable onPress={postNewRecipe} style={[commonStyles.button, {alignSelf:"center"}]}>
            <Text style={commonStyles.buttonText}>Post Recipe</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal isVisible={isLoading}>
        <View style={styles.modalContainer}>
          <Lottie options={defaultOptions} height={150} width={150} />
          <Text style={styles.modalText}>Posting your recipe...</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    alignItems: "center",
    width: "100%",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
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
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    maxHeight: 100, // Set the maximum height for the input fields
  },
  multilineInput: {
    height: 100, // Initial height
    textAlignVertical: "top",
  },
  modalContainer: {
    width: "80%", // Set a fixed width
    height: 200, // Set a fixed height
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    padding: 20,
    alignSelf: "center", // Center the modal container within the screen
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
    color: "#000",
  },
});




// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   Image,
//   Pressable,
//   ScrollView,
//   ActivityIndicator,
// } from "react-native";
// import Modal from "react-native-modal";
// import { launchImageLibrary } from "react-native-image-picker";
// import { db, auth } from "../utils/firebaseConfig";
// import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { commonStyles } from "../styles/styles";
// import { FontAwesome5 } from "@expo/vector-icons";

// export default function PostRecipeScreen({ onBack }) {
//   const [imageUri, setImageUri] = useState(null);
//   const [caption, setCaption] = useState("");
//   const [ingredients, setIngredients] = useState("");
//   const [instructions, setInstructions] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const pickImage = () => {
//     const options = {
//       mediaType: "photo",
//       quality: 1,
//     };
//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log("User cancelled image picker");
//       } else if (response.error) {
//         console.log("ImagePicker Error: ", response.error);
//       } else {
//         const source = { uri: response.assets[0].uri };
//         setImageUri(source.uri);
//       }
//     });
//   };

//   const postNewRecipe = async () => {
//     if (!imageUri || !caption || !ingredients || !instructions) {
//       alert("Please fill all fields.");
//       return;
//     }
  
//     const user = auth.currentUser;
//     if (!user) {
//       alert("You must be logged in to post a recipe.");
//       return;
//     }

//     setIsLoading(true); // Start the loading indicator

//     try {
//       // Fetch user document to get the full name
//       const userDoc = await getDoc(doc(db, "users", user.uid));
//       const userName = userDoc.exists() ? userDoc.data().fullName : "Anonymous";  // Using fullName
  
//       const storage = getStorage();
//       const storageRef = ref(storage, `recipes/${Date.now()}`);
//       const response = await fetch(imageUri);
//       const blob = await response.blob();
  
//       const uploadTask = uploadBytesResumable(storageRef, blob);
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           // Handle progress
//         },
//         (error) => {
//           console.error("Upload failed", error);
//           alert("Error uploading image: " + error.message);
//           setIsLoading(false); // Stop the loading indicator on error
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             addDoc(collection(db, "recipes"), {
//               imageUri: downloadURL,
//               caption,
//               ingredients,
//               instructions,
//               userName,  // Use the fetched full name
//               createdAt: new Date(),
//               likes: 0,
//               likedBy: [],  // Initialize likedBy array
//               userId: user.uid  // Save user ID
//             })
//             .then(() => {
//               alert("Recipe posted!");
//               setIsLoading(false); // Stop the loading indicator
//               onBack();
//             })
//             .catch((error) => {
//               console.error("Error posting recipe: ", error);
//               alert("Error posting recipe");
//               setIsLoading(false); // Stop the loading indicator on error
//             });
//           });
//         }
//       );
//     } catch (error) {
//       console.error("Error posting recipe: ", error);
//       alert("Error posting recipe");
//       setIsLoading(false); // Stop the loading indicator on error
//     }
//   };
  
//   return (
//     <View style={styles.container}>
//       <Pressable
//         onPress={onBack}
//         style={{
//           position: "absolute",
//           top: 40,
//           left: 20,
//           zIndex: 1,
//         }}
//       >
//         <FontAwesome5 name="arrow-left" size={24} color="black" />
//       </Pressable>
//       <ScrollView contentContainerStyle={styles.scrollViewContainer}>
//         <View style={styles.cardContainer}>
//           <Text style={styles.header}>Post a New Recipe</Text>
//           <TextInput
//             style={[commonStyles.input, styles.input]}
//             placeholder="Enter a caption..."
//             value={caption}
//             onChangeText={setCaption}
//             multiline
//           />
//           <TextInput
//             style={[commonStyles.input, styles.input]}
//             placeholder="Enter ingredients..."
//             value={ingredients}
//             onChangeText={setIngredients}
//             multiline
//           />
//           <TextInput
//             style={[commonStyles.input, styles.input]}
//             placeholder="Enter instructions..."
//             value={instructions}
//             onChangeText={setInstructions}
//             multiline
//           />
//           <Pressable onPress={pickImage} style={[commonStyles.button, {alignSelf:"center"}]}>
//             <Text style={commonStyles.buttonText}>Select Photo</Text>
//           </Pressable>
//           {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
//           <Pressable onPress={postNewRecipe} style={[commonStyles.button, {alignSelf:"center"}]}>
//             <Text style={commonStyles.buttonText}>Post Recipe</Text>
//           </Pressable>
//         </View>
//       </ScrollView>

//       <Modal isVisible={isLoading}>
//         <View style={styles.modalContainer}>
//           <ActivityIndicator size="large" color="#0000ff" />
//           <Text style={styles.modalText}>Posting your recipe...</Text>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   scrollViewContainer: {
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cardContainer: {
//     alignItems: "center",
//     width: "100%",
//     padding: 20,
//     backgroundColor: "#ffffff",
//     borderRadius: 20,
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 10,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#333333",
//   },
//   image: {
//     width: "100%",
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   input: {
//     maxHeight: 100, // Set the maximum height for the input fields
//   },
//   multilineInput: {
//     height: 100, // Initial height
//     textAlignVertical: "top",
//   },
//   modalContainer: {
//     width: "80%", // Set a fixed width
//     height: 200, // Set a fixed height
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     borderRadius: 10,
//     padding: 20,
//     alignSelf: "center", // Center the modal container within the screen
//   },
//   modalText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "#000",
//   },
// });
