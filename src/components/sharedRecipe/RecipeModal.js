import React from "react";
import { View, Image, Text, ScrollView, StyleSheet, Pressable, Modal } from "react-native";
import { BlurView } from "expo-blur";

const RecipeModal = ({ modalVisible, setModalVisible, selectedRecipe, renderIngredients, renderInstructions }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <BlurView intensity={100} style={styles.fullScreenBlur}>
        <View style={styles.modalContainer}>
          <Image
            source={{ uri: selectedRecipe?.imageUri }}
            style={styles.modalImage}
          />
          <View style={styles.modalCaptionContainer}>
            <Text style={styles.modalCaption}>
              {selectedRecipe?.caption}
            </Text>
          </View>
          <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.scrollView}>
            <Text style={styles.sectionTitle}>Ingredients:</Text>
            <View style={styles.ingredientsContainer}>
              {renderIngredients(selectedRecipe?.ingredients || "")}
            </View>
            <Text style={styles.sectionTitle}>Instructions:</Text>
            <View style={styles.instructionsContainer}>
              {renderInstructions(selectedRecipe?.instructions || "")}
            </View>
          </ScrollView>
          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreenBlur: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: "80%", // Added to restrict the height of the modal
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  scrollView: {
    width: "100%", // Added to ensure the ScrollView takes up full width
    flex: 1, // Added to ensure the ScrollView takes up remaining space
  },
  scrollViewContent: {
    alignItems: "center",
  },
  modalCaptionContainer: {
    marginVertical: 20,
  },
  modalCaption: {
    fontSize: 18,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  ingredientsContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  instructionsContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RecipeModal;
