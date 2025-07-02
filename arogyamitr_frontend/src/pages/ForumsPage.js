import React, { useState, useEffect, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * ForumsPage — real-time peer support chat/forums using WebSocket. (One group room for demo)
 */
function ForumsPage() {
  const [messages, setMessages] = useState([
    {
      sender: "mod",
      text: "Welcome! This is the ArogyaMitr Support Forum. Be respectful, share wellness tips, and help one another."
    }
  ]);
  const [input, setInput] = useState("");
  const [wsStatus, setWsStatus] = useState("Connecting…");
  const wsRef = useRef(null);
  const chatEndRef = useRef(null);

  const username =
    localStorage.getItem("forum_username") ||
    "user" + Math.floor(Math.random() * 9000 + 1000);

  useEffect(() => {
    localStorage.setItem("forum_username", username);
  }, [username]);

  const WS_URL =
    process.env.REACT_APP_WS_FORUMS_URL ||
    "ws://localhost:3001/ws/forum-chat"; // Backend should provide a /ws/forum-chat

  // Connect WebSocket
  useEffect(() => {
    const ws = new window.WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => setWsStatus("Connected");
    ws.onclose = () => setWsStatus("Disconnected");
    ws.onerror = () => setWsStatus("Error");
    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        setMessages((old) => [
          ...old,
          {
            sender: data.sender || "user",
            text: data.text || ""
          }
        ]);
      } catch {
        setMessages((old) => [
          ...old,
          { sender: "user", text: msg.data }
        ]);
      }
    };
    return () => {
      ws.close();
    };
  }, [WS_URL]);

  // Scroll to latest message
  useEffect(() => {
    if (chatEndRef.current)
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || !(wsRef.current && wsRef.current.readyState === 1))
      return;
    const msgObj = { sender: username, text: input.trim() };
    wsRef.current.send(JSON.stringify(msgObj));
    setMessages((old) => [...old, msgObj]);
    setInput("");
  }

  return (
    <div
      className="container"
      style={{
        margin: "2.5rem auto",
        maxWidth: 620,
        minHeight: "68vh",
        background: "var(--bg-secondary)",
        borderRadius: 18,
        padding: "1.7rem 0.7rem 1.1rem 0.7rem",
        boxShadow: "0 2px 14px rgba(60,80,120,0.10)"
      }}
    >
      <h2 style={{ textAlign: "center" }}>Forums & Peer Groups</h2>
      <div style={{ fontSize: "1.06em", color: "#555", marginBottom: 9, textAlign: "center" }}>
        Join public peer support group chats, share local health events, and discuss healthy living.
      </div>
      <div
        style={{
          background: "#fafafa",
          border: "1px solid var(--border-color)",
          borderRadius: 13,
          minHeight: 264,
          maxHeight: 358,
          overflowY: "auto",
          padding: "0.75em 0.7em",
          marginBottom: 13
        }}
        aria-live="polite"
      >
        {messages.map((m, idx) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <span
              style={{
                fontWeight:
                  m.sender === username
                    ? "bold"
                    : m.sender === "mod"
                    ? "600"
                    : "normal",
                color:
                  m.sender === username
                    ? "var(--button-bg)"
                    : m.sender === "mod"
                    ? "#E87A41"
                    : "#207761",
                marginRight: 8
              }}
            >
              {m.sender === "mod"
                ? "Moderator"
                : m.sender === username
                ? "You"
                : m.sender}
              {":"}
            </span>
            <span style={{ color: "#222" }}>{m.text}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSend} style={{ display: "flex", gap: 7 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message the group…"
          required
          minLength={1}
          maxLength={380}
          disabled={wsStatus !== "Connected"}
          style={{
            flex: 1,
            padding: 9,
            borderRadius: 10,
            border: "1px solid var(--border-color)",
            fontSize: "1rem"
          }}
        />
        <button
          type="submit"
          className="btn"
          style={{ borderRadius: 10, minWidth: 72 }}
          disabled={!input.trim() || wsStatus !== "Connected"}
        >
          Send
        </button>
      </form>
      <div style={{ marginTop: 6, color: "#38B3A7", fontSize: "0.99em" }}>
        {wsStatus}
      </div>
      <div
        style={{
          color: "#999",
          fontSize: "0.96em",
          marginTop: 7,
          textAlign: "center"
        }}
      >
        Note: This demo room is public. Private peer chats & moderation coming soon.
      </div>
    </div>
  );
}

export default ForumsPage;
