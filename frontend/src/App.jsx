import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");

  const sendMessage = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/chat",
        { message }
      );

      setReply(res.data.answer);
    } catch (error) {
      setReply("Error: " + error.message);
    }
  };

  const uploadPDF = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/summarize-pdf",
        formData
      );

      setSummary(res.data.summary);
    } catch (error) {
      setSummary("Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Study Assistant</h1>

      <h2>PDF Study Notes</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={uploadPDF}>
        Summarize PDF
      </button>

      <pre style={{ whiteSpace: "pre-wrap" }}>
        {summary}
      </pre>

      <hr />

      <textarea
        rows="5"
        cols="50"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br />
      <br />

      <button onClick={sendMessage}>
        Ask AI
      </button>

      <h3>Response:</h3>
      <p>{reply}</p>
    </div>
  );
}

export default App;