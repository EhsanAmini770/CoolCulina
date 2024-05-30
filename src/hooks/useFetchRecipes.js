// src/hooks/useFetchRecipes.js
import { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

const useFetchRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [userDictionary, setUserDictionary] = useState({});

  const fetchUsers = useCallback(async () => {
    const userSnapshot = await getDocs(collection(db, "users"));
    const usersData = {};
    userSnapshot.forEach((doc) => {
      usersData[doc.id] = { id: doc.id, ...doc.data() };
    });
    setUserDictionary(usersData);
  }, []);

  const fetchRecipes = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "recipes"));
    const recipeData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRecipes(recipeData);
  }, []); // Empty dependency array means this runs only once after the initial render
          //we don't want to run this every time the component re-renders it will be useless knk

  useEffect(() => {
    fetchUsers();
    fetchRecipes();
  }, [fetchUsers, fetchRecipes]);

  return { recipes, userDictionary, fetchRecipes, setRecipes };
};

export default useFetchRecipes;
