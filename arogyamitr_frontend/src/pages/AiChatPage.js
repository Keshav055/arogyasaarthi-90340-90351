import React, { useEffect, useRef, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * AiChatPage — AI assistant chatbot with real-time WebSocket UI.
 */
function AiChatPage() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I'm ArogyaMitr AI Health Assistant. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [wsStatus, setWsStatus] = useState("Connecting...");
  const wsRef = useRef(null);
  const chatEndRef = useRef(null);

  // WebSocket URL — use environment or fallback, API should route to "/ws/ai-chat"
  const WS_URL =
    (process.env.REACT_APP_WS_AI_URL || "ws://localhost:3001/ws/ai-chat");

  // Establish/reconnect WebSocket
  useEffect(() => {
    let cleanup = false;
    const ws = new window.WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setWsStatus("Online");
    };
    ws.onerror = () => {
      setWsStatus("Connection error");
    };
    ws.onclose = () => {
      setWsStatus("Disconnected");
      // Optionally: Add auto-reconnect logic here
    };
    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        setMessages((old) => [
          ...old,
          {
            sender: data.sender || "ai",
            text: data.text || ""
          }
        ]);
      } catch {
        // Fallback: plain text
        setMessages((old) => [
          ...old,
          { sender: "ai", text: msg.data }
        ]);
      }
    };
    return () => {
      cleanup = true;
      ws.close();
    };
  }, [WS_URL]);

  // Scroll to latest message
  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message via WebSocket
  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = input.trim();
    setMessages((old) => [...old, { sender: "user", text: msg }]);
    // Optimistically send
    if (
      wsRef.current &&
      wsRef.current.readyState === window.WebSocket.OPEN
    ) {
      wsRef.current.send(JSON.stringify({ text: msg }));
    }
    setInput("");
  }

  return (
    <div
      className="container"
      style={{
        margin: "2.5rem auto",
        maxWidth: 520,
        minHeight: "70vh",
        background: "var(--bg-secondary)",
        borderRadius: 16,
        padding: "1.8rem 0.7rem 0.9rem 0.7rem",
        boxShadow: "0 2px 12px rgba(30,50,80,0.09)"
      }}
    >
      <h2 style={{ textAlign: "center" }}>AI Health Assistant</h2>
      <div
        style={{
          background: "#FAFFFB",
          border: "1px solid var(--border-color)",
          borderRadius: 14,
          minHeight: 270,
          maxHeight: 350,
          overflowY: "auto",
          padding: "1rem",
          marginBottom: "1rem",
          fontSize: "1.08rem"
        }}
        aria-live="polite"
      >
        {messages.map((m, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: m.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: 9
            }}
          >
            <div
              style={{
                background: m.sender === "user"
                  ? "var(--button-bg)" : "#E9F8F6",
                color: m.sender === "user"
                  ? "var(--button-text)" : "#204322",
                borderRadius: "18px",
                padding: "0.75em 1.1em",
                maxWidth: 340,
                wordBreak: "break-word",
                alignSelf: "flex-end"
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div style={{ marginBottom: 12, color: "#38B3A7" }}>
        {wsStatus}
      </div>
      <form style={{ display: "flex", gap: 6 }} onSubmit={handleSend}>
        <input
          placeholder="Type your health question..."
          value={input}
          autoFocus
          required
          minLength={1}
          maxLength={500}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "12px",
            border: "1px solid var(--border-color)",
            fontSize: "1rem"
          }}
          onChange={(e) => setInput(e.target.value)}
          disabled={wsStatus !== "Online"}
        />
        <button
          type="submit"
          className="btn"
          style={{ borderRadius: 12, minWidth: 74 }}
          disabled={!input.trim() || wsStatus !== "Online"}
        >
          Send
        </button>
      </form>
      {/* Optional: Voice input (stub) */}
      <div style={{ marginTop: "0.9em", color: "var(--text-secondary)", fontSize: "0.96em" }}>
        Voice input coming soon.
      </div>
    </div>
  );
}

export default AiChatPage;
