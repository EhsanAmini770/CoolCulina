import { StyleSheet } from 'react-native';
import { colors } from './styles'; // Ensure the correct path to your styles file

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Adding a background color for better visibility
  },
  fab: {
    position: "absolute",
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: colors.darkGreen,
    borderRadius: 28,
    elevation: 8, // Only for Android for shadow
  },
  fabInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingHorizontal: 16,
  },
  fabIcon: {
    fontSize: 24,
    color: "white",
  },
  fabDescription: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },
});

export default styles;
