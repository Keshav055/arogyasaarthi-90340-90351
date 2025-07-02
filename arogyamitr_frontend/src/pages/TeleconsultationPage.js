import React, { useEffect, useState, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * TeleconsultationPage — book/view teleconsults, join video, chat with doctor, WebSocket-stub.
 */
function TeleconsultationPage() {
  // Room (consult), simple messages; in real deploy user, doctor info/tokens required
  const [roomJoined, setRoomJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [msgInput, setMsgInput] = useState("");
  const [wsStatus, setWsStatus] = useState("Waiting...");
  const wsRef = useRef(null);
  const chatRef = useRef(null);

  const WS_URL =
    (process.env.REACT_APP_WS_TELECONSULT_URL ||
      "ws://localhost:3001/ws/teleconsult"); // Spec: backend should implement this

  // WebSocket room join/disconnect logic
  useEffect(() => {
    if (!roomJoined) return;
    const ws = new window.WebSocket(WS_URL);
    wsRef.current = ws;
    setWsStatus("Connecting...");
    ws.onopen = () => setWsStatus("Live (chat)");
    ws.onclose = () => setWsStatus("Offline");
    ws.onerror = () => setWsStatus("Connection error");
    ws.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        if (data?.type === "chat") {
          setMessages((old) => [...old, { sender: data.sender || "doctor", text: data.text }]);
        } // else ignore
      } catch {
        // fallback plain
        setMessages((old) => [...old, { sender: "doctor", text: evt.data }]);
      }
    };
    return () => {
      ws.close();
    };
    // eslint-disable-next-line
  }, [roomJoined]);

  // Scroll new msg into view
  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleJoin() {
    setRoomJoined(true);
    setMessages([
      {
        sender: "doctor",
        text:
          "You have joined the consultation room! (Your doctor will appear soon. Chat enabled.)"
      }
    ]);
  }
  function handleSendMsg(e) {
    e.preventDefault();
    if (!msgInput.trim() || !wsRef.current || wsRef.current.readyState !== 1)
      return;
    wsRef.current.send(
      JSON.stringify({ type: "chat", text: msgInput.trim() })
    );
    setMessages((old) => [...old, { sender: "you", text: msgInput.trim() }]);
    setMsgInput("");
  }
  // Video: WebRTC, stub with placeholder. Extend using PeerJS/Jitsi/Agora if needed.
  return (
    <div
      className="container"
      style={{
        margin: "2.5rem auto",
        maxWidth: 540,
        background: "var(--bg-secondary)",
        borderRadius: 18,
        padding: "1.5rem 0.7rem",
        boxShadow: "0 2px 12px rgba(60,80,140,0.10)"
      }}
    >
      <h2 style={{ textAlign: "center" }}>Teleconsultation</h2>
      {!roomJoined ? (
        <div style={{ maxWidth: 380, margin: "2.5rem auto", padding: "2.1rem 1.8rem", border: "1px solid var(--border-color)", borderRadius: 13 }}>
          <div style={{ fontSize: "1.12rem" }}>
            Book a live consultation with a health expert. You may chat and share health info securely.
          </div>
          <button className="btn btn-large" style={{ marginTop: 32, width: "100%" }} onClick={handleJoin}>
            Join Now
          </button>
        </div>
      ) : (
        <>
          <div style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            flexWrap: "wrap"
          }}>
            {/* Video area */}
            <div style={{ flex: "1 1 170px" }}>
              <div style={{
                border: "1px solid var(--border-color)",
                borderRadius: "13px",
                height: 170,
                marginBottom: 8,
                background: "#101010",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#ffc857"
              }}>
                <span>Video Call (Stub)</span>
              </div>
              <div style={{
                background: "#F1FFE2",
                color: "#222",
                borderRadius: "8px",
                padding: "0.6rem 0.9rem",
                fontSize: "0.98em"
              }}>
                Doctor: <b>Dr. Wellness (Stub)</b>
              </div>
            </div>
            {/* Chat area */}
            <div style={{ flex: "1 1 200px", minWidth: 220 }}>
              <div style={{
                border: "1px solid var(--border-color)",
                borderRadius: "13px",
                minHeight: 90,
                maxHeight: 160,
                background: "#F8FFF7",
                padding: "0.7em 0.8em",
                marginBottom: 8,
                overflowY: "auto"
              }}>
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      textAlign: m.sender === "you" ? "right" : "left",
                      margin: "0.5em 0"
                    }}
                  >
                    <span
                      style={{
                        background: m.sender === "you" ? "var(--button-bg)" : "#d9ffe2",
                        color: m.sender === "you" ? "var(--button-text)" : "#194720",
                        borderRadius: 12,
                        padding: "0.42em 0.9em",
                        display: "inline-block",
                        maxWidth: 180
                      }}
                    >
                      <b>{m.sender === "you" ? "You" : "Doctor"}:</b> {m.text}
                    </span>
                  </div>
                ))}
                <div ref={chatRef} />
              </div>
              <form style={{ display: "flex", gap: 6 }} onSubmit={handleSendMsg}>
                <input
                  value={msgInput}
                  onChange={e => setMsgInput(e.target.value)}
                  placeholder="Type message to doctor…"
                  required
                  disabled={wsStatus !== "Live (chat)"}
                  minLength={1}
                  maxLength={300}
                  style={{
                    flex: 1,
                    padding: 7,
                    borderRadius: "9px",
                    border: "1px solid var(--border-color)"
                  }}
                />
                <button
                  type="submit"
                  className="btn"
                  disabled={!msgInput.trim() || wsStatus !== "Live (chat)"}
                  style={{ borderRadius: 9, padding: "0 13px" }}
                >
                  Send
                </button>
              </form>
              <div style={{ marginTop: 4, color: "#38B3A7", fontSize: "0.97em" }}>
                {wsStatus}
              </div>
              <div style={{ color: "#aaa", fontSize: "0.97em", marginTop: 4 }}>
                (For demo: video is a placeholder. In prod, browser privacy pop-up will appear for video/audio auth.)
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TeleconsultationPage;
