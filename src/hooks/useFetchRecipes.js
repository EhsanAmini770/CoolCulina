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
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchRecipes();
  }, [fetchUsers, fetchRecipes]);

  return { recipes, userDictionary, fetchRecipes, setRecipes };
};

export default useFetchRecipes;
