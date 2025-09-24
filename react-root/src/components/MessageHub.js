import React, { useEffect, useState } from "react";

const MessageHub = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Lắng nghe event từ app con
  useEffect(() => {
    const handler = (event) => {
      setMessages((prev) => [...prev, event.detail.message]); // event.detail chứa message
    };

    window.addEventListener("mfe-message", handler);

    return () => {
      window.removeEventListener("mfe-message", handler);
    };
  }, []);

  // Gửi message xuống app con
  const sendMessage = () => {
    if (!input.trim()) return;
    const event = new CustomEvent("react-to-mf", {
      detail: { sender: "React", message: input },
    });
    window.dispatchEvent(event);
    setInput("");
  };

  return (
    <div className="message-hub">
      <h3>Message Center</h3>

      <div className="message-list">
        {messages.length === 0 ? (
          <p className="empty">No messages yet...</p>
        ) : (
          messages.map((m, i) => (
            <div key={i} className="message">
              <strong>{m.sender}:</strong> {m.text}
            </div>
          ))
        )}
      </div>

      <div className="input-box">
        <input
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send to MFs</button>
      </div>
    </div>
  );
};

export default MessageHub;
