import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import {
  Upload,
  FileSpreadsheet,
  Target,
  BrainCircuit,
  Loader2,
  FileUp,
  AlertCircle,
  FileType,
} from "lucide-react";
import { uploadDatasetWithOptionalPDF } from "../services/apiService";

export default function UploadInterface() {
  const [taskType, setTaskType] = useState("regression");
  const [targetColumn, setTargetColumn] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [csvColumns, setCsvColumns] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      setSelectedFiles(acceptedFiles);
      
      // Process each file by type
      const csvFiles = acceptedFiles.filter(file => file.type === "text/csv");
      const pdfFiles = acceptedFiles.filter(file => file.type === "application/pdf");
      
      // Set CSV file if available
      if (csvFiles.length > 0) {
        const csvFile = csvFiles[0];
        setCsvFile(csvFile);
        
        // Generate CSV columns from header
        const reader = new FileReader();
        reader.onload = () => {
          const text = reader.result;
          const lines = text.split("\n");
          if (lines.length > 0) {
            const header = lines[0].replace(/\r/g, "");
            const columns = header.split(",").map(col => col.trim()).filter(Boolean);
            setCsvColumns(columns);
          } else {
            setCsvColumns([]);
          }
        };
        reader.readAsText(csvFile);
      }
      
      // Set PDF file if available
      if (pdfFiles.length > 0) {
        setPdfFile(pdfFiles[0]);
      }
    },
    accept: {
      "text/csv": [".csv"],
      "application/pdf": [".pdf"],
      "application/vnd.powerbi.pbix": [".pbix"],
    },
    multiple: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!csvFile) {
      toast.error("Please upload a CSV file.", {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      });
      return;
    }

    if (!targetColumn) {
      toast.error("Please enter the target column.", {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      });
      return;
    }

    const formData = new FormData();
    
    // Add the CSV file as the main file
    formData.append("file", csvFile);
    
    // Add PDF file if available
    if (pdfFile) {
      formData.append("pdf_file", pdfFile);
    }
    
    formData.append("task_type", taskType);
    formData.append("target_col", targetColumn);

    setIsLoading(true);

    try {
      const result = await uploadDatasetWithOptionalPDF(formData);
      toast.success("File uploaded successfully!", {
        icon: <FileUp className="w-5 h-5 text-green-500" />,
      });
      console.log("Upload response:", result);
      // Reset all form state
      setSelectedFiles([]);
      setCsvFile(null);
      setPdfFile(null);
      setTargetColumn("");
      setCsvPreview([]);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error.response?.data?.detail || "Upload failed. Please try again.", 
        { icon: <AlertCircle className="w-5 h-5 text-red-500" /> }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <motion.form
        onSubmit={handleSubmit}
        className="rounded-2xl shadow-lg bg-gradient-to-br from-zinc-900/90 to-black border border-zinc-800 p-6 space-y-6 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <FileSpreadsheet className="w-6 h-6 text-main" />
          <h2 className="text-2xl font-semibold text-white">Upload Dataset</h2>
        </div>

        {/* Drag Drop Area */}
        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all group mb-4 ${
            isDragActive
              ? "border-main bg-main/5"
              : "border-zinc-700 hover:border-main/50 bg-zinc-800/30"
          }`}
        >
          <input {...getInputProps()} name="file" />
          <Upload
            className={`w-10 h-10 mx-auto mb-4 transition-colors duration-300 ${
              isDragActive ? "text-main" : "text-gray-400 group-hover:text-main/70"
            }`}
          />
          <p className="text-gray-300 text-sm">
            {isDragActive
              ? "Drop the files here..."
              : "Drag & drop your CSV (required) and PDF (optional) files, or click to upload."}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            You can upload both CSV and PDF files together.
          </p>
        </div>

        {/* Show selected files */}
        {(csvFile || pdfFile) && (
          <div className="text-sm text-gray-300 mb-4">
            <h3 className="font-medium text-white mb-1">Selected Files:</h3>
            {csvFile && (
              <div className="flex items-center gap-2 mb-1">
                <FileSpreadsheet className="w-4 h-4 text-green-500" />
                <span>{csvFile.name} (CSV)</span>
              </div>
            )}
            {pdfFile && (
              <div className="flex items-center gap-2">
                <FileType className="w-4 h-4 text-red-400" />
                <span>{pdfFile.name} (PDF)</span>
              </div>
            )}
          </div>
        )}

        {/* Target Column */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Target className="w-4 h-4 text-main" />
            Target Column
          </label>
          <select
            name="target_col"
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white focus:border-main focus:ring-1 focus:ring-main transition-colors duration-200"
            value={targetColumn}
            onChange={(e) => setTargetColumn(e.target.value)}
            disabled={csvColumns.length === 0}
          >
            <option value="" disabled>
              {csvColumns.length === 0 ? "Upload a CSV to select" : "Select target column"}
            </option>
            {csvColumns.map((col) => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </div>

        {/* Task Type */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <BrainCircuit className="w-4 h-4 text-main" />
            Task Type
          </label>
          <select
            name="task_type"
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-white focus:border-main focus:ring-1 focus:ring-main transition-colors duration-200"
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
          >
            <option value="regression">Regression</option>
            <option value="classification">Classification</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-main text-white font-medium px-4 py-2 rounded-xl hover:bg-main/90 transition-colors duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <FileUp className="w-4 h-4" />
                Submit
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
