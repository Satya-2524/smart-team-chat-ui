import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import ChatList from "./components/chatList";
import ChatWindow from './components/ChatWindow';
import NewChatModal from './components/NewChatModal';

// Utility
function timeNow() {
  const d = new Date();
  let hours = d.getHours();
  const mins = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${mins} ${ampm}`;
}

// Icebreaker templates
const ICEBREAKER_TEMPLATES = [
  (name) => `Hi ${name}! Quick question — what's one tool or trick that's boosted your productivity recently?`,
  (name) => `Hey ${name}, what's one small win you had this week? 🎉`,
  (name) => `Hi ${name}! If you could change one thing about our workflow, what would it be?`,
  (name) => `Hello ${name}, what part of this project are you most excited to work on?`,
  (name) => `Hey ${name} — what's one learning goal you'd like to hit in the next month?`,
];

// Smart replies
function generateSmartReplies() {
  return [
    "Fantastic! When should we kick off the next phase?",
    "Great teamwork everyone! Let's celebrate this win 🎉",
    "I'll prepare the project timeline for the next meeting."
  ];
}

// Initial chats
const INITIAL_CHATS = [
  {
    id: 'a1',
    name: 'Project Alpha Team',
    participants: 5,
    messages: [
      { id: 'm1', author: 'Sarah', text: 'Hey everyone! The client meeting went really well.', time: '2:11 PM', side: 'left' },
      { id: 'm2', author: 'Mike', text: "That's awesome! What was their feedback?", time: '2:20 PM', side: 'left' },
      { id: 'm3', author: 'Sarah', text: 'Great work on the presentation!', time: '2:30 PM', side: 'left' },
      { id: 'm4', author: 'You', text: 'They loved the new design concepts and want to move forward with the project.', time: '2:35 PM', side: 'right' },
    ]
  },
  {
    id: 'b1',
    name: 'Manish',
    participants: 2,
    messages: [
      { id: 'm5', author: 'You', text: "Hi there! I hope you're having a great week. Excited for the collaboration! ✨", time: 'Now', side: 'right' }
    ]
  }
];

export default function App() {
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [currentChatId, setCurrentChatId] = useState(chats[0].id);
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [icebreaker, setIcebreaker] = useState('');
  const [smartRepliesVisible, setSmartRepliesVisible] = useState(false);
  const [smartReplies, setSmartReplies] = useState(generateSmartReplies());
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentChatId, chats]);

  const currentChat = chats.find(c => c.id === currentChatId);

  function sendMessage(text) {
    if (!text.trim()) return;
    const newMsg = {
      id: 'm' + Math.random().toString(36).substring(2,9),
      author: 'You',
      text,
      time: timeNow(),
      side: 'right'
    };
    setChats(prev => prev.map(c => 
      c.id === currentChatId 
        ? { ...c, messages: [...c.messages, newMsg] } 
        : c
    ));
    setInputValue('');
    setSmartRepliesVisible(false);
  }

  function summarizeConversation() {
    const last = currentChat.messages
      .slice(-3)
      .map(m => `${m.author}: ${m.text}`)
      .join('\n\n');
    alert('Conversation summary:\n\n' + last);
  }

  function generateIcebreakerFor(name) {
    const idx = Math.floor(Math.random() * ICEBREAKER_TEMPLATES.length);
    setIcebreaker(ICEBREAKER_TEMPLATES[idx](name || 'there'));
  }

  function createChatAndUseIcebreaker(msg = '') {
    const id = 'chat_' + Date.now();
    const newChat = { id, name: newChatName || 'New Chat', participants: 2, messages: [] };
    setChats(prev => [newChat, ...prev]);
    setShowNewChat(false);
    setCurrentChatId(id);
    if (msg) {
      setChats(prev => prev.map(c => 
        c.id === id 
          ? { 
              ...c, 
              messages: [{ 
                id: 'm' + Math.random().toString(36).substring(2,9), 
                author: 'You', 
                text: msg, 
                time: timeNow(), 
                side: 'right' 
              }] 
            } 
          : c
      ));
    }
  }

  return (
    <div className="app-root">
      <Header
        title={currentChat.name}
        participants={currentChat.participants}
        onSummarize={summarizeConversation}
        onSmartReply={() => setSmartRepliesVisible(s => !s)}
        onOpenNewChat={() => setShowNewChat(true)}
      />

      <div className="container">
        <ChatList 
          chats={chats} 
          currentChatId={currentChatId} 
          onSelect={setCurrentChatId} 
          onNewChat={() => setShowNewChat(true)} 
        />
        <ChatWindow
          chat={currentChat}
          inputValue={inputValue}
          setInputValue={setInputValue}
          sendMessage={sendMessage}
          messagesEndRef={messagesEndRef}
          smartRepliesVisible={smartRepliesVisible}
          smartReplies={smartReplies}
          onChooseSmartReply={(s) => setInputValue(s)}
        />
      </div>

      {showNewChat && (
        <NewChatModal
          newChatName={newChatName}
          setNewChatName={setNewChatName}
          icebreaker={icebreaker}
          generateIcebreaker={generateIcebreakerFor}
          createChat={createChatAndUseIcebreaker}
          close={() => setShowNewChat(false)}
        />
      )}
    </div>
  );
}
