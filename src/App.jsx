import React, { useEffect, useState } from "react";
import StartingPage from "./pages/StartingPage";
import UploadPage from "./pages/UploadPage";
import DetailsPage from "./pages/DetailsPage";
import { initialReports } from "./initialReports";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import LoginPage from "./pages/LoginPage";
import useLocalStorage from "./useLocalStorage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState({});
  const { saveReports, loadReports } = useLocalStorage();

  useEffect(() => {
    let loadedReports = loadReports();
    if (!loadedReports || loadedReports.length === 0) {
      saveReports(initialReports);
      loadedReports = initialReports;
    }
    setReports(loadedReports);
  }, []);

  useEffect(() => {
    saveReports(reports);
  }, [reports]);

  function getRandomID() {
    return Math.floor(Math.random() * 100000000);
  }

  const handleNavigate = (page, reportId = null) => {
    if (reportId !== null) {
      setSelectedReport(reports.find((r) => r.id === reportId));
    }

    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-4">
        <h1 className="text-xl font-bold text-[#64176b]">StudentReportLLM</h1>
      </nav>
      {currentPage === "login" && <LoginPage onNavigate={handleNavigate} />}
      {currentPage === "home" && (
        <StartingPage onNavigate={handleNavigate} reports={reports} />
      )}
      {currentPage === "upload" && (
        <UploadPage
          onNavigate={handleNavigate}
          onUpload={(name, reportTopic, filename, paragraph) => {
            handleNavigate("home");
            const now = new Date();
            const id = getRandomID();
            setReports((reports) => [
              ...reports,
              {
                id: id,
                name: name,
                reportTopic: reportTopic,
                filename: filename,
                status: "Pending",
                date: now.toISOString().split("T")[0],
                text: paragraph,
                results: {
                  scores: {
                    correctness: 5,
                    clarity: 5,
                    relevance: 5,
                    technical_depth: 5,
                    grammar_and_style: 5,
                  },
                  justifications: {
                    correctness: "",
                    clarity: "",
                    relevance: "",
                    technical_depth: "",
                    grammar_and_style: "",
                  },
                  suggestions: [""],
                },
              },
            ]);

            const google = createGoogleGenerativeAI({
              apiKey: import.meta.env.GOOGLE_API_KEY,
            });

            generateText({
              model: google("gemini-1.5-pro-latest"),
              prompt: `
            You are an expert and strict evaluator for academic writing in computer science. Your task is to grade a student's paragraph based on specific criteria. Please carefully assess the paragraph and provide scores for the following metrics, each on a scale from 0 to 5 points:
            - correctness: Evaluate whether the information presented is factually accurate and consistent with established computer science principles.
            - clarity: Assess how clearly and effectively the ideas are expressed.
            - relevance: Determine if the paragraph stays on topic and addresses the intended subject matter appropriately.
            - technical_depth: Evaluate the level of detail and depth of technical content appropriate for the target audience.
            - grammar_and_style: Assess the grammatical correctness and overall writing style.
            The topic of the work that you have to grade is "${reportTopic}"
            After grading each metric, provide a brief justification for each score. If possible, add suggestions. Structure your output in JSON format:
            {
              "scores": {
                "correctness": int,
                "clarity": int,
                "relevance": int,
                "technical_depth": int,
                "grammar_and_style": int
              },
              "justifications": {
                "correctness": string,
                "clarity": string,
                "relevance": string,
                "technical_depth": string,
                "grammar_and_style": string
              },
              "suggestions": string[]
            
              Paragraph to be graded: ${paragraph}
            }
            `,
            }).then(({ text }) => {
              const results = JSON.parse(text.replace(/^```json|```$/g, ""));

              // Update pending
              setReports((prevData) =>
                prevData.map((item) =>
                  item.id === id
                    ? {
                        ...item,
                        status: "Checked",
                        results: results,
                      }
                    : item
                )
              );
            });
          }}
        />
      )}
      {currentPage === "details" && (
        <DetailsPage onNavigate={handleNavigate} report={selectedReport} />
      )}
    </div>
  );
};

export default App;

/*
  Report data format:

  {
    id: 3,
    name: "",
    reportTopic: "",
    filename: "",
    status: "",
    date: "",
    text: "",
    results: {
      scores: {
        correctness: 5,
        clarity: 5,
        relevance: 5,
        technical_depth: 5,
        grammar_and_style: 5,
      },
      justifications: {
        correctness: "",
        clarity: "",
        relevance: "",
        technical_depth: "",
        grammar_and_style: "",
      },
      suggestions: [""],
    },
  },
*/
