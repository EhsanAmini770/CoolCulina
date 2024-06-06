// backend/app.js
const express = require("express");
const axios = require("axios");
const { LanguageServiceClient } = require("@google-cloud/language");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 5000;
const keyFilePath = "./serviceApi.json";
if (!fs.existsSync(keyFilePath)) {
  console.error(`File not found: ${keyFilePath}`);
  process.exit(1);
}
// Google Cloud Natural Language API setup
const languageClient = new LanguageServiceClient({
  keyFilename: keyFilePath,
});
app.use(cors({ origin: "*" }));
app.use(express.json());
app.post("/analyze-ingredients", async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!ingredients) {
      return res.status(400).json({ message: "Ingredients are required" });
    }
    // Call Google Cloud Natural Language API to analyze ingredients
    const document = {
      content: ingredients,
      type: "PLAIN_TEXT",
    };
    const [result] = await languageClient.analyzeEntities({ document });
    // Extract ingredient names
    const ingredientNames = result.entities
      //"OTHER is a catch-all for entities that do not fit into the other types."
      .filter((entity) => entity.type === "OTHER")
      .map((entity) => entity.name.toLowerCase())
      .filter((name) => name.length > 2)
      .join(",");
    console.log("Ingredient Names:", ingredientNames);

    // Call Spoonacular API to find recipes
    const spoonacularResponse = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientNames}&number=10&apiKey=your_spoonacular_api_key`
    );

    res.json(spoonacularResponse.data);
  } catch (error) {
    console.error("Error analyzing ingredients:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});