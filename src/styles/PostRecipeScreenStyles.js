import { StyleSheet } from 'react-native';

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

export default styles;
