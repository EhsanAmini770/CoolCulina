import axios from 'axios';

// Validate email format
export const validateEmailFormat = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Verify email existence using ZeroBounce
export const verifyEmail = async (email) => {
  const API_KEY = 'your_zerobounce_api_key'; 
  try {
    const response = await axios.get(`https://api.zerobounce.net/v2/validate?api_key=${API_KEY}&email=${email}`);
    console.log("ZeroBounce API response: ", response.data); // Log the API response for debugging
    if (response.data.status === "valid") {
      return { status: "valid", message: "Email is valid" };
    } else {
      return { status: response.data.status, message: "Error. Please enter a valid email" };
    }
  } catch (error) {
    console.error("Error verifying email: ", error);
    return { status: "error", message: "Error. Please enter a valid email" };
  }
};


























