import React from 'react';

export default function SmartReplyBox({ suggestions, onChoose }) {
  return (
    <div className="smart-reply-box">
      <h4>Smart Reply Suggestions</h4>
      <div className="suggestions">
        {suggestions.map((s, i) => (
          <div key={i} className="suggestion" onClick={() => onChoose(s)}>{s}</div>
        ))}
      </div>
    </div>
  );
}