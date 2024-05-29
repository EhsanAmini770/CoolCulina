import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { commonStyles } from "../styles/styles";
import useImagePicker from "../hooks/useImagePicker";
import usePostRecipe from "../hooks/usePostRecipe";
import PostingModal from "../components/PostingModal";
import styles from "../styles/PostRecipeScreenStyles";

export default function PostRecipeScreen({ onBack }) {
  const { imageUri, pickImage } = useImagePicker();
  const { isLoading, postNewRecipe } = usePostRecipe();
  const [caption, setCaption] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

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
          <Pressable
            onPress={() => postNewRecipe(imageUri, caption, ingredients, instructions, onBack)}
            style={[commonStyles.button, { alignSelf: "center" }]}
          >
            <Text style={commonStyles.buttonText}>Post Recipe</Text>
          </Pressable>
        </View>
      </ScrollView>
      <PostingModal isLoading={isLoading} />
    </View>
  );
}
