import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUser, setTypingUser] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on("user_list", (userList) => {
      setUsers(userList);
    });

    socket.on("typing", (username) => {
      setTypingUser(username);
    });

    socket.on("stop_typing", () => {
      setTypingUser("");
    });
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const joinChat = () => {
    if (username !== "") {
      socket.emit("join", username);
      setIsJoined(true);
    }
  };

  const sendMessage = () => {
    if (message !== "") {
      const time = new Date().toLocaleTimeString();

      const msgData = {
        user: username,
        text: message,
        time: time,
      };

      socket.emit("send_message", msgData);
      setMessage("");
      socket.emit("stop_typing");
    }
  };

  // 🔥 BACK FUNCTION
  const goBack = () => {
    setIsJoined(false);
    setChat([]);
    setUsers([]);
  };

  // 🎨 LOGIN UI (Stylish)
  if (!isJoined) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <h2>💬 Welcome to Chat</h2>

          <input
            placeholder="Enter your name..."
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "10px",
              marginTop: "10px",
              width: "200px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <br />

          <button
            onClick={joinChat}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              background: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Enter Chat
          </button>
        </div>
      </div>
    );
  }

  // 💬 CHAT UI
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        borderRadius: "15px",
        boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        padding: "20px",
        background: "#f9fafc",
        fontFamily: "Arial",
      }}
    >
      {/* 🔥 HEADER with BACK BUTTON */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#4CAF50",
          color: "#fff",
          padding: "10px 15px",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* 🔙 BACK BUTTON */}
          <div
            onClick={goBack}
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              background: "#fff",
              color: "#4CAF50",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ←
          </div>

          <h3>Chat Room</h3>
        </div>

        <div>👤 {username}</div>
      </div>

      {/* Online users */}
      <div style={{ marginBottom: "10px" }}>
        Online: {users.join(", ")}
      </div>

      {/* Typing */}
      {typingUser && (
        <p style={{ fontStyle: "italic", color: "gray" }}>
          {typingUser} is typing...
        </p>
      )}

      {/* Chat box */}
      <div
        style={{
          height: "300px",
          overflowY: "auto",
          background: "#fff",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        {chat.map((msg, index) => {
          if (typeof msg === "object") {
            const isMe = msg.user === username;

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: isMe ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    background: isMe ? "#4CAF50" : "#e4e6eb",
                    color: isMe ? "#fff" : "#000",
                    padding: "10px",
                    borderRadius: "10px",
                    maxWidth: "70%",
                  }}
                >
                  <b>{msg.user}</b>
                  <br />
                  {msg.text}
                  <br />
                  <small>{msg.time}</small>
                </div>
              </div>
            );
          }

          return (
            <div key={index} style={{ textAlign: "center", color: "gray" }}>
              {msg}
            </div>
          );
        })}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <div style={{ display: "flex", marginTop: "10px", gap: "10px" }}>
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            socket.emit("typing", username);

            setTimeout(() => {
              socket.emit("stop_typing");
            }, 1000);
          }}
          placeholder="Type message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;