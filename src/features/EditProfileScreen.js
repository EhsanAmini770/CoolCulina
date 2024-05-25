import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, Image, ActivityIndicator, Pressable, Text } from 'react-native';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { commonStyles, colors } from '../styles/styles';

export default function EditProfileScreen() {
  const [profile, setProfile] = useState({
    fullName: '',
    bio: '',
    location: '',
    dateOfBirth: '',
    photoURL: '',
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setProfile({
            fullName: userData.fullName,
            bio: userData.bio,
            location: userData.location,
            dateOfBirth: userData.dateOfBirth,
            photoURL: userData.photoURL
          });
        } else {
          Alert.alert("No user data found.");
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    setUpdating(true);
    const userRef = doc(db, "users", auth.currentUser.uid);
    try {
      await updateDoc(userRef, {
        ...profile
      });
      Alert.alert("Profile updated successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Update failed", error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <View style={commonStyles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.lightBlue} />
      </View>
    );
  }

  return (
    <View style={commonStyles.screenContainer}>

      <TextInput
        style={commonStyles.input}
        placeholder="Full Name"
        value={profile.fullName}
        onChangeText={(text) => setProfile({ ...profile, fullName: text })}
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Bio"
        value={profile.bio}
        onChangeText={(text) => setProfile({ ...profile, bio: text })}
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Location"
        value={profile.location}
        onChangeText={(text) => setProfile({ ...profile, location: text })}
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Date of Birth"
        value={profile.dateOfBirth}
        onChangeText={(text) => setProfile({ ...profile, dateOfBirth: text })}
      />
      {profile.photoURL && (
        <Image source={{ uri: profile.photoURL }} style={commonStyles.profilePic} />
      )}
      <Pressable style={commonStyles.button} onPress={handleUpdate}>
        <Text style={commonStyles.buttonText}>Update Profile</Text>
      </Pressable>
      {updating && <ActivityIndicator size="small" color={colors.lightBlue} />}
    </View>
  );
}
