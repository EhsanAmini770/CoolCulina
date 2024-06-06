# CoolCulina

CoolCulina is a mobile application designed to help users discover recipes, create personalized meal plans, and receive AI-based recommendations. The app offers various features such as browsing recipes, sharing personal recipes, finding recipes by ingredients, and managing daily calorie needs. Additionally, it includes a chatbot for users to interact with and receive suggestions from AI.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- Browse and discover new recipes
- Share personal recipes with the community
- Search for recipes by ingredients
- Manage daily calorie intake and meal plans
- AI-powered chatbot for personalized recipe recommendations and nutrition advice
- Secure user authentication and data storage

## Technologies Used

- **React Native:** For building the mobile application
- **Firebase:** For secure data storage and authentication
- **ZeroBounce API:** For email validation
- **Spoonacular API:** For accessing a vast database of recipes
- **Expo:** For easy development and management of the React Native project
- **Google Natural Language API:** For processing and understanding text

## Installation

### Prerequisites

- Node.js and npm installed
- Expo CLI installed globally (`npm install -g expo-cli`)

### Clone the Repository

```bash
git clone https://github.com/EhsanAmini770/CoolCulina.git
cd CoolCulina
```

### Install Dependencies

```bash
npm install
```

### Update Configure Firebase

Update the file named `firebaseConfig.js` in the `src\utils\firebaseConfig.js` directory and add your Firebase configuration:

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_auth_domain",
  projectId: "your_project_id",
  storageBucket: "your_storage_bucket",
  messagingSenderId: "your_messaging_sender_id",
  appId: "your_app_id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Set the persistence to local
setPersistence(auth, browserLocalPersistence)
  .catch(function(error) {
    console.log("Error setting persistence:", error);
  });

export { db, app, auth };
```

### Configure API Keys

Replace the placeholder API keys in the following files with your own API keys:

#### ZeroBounce API

In `src/utils/emailValidation.js`, replace `'your_zerobounce_api_key'` with your ZeroBounce API key:

#### Spoonacular API

In `src/utils/spoonacularConfig.js` and `backend/app.js`, replace `'your_spoonacular_api_key'` with your Spoonacular API key:

### Update Google Service Account

Replace the placeholder values in `backend/serviceApi.json` with your own Google service account credentials:

```json
{
  "type": "service_account",
  "project_id": "your_project_id", // Replace this with your project ID
  "private_key_id": "your_private_key_id", // Replace this with your private key ID
  "private_key": "-----BEGIN PRIVATE KEY-----\nyour_private_key\n-----END PRIVATE KEY-----\n", // Replace this with your private key
  "client_email": "your_client_email", // Replace this with your client email
  "client_id": "your_client_id", // Replace this with your client ID
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "your_client_x509_cert_url", // Replace this with your client X509 cert URL
  "universe_domain": "googleapis.com"
}
```

### Start the Application

```bash
expo start
```

## Usage

1. **Register**: Create a new account using your email.
2. **Login**: Sign in with your email and password.
3. **Discover Recipes**: Browse the latest recipes and get personalized recommendations.
4. **Share Recipes**: Share your own recipes with the community.
5. **Meal Planning**: Plan your meals and track your calorie intake.
6. **Chatbot**: Interact with the AI-powered chatbot for recipe suggestions and nutrition advice.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.


## Acknowledgements

- Firebase
- ZeroBounce API
- Spoonacular API
- Google Natural Language API
- Expo
- React Native

## Contributors

- Ehsan Amini ([@EhsanAmini770](https://github.com/EhsanAmini770))
<<<<<<< Updated upstream
- Ahmed Sedki ([@Ahmed-Sedki](https://github.com/Ahmed-Sedki))
=======
- Ahmed Sedki ([@Ahmed-Sedki](https://github.com/Ahmed-Sedki))
>>>>>>> Stashed changes
