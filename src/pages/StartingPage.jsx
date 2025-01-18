import React from "react";
import { FileText, Upload } from "lucide-react";

// Starting Page Component
const StartingPage = ({ onNavigate, reports }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Report List</h1>
        <button
          onClick={() => onNavigate("upload")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Upload size={20} />
          Upload New Report
        </button>
      </div>
      <div className="grid gap-4">
        {reports.map((report) => (
          <button
            key={report.id}
            onClick={() => onNavigate("details", report.id)}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors flex justify-between items-center w-full text-left"
            disabled={report.status !== "Checked"}
          >
            <div className="flex items-center gap-3">
              <FileText className="text-gray-500" />
              <div>
                <h2 className="font-semibold">{report.name}</h2>
                <p className="text-sm text-gray-500">{report.filename}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  report.status === "Checked"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {report.status}
              </span>
              <span className="text-sm text-gray-500">{report.date}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StartingPage;
