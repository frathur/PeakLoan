import axios from "axios";

const API_URL = "http://localhost:8000";

export const checkLoanStatus = async (formData: any) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, formData);
    return response.data;
  } catch (error) {
    console.error("Prediction failed:", error);
    throw error;
  }
};
