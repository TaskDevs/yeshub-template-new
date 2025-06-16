import React from 'react';
import { Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatToggleButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/dashboard-candidate/support-center')}
      className="fixed bottom-10 right-4 bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full shadow-lg z-50 animate-pulse hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center justify-center"
    >
      <Bot size={24} />
    </button>
  );
};

export default ChatToggleButton;
