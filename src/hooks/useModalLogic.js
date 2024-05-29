import { useState } from "react";

const useModalLogic = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  return {
    modalVisible,
    setModalVisible,
    selectedRecipe,
    openRecipeModal,
  };
};

export default useModalLogic;
