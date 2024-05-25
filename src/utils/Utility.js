class Utility {
  static formatNutrition(nutrient) {
    return `${nutrient.value} ${
      nutrient.unit
    } (SD: ±${nutrient.standardDeviation.toFixed(2)})`;
  }

  static openURL(url) {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  }
}

export default Utility;
