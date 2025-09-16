import React from 'react';

export default function Header({ title, participants, onSummarize, onSmartReply, onOpenNewChat }) {
  return (
    <header className="topbar">
      <div className="left">
        <div className="team">
          <div className="avatar">👥</div>
          <div>
            <div className="team-name">{title}</div>
            <div className="team-sub">{participants} participants</div>
          </div>
        </div>
      </div>

      <div className="right">
        <button className="btn outline" onClick={onSummarize}>Summarize</button>
        <button className="btn primary" onClick={onSmartReply}>Smart Reply</button>
        <button className="btn ghost" onClick={onOpenNewChat}>New</button>
      </div>
    </header>
  );
}