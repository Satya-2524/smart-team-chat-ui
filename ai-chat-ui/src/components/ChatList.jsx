import React from "react";

export default function Chatlist({ chats, currentChatId, onSelect, onNewChat }) {
  return (
    <aside className="left-panel">
      <div className="new-chat-btn" onClick={onNewChat}>
        ＋ Start New Chat
      </div>
      <div className="chat-list">
        {chats.map((c) => (
          <div
            key={c.id}
            className={`chat-list-item ${c.id === currentChatId ? "active" : ""}`}
            onClick={() => onSelect(c.id)}
          >
            <div className="chat-name">{c.name}</div>
            <div className="chat-participants">
              {c.participants} participants
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
