import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  ActivityIndicator,
  FlatList,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";
import { getAuth, signOut, deleteUser } from "firebase/auth";
import {
  doc, getDoc, collection, query, where, getDocs, updateDoc, deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { commonStyles, colors } from "../styles/styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import Lottie from "react-lottie";
import updatingAnimation from "../../assets/animations/updating.json";
import BackButtonHandler from "../components/BackButtonHandler";
import styles from "../styles/profileStyle";

export default function ProfileScreen() {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    photoURL: null,
    bio: "",
    location: "",
    joinDate: "",
    postsCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [accountCreationDate, setAccountCreationDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);

  const navigation = useNavigation();
  const auth = getAuth();
  const storage = getStorage();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
          fetchRecipes();
        } else {
          Alert.alert("No user data found.");
        }
        setLoading(false);
      }
    };

    const fetchRecipes = async () => {
      const q = query(
        collection(db, "recipes"),
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const userRecipes = [];
      querySnapshot.forEach((doc) => {
        userRecipes.push({ id: doc.id, ...doc.data() });
      });
      setRecipes(userRecipes);
    };

    fetchProfileData();
    fetchAccountCreationDate();
  }, [auth.currentUser]);

  const fetchAccountCreationDate = () => {
    if (auth.currentUser) {
      const creationTime = auth.currentUser.metadata.creationTime;
      const formattedCreationTime = new Date(creationTime).toLocaleDateString();
      setAccountCreationDate(formattedCreationTime);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        Alert.alert("Logout Failed", error.message);
      });
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = response.assets[0].uri;
        uploadImage(source);
      }
    });
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    setAnimationVisible(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
      await uploadBytes(fileRef, blob);
      const downloadURL = await getDownloadURL(fileRef);
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { photoURL: downloadURL });
      setUserInfo((prev) => ({ ...prev, photoURL: downloadURL }));
      Alert.alert("Profile picture updated!");
    } catch (error) {
      console.error("Error uploading file: ", error);
      Alert.alert("Error uploading file.");
    } finally {
      setUploading(false);
      setTimeout(() => {
        setAnimationVisible(false);
      }, 1000);
    }
  };

  const confirmDelete = (recipeId, imageUri) => {
    setSelectedRecipe({ id: recipeId, imageUri });
    setModalVisible(true);
  };

  const deleteRecipe = async () => {
    if (!selectedRecipe) return;
    try {
      const imageRef = ref(storage, selectedRecipe.imageUri);
      await deleteObject(imageRef);
      await deleteDoc(doc(db, "recipes", selectedRecipe.id));
      setRecipes((recipes) =>
        recipes.filter((recipe) => recipe.id !== selectedRecipe.id)
      );
      setSelectedRecipe(null);
      setModalVisible(false);
      Alert.alert("Recipe deleted successfully!");
    } catch (error) {
      console.error("Error deleting recipe: ", error);
      Alert.alert("Error deleting recipe.");
    }
  };

  const handleDeleteAccount = async () => {
    if (auth.currentUser) {
      try {
        const userRecipesQuery = query(
          collection(db, "recipes"),
          where("userId", "==", auth.currentUser.uid)
        );
        const userRecipesSnapshot = await getDocs(userRecipesQuery);

        // Delete user's recipes
        const deleteRecipesPromises = userRecipesSnapshot.docs.map(
          async (docSnapshot) => {
            const recipeData = docSnapshot.data();
            const imageRef = ref(storage, recipeData.imageUri);
            await deleteObject(imageRef);
            await deleteDoc(doc(db, "recipes", docSnapshot.id));
          }
        );

        await Promise.all(deleteRecipesPromises);

        // Delete profile picture
        if (userInfo.photoURL) {
          const profilePicRef = ref(
            storage,
            `profilePictures/${auth.currentUser.uid}`
          );
          await deleteObject(profilePicRef);
        }

        // Delete user document
        await deleteDoc(doc(db, "users", auth.currentUser.uid));

        // Delete user account
        await deleteUser(auth.currentUser);

        Alert.alert("Account deleted successfully!");
        navigation.replace("Login");
      } catch (error) {
        console.error("Error deleting account: ", error);
        Alert.alert("Error deleting account.");
      }
    }
  };

  if (loading) {
    return (
      <View style={commonStyles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.lightBlue} />
      </View>
    );
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: updatingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <View style={styles.screenContainer}>
      <BackButtonHandler color="black" />
      <View style={styles.profileContainer}>
        {userInfo.photoURL ? (
          <View>
            <Image
              source={{ uri: userInfo.photoURL }}
              style={styles.profilePic}
            />
            <Pressable style={styles.editIconContainer} onPress={selectImage}>
              <View style={styles.iconBorder}>
                <Icon name="add" size={30} color={colors.softWhite} />
              </View>
            </Pressable>
          </View>
        ) : (
          <View>
            <Image
              source={require("../../assets/placeholder.jpg")} // Placeholder image path
              style={styles.profilePic}
            />
            <Pressable style={styles.editIconContainer} onPress={selectImage}>
              <View style={styles.iconBorder}>
                <Icon name="add" size={30} color={colors.softWhite} />
              </View>
            </Pressable>
          </View>
        )}
        <Text style={styles.fullName}>{userInfo.fullName}</Text>
        <Text style={styles.email}>{userInfo.email}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.infoContainer}>
          <ScrollView contentContainerStyle={styles.infoScrollContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Bio:</Text>
              <Text style={styles.value}>{userInfo.bio}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Location:</Text>
              <Text style={styles.value}>{userInfo.location}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Joined:</Text>
              <Text style={styles.value}>{accountCreationDate}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Date of Birth:</Text>
              <Text style={styles.value}>{userInfo.dateOfBirth}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Posts:</Text>
              <Text style={styles.value}>{recipes.length}</Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.buttonRow}>
          <Pressable
            style={commonStyles.button}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={commonStyles.buttonText}>Edit Profile</Text>
          </Pressable>
        </View>

        {uploading && (
          <View style={styles.uploadingContainer}>
            <ActivityIndicator size="large" color={colors.lightBlue} />
          </View>
        )}

        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.recipeItem}>
              <Image
                source={{ uri: item.imageUri }}
                style={styles.recipeImage}
              />
              <Pressable
                onPress={() => confirmDelete(item.id, item.imageUri)}
                style={styles.menuIcon}
              >
                <Icon name="delete" size={24} color={colors.red} />
              </Pressable>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.noRecipesText}>No recipes shared yet.</Text>
          }
          numColumns={2}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Are you sure you want to delete this recipe?
              </Text>
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, { backgroundColor: "#B22222" }]}
                  onPress={deleteRecipe}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={deleteModalVisible}
          onRequestClose={() => {
            setDeleteModalVisible(!deleteModalVisible);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </Text>
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setDeleteModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, { backgroundColor: "#B22222" }]}
                  onPress={() => {
                    setDeleteModalVisible(false);
                    setConfirmDeleteModalVisible(true);
                  }}
                >
                  <Text style={styles.buttonText}>Delete Account</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={confirmDeleteModalVisible}
          onRequestClose={() => {
            setConfirmDeleteModalVisible(!confirmDeleteModalVisible);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Are you absolutely sure? This action cannot be undone.
              </Text>
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setConfirmDeleteModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, { backgroundColor: "#B22222" }]}
                  onPress={handleDeleteAccount}
                >
                  <Text style={styles.buttonText}>Confirm Delete</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {animationVisible && (
          <Modal
            transparent={true}
            animationType="fade"
            visible={animationVisible}
            onRequestClose={() => setAnimationVisible(false)}
          >
            <View style={styles.animationOverlay}>
              <Lottie options={defaultOptions} height={150} width={150} />
            </View>
          </Modal>
        )}
      </ScrollView>
      <View style={styles.logoutButtonContainer}>
        <Pressable
          style={[commonStyles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={commonStyles.buttonText}>Logout</Text>
        </Pressable>
        <Pressable
          style={[commonStyles.button, styles.deleteButton]}
          onPress={() => setDeleteModalVisible(true)}
        >
          <Text style={styles.buttonText}>Delete Account</Text>
        </Pressable>
      </View>
    </View>
  );
}
