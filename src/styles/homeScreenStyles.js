// styles/homeScreenStyles.js
import { StyleSheet } from 'react-native';

const colors = {
  background: '#f5f5f5',
  darkGreen: '#022e24',
  lightBackground: '#fff',
  primary: '#333',
  buttonText: '#fff',
};

const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedCategoryBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: colors.lightBackground,
  },
  categoryBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  categoryButton: {
    backgroundColor: colors.darkGreen, // Dark green for button background
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 50,
  },
  buttonStyle: {
    margin: 5,
  },
  buttonText: {
    color: colors.buttonText, 
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  recipeCardContainer: {
    flex: 1,
    margin: 10,
    padding: 4,
    borderRadius: 10,
  },
  loadMoreButton: {
    padding: 10,
    backgroundColor: colors.darkGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  loadMoreText: {
    color: 'white',
    fontSize: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightBackground,
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 10,
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
    alignSelf: 'center',
  },
  fab: {
    position: 'absolute',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: colors.darkGreen,
    borderRadius: 28,
    elevation: 8,
  },
  fabInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 16,
  },
  fabIcon: {
    fontSize: 24,
    color: 'white',
  },
  fabDescription: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
});

export { colors, homeScreenStyles };
