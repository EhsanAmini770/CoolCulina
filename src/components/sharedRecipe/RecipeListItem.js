import React, { useRef } from "react";
import { View, Image, Text, Animated, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "../../utils/firebaseConfig";

const RecipeListItem = ({ item, handleLike, openRecipeModal, fadeAnim, userDictionary }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const isLiked = item.likedBy?.includes(auth.currentUser.uid);
  const userName = userDictionary[item.userId]?.fullName || "Unknown User";

  const handlePressAndAnimate = () => {
    handleLike(item.id);
    Animated.spring(scaleValue, {
      toValue: 0.9,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <Animated.View style={[styles.recipeItem, { opacity: fadeAnim }]}>
      <Pressable style={styles.card} onPress={() => openRecipeModal(item)}>
        <Image source={{ uri: item.imageUri }} style={styles.recipeImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.recipeCaption}>{item.caption.slice(0, 50)}...</Text>
        </View>
        <View style={styles.interactionBar}>
          <Pressable
            onPress={handlePressAndAnimate}
            style={[styles.likeButton, isLiked ? styles.likeButtonActive : {}]}
          >
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <MaterialCommunityIcons
                name={isLiked ? "heart" : "heart-outline"}
                size={24}
                style={isLiked ? styles.likeIconActive : styles.likeIcon}
              />
            </Animated.View>
            <Text style={styles.likeCount}>{item.likes || 0}</Text>
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  recipeItem: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  card: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 3,
  },
  recipeImage: {
    width: "100%",
    height: 150,
  },
  infoContainer: {
    padding: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  recipeCaption: {
    marginTop: 8,
    fontSize: 14,
    color: "gray",
  },
  interactionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeButtonActive: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    borderRadius: 20,
    padding: 4,
  },
  likeIcon: {
    color: "gray",
  },
  likeIconActive: {
    color: "red",
  },
  likeCount: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default RecipeListItem;
