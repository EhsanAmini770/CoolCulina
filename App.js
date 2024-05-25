import React, { useState, useEffect } from 'react';
import AppNavigator from './src/AppNavigator';
import CustomSplashScreen from './src/components/CustomSplashScreen'; // Import the custom splash screen
import './src/utils/firebaseConfig';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      // Perform all initialization tasks here (e.g., fetching initial data, authentication checks)
      // Simulate loading with a timeout for demonstration
      await new Promise(resolve => setTimeout(resolve, 3000));
      setLoading(false);
    };

    initializeApp();
  }, []);

  return (
    <>
      {loading && <CustomSplashScreen onFinished={() => setLoading(false)} />}
      {!loading && <AppNavigator />}
    </>
  );
}
