import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Study Assistant</h1>

      <textarea
        rows="5"
        cols="50"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br /><br />

      <button onClick={sendMessage}>
        Ask AI
      </button>

      <h3>Response:</h3>
      <p>{reply}</p>
    </div>
  );
}

export default App;