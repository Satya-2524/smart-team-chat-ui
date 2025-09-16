import React from 'react';

export default function NewChatModal({ newChatName, setNewChatName, icebreaker, generateIcebreaker, createChat, close }) {
  return (
    <div className="modal-overlay" onClick={close}>
      <div className="new-chat-card" onClick={e => e.stopPropagation()}>
        <div className="card-header">
          <div className="card-icon">💬</div>
          <h3>Create New Chat</h3>
          <p>Start a conversation with your team members</p>
        </div>

        <label>Participant Name</label>
        <input value={newChatName} onChange={e => setNewChatName(e.target.value)} placeholder="Enter participant name..." />

        <button className="generate-btn" onClick={() => generateIcebreaker(newChatName || 'there')}>
          ✨ Generate Icebreaker
        </button>

        {icebreaker && (
          <div className="icebreaker-box">
            <div className="icebreaker-title">AI Icebreaker Suggestion</div>
            <div className="icebreaker-text">{icebreaker}</div>
            <div className="icebreaker-actions">
              <button onClick={() => createChat(icebreaker)}>Use This Message</button>
              <button className="ghost" onClick={() => generateIcebreaker(newChatName || 'there')}>Generate Another</button>
            </div>
          </div>
        )}

        <button className="start-chat-cta" onClick={() => createChat()}>Start Chat</button>
      </div>
    </div>
  );
}