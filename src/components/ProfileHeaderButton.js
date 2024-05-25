import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

const ProfileHeaderButton = ({ navigation }) => {
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
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Profile")} role="button">
        {userPhotoURL ? (
          <Image source={{ uri: userPhotoURL }} style={styles.image} />
        ) : (
          <MaterialCommunityIcons
            name="account-circle"
            size={30}
            color="black"
          />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default ProfileHeaderButton;
