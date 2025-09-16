import React from 'react';
import MessageBubble from './MessageBubble';
import SmartReplyBox from './SmartReplyBox';

export default function ChatWindow({ chat, inputValue, setInputValue, sendMessage, messagesEndRef, smartRepliesVisible, smartReplies, onChooseSmartReply }) {
  return (
    <main className="chat-area">
      {smartRepliesVisible && (
        <SmartReplyBox suggestions={smartReplies} onChoose={onChooseSmartReply} />
      )}

      <div className="messages">
        {chat.messages.map(m => <MessageBubble key={m.id} m={m} />)}
        <div ref={messagesEndRef} />
      </div>

      <div className="composer">
        <input
          placeholder="Type your message..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(inputValue); }}
        />
        <button className="send-btn" onClick={() => sendMessage(inputValue)}>➤</button>
      </div>
    </main>
  );
}