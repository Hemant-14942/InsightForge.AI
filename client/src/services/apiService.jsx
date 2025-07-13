import axios from "axios";

// Create an axios instance with default config
const api = axios.create({
  baseURL: "http://localhost:8000", // Change this if your FastAPI backend is deployed elsewhere
  headers: {
    "Accept": "application/json",
  },
});

// Upload CSV dataset (and optional PDF) for ML analysis
export const uploadDatasetWithOptionalPDF = async (formData) => {
  try {
    console.log("Uploading dataset with formData:", [...formData.entries()]);
    console.log("API base URL:", api.defaults.baseURL);
    
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    console.log("Upload response:", response);
    return response.data;
  } catch (error) {
    console.error("Dataset upload failed:", error);
    console.error("Error details:", error.response?.data || error.message);
    console.error("Error status:", error.response?.status);
    throw error;
  }
};

// Upload chart image for chart analysis
export const analyzeChartImage = async (formData) => {
  try {
    const response = await api.post("/analyze-chart", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Chart analysis failed:", error.response?.data || error.message);
    throw error;
  }
};
