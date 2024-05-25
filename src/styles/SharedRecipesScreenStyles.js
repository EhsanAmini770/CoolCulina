import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './styles'; // Ensure the correct path to your styles file
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: RFPercentage(2),
    backgroundColor: "#f5f5f5",
  },
  recipeItem: {
    marginBottom: RFPercentage(2),
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: RFPercentage(25),
  },
  infoContainer: {
    padding: RFPercentage(2),
    flex: 1,
  },
  fullName: {
    fontSize: RFValue(10, width),
    fontWeight: "bold",
    color: "#333",
  },
  caption: {
    fontSize: RFValue(8, width),
    color: "#666",
    flexWrap: "wrap",
    overflow: "hidden",
    lineHeight: RFValue(10, width),
  },
  interactionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(1),
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: RFPercentage(1),
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  likeButtonActive: {
    backgroundColor: "#ffeded",
  },
  likeText: {
    marginLeft: RFValue(5, width),
    color: "#333",
  },
  likeIcon: {
    color: "grey",
  },
  likeIconActive: {
    color: "red",
  },
  fullScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalView: {
    width: "90%",
    height: "75%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: RFPercentage(2),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  modalImage: {
    width: "100%",
    height: RFPercentage(35),
    borderRadius: 16,
    marginBottom: RFPercentage(2),
  },
  modalCaptionContainer: {
    paddingHorizontal: RFPercentage(2),
  },
  modalCaption: {
    fontSize: RFValue(8, width),
    color: "#333",
    marginBottom: RFPercentage(1),
    textAlign: "justify",
    width: "100%",
    flexWrap: "wrap",
  },
  modalTextTitle: {
    fontSize: RFValue(10, width),
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
    width: "100%",
  },
  ingredientsContainer: {
    marginBottom: RFPercentage(2),
  },
  instructionsContainer: {
    marginBottom: RFPercentage(2),
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFPercentage(1),
  },
  bulletPoint: {
    fontSize: RFValue(8, width),
    color: "#333",
    marginRight: RFValue(1, width),
  },
  ingredientText: {
    fontSize: RFValue(8, width),
    color: "#333",
  },
  instructionText: {
    fontSize: RFValue(8, width),
    textAlign: "left",
    color: "#333",
    marginVertical: RFPercentage(1),
  },
  buttonClose: {
    backgroundColor: colors.darkGreen,
    borderRadius: 16,
    padding: RFPercentage(2),
    alignSelf: "center",
    marginTop: RFPercentage(2),
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    width: RFPercentage(7),
    height: RFPercentage(7),
    alignItems: "center",
    justifyContent: "center",
    right: RFPercentage(2),
    bottom: RFPercentage(5),
    backgroundColor: colors.darkGreen,
    borderRadius: RFPercentage(3.5),
    elevation: 8,
  },
});

export default styles;
