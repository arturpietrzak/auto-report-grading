import React, { useState } from "react";
import { List } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const UploadPage = ({ onNavigate, onUpload }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [reportTopic, setReportTopic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (file && file.type === "application/pdf") {
      const fileReader = new FileReader();

      fileReader.onload = async () => {
        const typedArray = new Uint8Array(fileReader.result);
        try {
          const pdf = await pdfjsLib.getDocument(typedArray).promise;
          let text = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();

            text += content.items.map((item) => item.str).join(" ") + "\n";
          }
          text = text.replace(/\s\s+/g, " ");
          onUpload(name, reportTopic, file.name, text);
        } catch (error) {
          console.error("Error reading PDF:", error);
        }
      };

      fileReader.readAsArrayBuffer(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => onNavigate("home")}
          className="text-blue-500 hover:underline flex items-center gap-2"
        >
          <List size={20} />
          Back to Reports
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-6">Upload New Report</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Report Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Report Topic (used for automatic checking)
          </label>
          <input
            type="text"
            value={reportTopic}
            onChange={(e) => setReportTopic(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">File</label>
          <input
            type="file"
            accept=".pdf,.txt"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Upload and Analyze Report
        </button>
      </form>
    </div>
  );
};

export default UploadPage;
