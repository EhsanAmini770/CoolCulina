import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Lottie from 'react-lottie';
import animationData from "../../assets/animations/uploading.json";

const PostingModal = ({ isLoading }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Modal isVisible={isLoading}>
      <View style={styles.modalContainer}>
        <Lottie options={defaultOptions} height={150} width={150} />
        <Text style={styles.modalText}>Posting your recipe...</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default PostingModal;
