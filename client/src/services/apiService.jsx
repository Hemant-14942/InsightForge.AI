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
    const response = await api.post("/upload-dataset", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Dataset upload failed:", error.response?.data || error.message);
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
