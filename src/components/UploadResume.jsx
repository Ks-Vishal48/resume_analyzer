import { useState } from "react";
import "./UploadResume.css";


export default function UploadResume({ setAnalysis }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    const res = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setAnalysis(data.analysis);
  };

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleSubmit}>Upload Resume</button>
    </div>
  );
}
