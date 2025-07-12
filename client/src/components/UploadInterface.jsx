import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import {
  uploadDatasetWithOptionalPDF,
  analyzeChartImage,
} from "../services/apiService";

export default function UploadInterface() {
  const [taskType, setTaskType] = useState("regression");
  const [targetColumn, setTargetColumn] = useState("");
  const [isDatasetUpload, setIsDatasetUpload] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const fileType = file.type;

    setIsLoading(true);
    const formData = new FormData();

    try {
      if (isDatasetUpload) {
        if (!targetColumn) {
          toast.error("Please enter the target column.");
          setIsLoading(false);
          return;
        }
        const isPDF = acceptedFiles.find((f) => f.type === "application/pdf");
        const csv = acceptedFiles.find((f) => f.type === "text/csv");

        if (!csv) {
          toast.error("CSV file is required.");
          setIsLoading(false);
          return;
        }

        formData.append("file", csv);
        formData.append("task_type", taskType);
        formData.append("target_column", targetColumn);
        if (isPDF) formData.append("pdf_file", isPDF);

        const result = await uploadDatasetWithOptionalPDF(formData);
        toast.success("Dataset uploaded successfully!");
        console.log(result);
      } else {
        if (!fileType.includes("image")) {
          toast.error("Please upload a valid image file.");
          setIsLoading(false);
          return;
        }

        formData.append("file", file);
        const result = await analyzeChartImage(formData);
        toast.success("Chart analyzed successfully!");
        console.log(result);
      }
    } catch (error) {
      toast.error("Upload failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: isDatasetUpload
      ? {
          "text/csv": [".csv"],
          "application/pdf": [".pdf"],
        }
      : {
          "image/*": [],
        },
    multiple: isDatasetUpload,
  });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <motion.div
        className="rounded-2xl shadow-lg bg-white dark:bg-neutral-900 p-6 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isDatasetUpload ? "Upload Dataset" : "Upload Chart Image"}
          </h2>
          <button
            className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700"
            onClick={() => setIsDatasetUpload(!isDatasetUpload)}
          >
            {isDatasetUpload ? "Switch to Chart Mode" : "Switch to Dataset Mode"}
          </button>
        </div>

        {isDatasetUpload && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Task Type
              </label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-white"
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
              >
                <option value="regression">Regression</option>
                <option value="classification">Classification</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Target Column
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-white"
                placeholder="Enter the target column"
                value={targetColumn}
                onChange={(e) => setTargetColumn(e.target.value)}
              />
            </div>
          </div>
        )}

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
            isDragActive
              ? "border-blue-400 bg-blue-50 dark:bg-neutral-800"
              : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-neutral-800"
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            {isDragActive
              ? "Drop the file here..."
              : `Drag & drop your ${isDatasetUpload ? "CSV and optional PDF" : "chart image"} here or click to upload.`}
          </p>
        </div>

        {isLoading && (
          <div className="w-full h-2 bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
