import React from 'react';

export default function MessageBubble({ m }) {
  if (m.side === 'left') {
    return (
      <div className="message-row left">
        <div className="message-card">
          <div className="author">{m.author}</div>
          <div className="text">{m.text}</div>
          <div className="time">{m.time}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="message-row right">
      <div className="message-bubble">
        <div className="text">{m.text}</div>
        <div className="time">{m.time}</div>
      </div>
    </div>
  );
}