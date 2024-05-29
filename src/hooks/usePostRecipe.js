import { useState } from "react";
import { db, auth } from "../utils/firebaseConfig";
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const usePostRecipe = () => {
  const [isLoading, setIsLoading] = useState(false);

  const postNewRecipe = async (imageUri, caption, ingredients, instructions, onSuccess, onError) => {
    if (!imageUri || !caption || !ingredients || !instructions) {
      alert("Please fill all fields.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to post a recipe.");
      return;
    }

    setIsLoading(true); // Start the loading indicator

    try {
      // Fetch user document to get the full name
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userName = userDoc.exists() ? userDoc.data().fullName : "Anonymous";  // Using fullName

      const storage = getStorage();
      const storageRef = ref(storage, `recipes/${Date.now()}`);
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress
        },
        (error) => {
          console.error("Upload failed", error);
          alert("Error uploading image: " + error.message);
          setIsLoading(false); // Stop the loading indicator on error
          if (onError) onError();
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addDoc(collection(db, "recipes"), {
              imageUri: downloadURL,
              caption,
              ingredients,
              instructions,
              userName,  // Use the fetched full name
              createdAt: new Date(),
              likes: 0,
              likedBy: [],  // Initialize likedBy array
              userId: user.uid  // Save user ID
            })
            .then(() => {
              alert("Recipe posted!");
              setIsLoading(false); // Stop the loading indicator
              if (onSuccess) onSuccess();
            })
            .catch((error) => {
              console.error("Error posting recipe: ", error);
              alert("Error posting recipe");
              setIsLoading(false); // Stop the loading indicator on error
              if (onError) onError();
            });
          });
        }
      );
    } catch (error) {
      console.error("Error posting recipe: ", error);
      alert("Error posting recipe");
      setIsLoading(false); // Stop the loading indicator on error
      if (onError) onError();
    }
  };

  return { isLoading, postNewRecipe };
};

export default usePostRecipe;
