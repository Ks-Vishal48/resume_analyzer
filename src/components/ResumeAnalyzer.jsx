import React, { useState } from "react";
import UploadResume from "./UploadResume";
import AnalyzedResult from "./AnalyzedResult";

const ResumeAnalyzer = () => {
  const [analysis, setAnalysis] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Resume Analyzer</h1>

      {!analysis ? (
        <UploadResume setAnalysis={setAnalysis} />
      ) : (
        <AnalyzedResult analysis={analysis} />
      )}
    </div>
  );
};

export default ResumeAnalyzer;
