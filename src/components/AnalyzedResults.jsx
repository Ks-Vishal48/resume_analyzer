import React from "react";

const AnalyzedResult = ({ analysis }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Analysis Result</h2>
      <pre style={{
        background: "#f4f4f4",
        padding: "10px",
        borderRadius: "5px"
      }}>
        {JSON.stringify(analysis, null, 2)}
      </pre>
    </div>
  );
};

export default AnalyzedResult;
