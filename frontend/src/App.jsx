import { useState } from "react";
import axios from "axios";
import Kanban from "./Kanban";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState("");

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
      alert("Please select a PDF");
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

  const generateQuiz = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/quiz-pdf",
        formData
      );

      setQuiz(res.data.quiz);
    } catch (error) {
      setQuiz("Error: " + error.message);
    }
  };

  return (
    <div className="container">
      <h1>🎓 AI Study Assistant</h1>

      <div className="top-grid">
        <div className="card">
          <h2>📚 Upload Notes</h2>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <div className="button-group">
            <button onClick={uploadPDF}>
              Summarize PDF
            </button>

            <button onClick={generateQuiz}>
              Generate Quiz
            </button>
          </div>
        </div>

        <div className="card">
          <h2>🤖 Ask AI</h2>

          <textarea
            rows="6"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <br />
          <br />

          <button onClick={sendMessage}>
            Ask AI
          </button>

          <div className="response-box">
            {reply}
          </div>
        </div>
      </div>

      <div className="card">
        <h2>📄 Summary</h2>
        <pre>{summary}</pre>
      </div>

      <div className="card">
        <h2>📝 Quiz</h2>
        <pre>{quiz}</pre>
      </div>

      <div className="card">
        <Kanban />
      </div>
    </div>
  );
}

export default App;