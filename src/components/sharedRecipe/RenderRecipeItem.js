import React from "react";
import RecipeListItem from "./RecipeListItem";

const RenderRecipeItem = ({ item, handleLike, openRecipeModal, fadeAnim, userDictionary }) => {
  return (
    <RecipeListItem
      item={item}
      handleLike={handleLike}
      openRecipeModal={openRecipeModal}
      fadeAnim={fadeAnim}
      userDictionary={userDictionary}
    />
  );
};

export default RenderRecipeItem;
