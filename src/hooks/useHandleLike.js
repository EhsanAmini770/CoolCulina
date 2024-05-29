import { useCallback } from "react";
import { doc, runTransaction } from "firebase/firestore";
import { db, auth } from "../utils/firebaseConfig";

const useHandleLike = (setRecipes, recipes) => {
  const handleLike = useCallback(async (recipeId) => {
    const recipeRef = doc(db, "recipes", recipeId);
    const user = auth.currentUser;
    const userId = user.uid;

    await runTransaction(db, async (transaction) => {
      const recipeDoc = await transaction.get(recipeRef);
      if (!recipeDoc.exists()) {
        throw "Document does not exist!";
      }
      let newLikes = recipeDoc.data().likes || 0;
      let likedBy = recipeDoc.data().likedBy || [];

      if (likedBy.includes(userId)) {
        newLikes--;
        likedBy = likedBy.filter((id) => id !== userId);
      } else {
        newLikes++;
        likedBy.push(userId);
      }

      transaction.update(recipeRef, { likes: newLikes, likedBy: likedBy });
    });

    setRecipes(
      recipes.map((recipe) => {
        if (recipe.id === recipeId) {
          const liked = recipe.likedBy?.includes(userId);
          return {
            ...recipe,
            likes: liked ? recipe.likes - 1 : recipe.likes + 1,
            likedBy: liked
              ? recipe.likedBy.filter((id) => id !== userId)
              : [...(recipe.likedBy || []), userId],
          };
        }
        return recipe;
      })
    );
  }, [setRecipes, recipes]);

  return handleLike;
};

export default useHandleLike;
