// emailValidation.js
import axios from 'axios';

// Validate email format
export const validateEmailFormat = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Verify email existence using ZeroBounce
export const verifyEmail = async (email) => {
  const API_KEY = 'f5550e9cfe9f433eb3ce1f799290a676'; // Replace with your ZeroBounce API key
  try {
    const response = await axios.get(`https://api.zerobounce.net/v2/validate?api_key=${API_KEY}&email=${email}`);
    if (response.data.status === "valid") {
      return { status: "valid", message: "Email is valid" };
    } else {
      return { status: response.data.status, message: response.data.sub_status };
    }
  } catch (error) {
    console.error("Error verifying email: ", error);
    return { status: "error", message: "Failed to verify email" };
  }
};
