import React, { useEffect, useState, useRef } from "react";
import "./MessageHub.css";

// eslint-disable-next-line no-undef, no-restricted-properties
let sharedStorePromise = System.import("shared-store");

const MessageHub = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let sub;
    sharedStorePromise.then(({ store }) => {
      sub = store.state$.subscribe(state => {
        setMessages(state.messages);
      });
    });

    return () => {
      if (sub) sub.unsubscribe();  // cleanup khi unmount
    };
  }, []);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Gửi message xuống app con
  const sendMessage = () => {
    if (!input.trim()) return;
    const event = new CustomEvent("react-to-mf", {
      detail: { sender: "React", message: input },
    });
    window.dispatchEvent(event);
    setInput("");
  };

  console.log(messages);
  

  const handlerAddMessage = async () => {
    const { store } = await sharedStorePromise;
    store.setState({
      ...store.value,
      messages: [...store.value.messages, input]
    });
    setInput("");
  };

  return (
    <div className="message-hub">
      <h3>Message Center</h3>
      {/* <button onClick={() => handlerAddMessage()}>Add</button> */}

      <div className="message-list">
        {messages.length === 0 ? (
          <p className="empty">No messages yet...</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="message">{msg}</div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-box">
        <input
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handlerAddMessage}>Send to MFs</button>
      </div>
    </div>
  );
};

export default MessageHub;
