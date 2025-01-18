import React from "react";
import { List, AlertCircle, Star } from "lucide-react";

const DetailsPage = ({ onNavigate, report }) => {
  if (!report) {
    return <div className="p-6">Report not found</div>;
  }

  const getScoreColor = (score) => {
    if (score >= 4) return "bg-green-100 text-green-800";
    if (score <= 2) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  const formatScoreLabel = (key) => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const ScoreDisplay = ({ score }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < score) {
        stars.push(
          <Star
            key={i}
            className={`h-5 w-5 ${
              score === 5
                ? "text-green-500"
                : score <= 2
                ? "text-red-500"
                : "text-gray-500"
            }`}
            fill="currentColor"
          />
        );
      } else {
        stars.push(<Star key={i} className="h-5 w-5 text-gray-300" />);
      }
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => onNavigate("home")}
          className="text-blue-500 hover:underline flex items-center gap-2"
        >
          <List size={20} />
          Back to Reports
        </button>
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">{report.name}</h1>
          <p className="text-gray-500 break-all">{report.filename}</p>
        </div>
        <div className="grid gap-4">
          <div className="border-t pt-4">
            <h2 className="font-semibold mb-2">Status</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm inline-block ${
                report.status === "Checked"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {report.status}
            </span>
          </div>
          <div className="border-t pt-4">
            <h2 className="font-semibold mb-2">Upload Date</h2>
            <p>{report.date}</p>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Analysis Results</h2>

        {/* Scores */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Evaluation Scores</h3>
          <div className="space-y-6">
            {Object.entries(report.results.scores).map(([key, score]) => (
              <div key={key} className="border-b pb-4 last:border-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2 items-start">
                  <span className="font-medium">{formatScoreLabel(key)}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${getScoreColor(
                      score
                    )}`}
                  >
                    {score}/5
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <ScoreDisplay score={score} />
                  <span className="text-sm text-gray-500">
                    {score === 5
                      ? "Excellent"
                      : score <= 2
                      ? "Needs Improvement"
                      : "Good"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Justifications */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Detailed Analysis</h3>
          <div className="grid gap-4">
            {Object.entries(report.results.justifications).map(
              ([key, justification]) => (
                <div key={key} className="border-t pt-4">
                  <h4 className="font-semibold mb-2">
                    {formatScoreLabel(key)}
                  </h4>
                  <p className="text-gray-600">{justification}</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Suggestions */}
        <div className="border-t pt-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-3">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-blue-900">
                Suggestions for Improvement
              </h3>
            </div>
            <ul className="space-y-2 text-blue-800">
              {report.results.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <img
          src="https://picsum.photos/300/150"
          alt="Example Image"
          className="relative w-full rounded-lg overflow-hidden mt-6"
        />
      </div>
    </div>
  );
};

export default DetailsPage;
