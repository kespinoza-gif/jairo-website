"use client";

import { useEffect, useRef, useState } from "react";
import { HANDOFF_MESSAGE } from "@/lib/support";

const GREETING = {
  role: "assistant",
  content: "Hi! 👋 I'm the Gabo en Asia assistant. Ask me about our classes, plans, the watch shop, orders or shipping.",
};

const SUGGESTIONS = ["How do I join the free class?", "How much is VIP?", "How much is shipping?", "Talk to a person"];

export default function ChatWidget() {
  const [isOpen, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [isSending, setSending] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isSending]);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  async function send(text) {
    const question = text.trim();
    if (!question || isSending) return;

    const history = [...messages, { role: "user", content: question }];
    setMessages(history);
    setInput("");

    if (question === "Talk to a person") {
      setMessages([...history, { role: "assistant", content: HANDOFF_MESSAGE }]);
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The greeting is UI-only, so it isn't sent
        body: JSON.stringify({ messages: history.slice(1) }),
      });
      const data = await res.json();
      setMessages([...history, { role: "assistant", content: data.reply || HANDOFF_MESSAGE }]);
    } catch {
      setMessages([...history, { role: "assistant", content: `Sorry, I couldn't connect just now. ${HANDOFF_MESSAGE}` }]);
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    send(input);
  }

  return (
    <div className="chat-widget">
      {isOpen && (
        <section className="chat-panel" aria-label="Customer support chat">
          <header className="chat-header">
            <div>
              <strong>Gabo en Asia Support</strong>
              <span>Usually answers instantly</span>
            </div>
            <button type="button" className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </header>

          <div className="chat-messages" ref={listRef} aria-live="polite">
            {messages.map((m, i) => (
              <p key={i} className={`chat-bubble chat-${m.role}`}>
                {m.content}
              </p>
            ))}
            {isSending && <p className="chat-bubble chat-assistant chat-typing">Typing…</p>}
          </div>

          {messages.length === 1 && (
            <div className="chat-suggestions">
              {SUGGESTIONS.map((s) => (
                <button type="button" key={s} onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              maxLength={1000}
              aria-label="Your question"
            />
            <button type="submit" disabled={!input.trim() || isSending}>
              Send
            </button>
          </form>
          <button type="button" className="chat-human" onClick={() => send("Talk to a person")}>
            Need more help? Talk to a person
          </button>
        </section>
      )}

      <button
        type="button"
        className="chat-launcher"
        onClick={() => setOpen((open) => !open)}
        aria-label={isOpen ? "Close support chat" : "Open support chat"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          "✕"
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
