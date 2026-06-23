import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", text: "Hi! Ask me about prices, offers, or your spending. 🤖" },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, loading]);

  const sendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed || loading) return;

    setChatHistory(prev => [...prev, { sender: "user", text: trimmed }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const data = await res.json();
      setChatHistory(prev => [
        ...prev,
        { sender: "bot", text: data.response || "Sorry, I didn't get that." },
      ]);
    } catch (err) {
      console.error("Chatbot error:", err.message);
      setChatHistory(prev => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Couldn't reach the assistant. Please make sure the chatbot server is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbox">
      <h3>🤖 Smart Shopping Helper</h3>

      <div className="chat-messages">
        {chatHistory.map((entry, idx) => (
          <div
            key={idx}
            className={`chat-bubble ${entry.sender === "user" ? "user-bubble" : "bot-bubble"}`}
          >
            {entry.text}
          </div>
        ))}
        {loading && (
          <div className="chat-bubble bot-bubble typing-indicator">
            Typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-row">
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about prices, offers, or spending"
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !message.trim()}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
