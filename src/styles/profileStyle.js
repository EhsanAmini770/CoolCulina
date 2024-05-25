import { StyleSheet } from 'react-native';
import { colors } from './styles';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  fullName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.darkGreen,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 0,
    backgroundColor: colors.darkGreen,
    borderRadius: 50,
    padding: 5,
  },
  iconBorder: {
    borderWidth: 2,
    borderColor: colors.softWhite,
    borderRadius: 50,
  },
  text: {
    fontSize: 16,
    margin: 2,
    color: colors.darkGreen,
    textAlign: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  uploadingContainer: {
    marginTop: 20,
  },
  animationOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logoutButton: {
    backgroundColor: '#e0a709',
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#B22222',
    flex: 1,
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGreen,
  },
  value: {
    fontSize: 16,
    color: 'gray',
  },
  noRecipesText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
  menuIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 5,
  },
  logoutButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  infoContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  infoScrollContainer: {
    flexGrow: 1,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  recipeItem: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  recipeImage: {
    width: '100%',
    height: 120,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
