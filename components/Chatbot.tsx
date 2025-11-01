import React, { useState, useRef, useEffect } from 'react';
import { Language, Message } from '../types';
import { uiContent } from '../constants';
import ChatIcon from './icons/ChatIcon';
import CloseIcon from './icons/CloseIcon';
import SendIcon from './icons/SendIcon';
import LanguageSelector from './LanguageSelector';
import { getGeminiResponse } from '../services/geminiService';

interface ChatbotProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: uiContent.chatbotInitialMessage[language], isUser: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Reset initial message when language changes
  useEffect(() => {
    setMessages([{ text: uiContent.chatbotInitialMessage[language], isUser: false }]);
  }, [language]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { text: inputValue, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: '', isUser: false, isTyping: true }]);

    // Convert message history to format expected by geminiService
    const chatHistory = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));

    const responseText = await getGeminiResponse(inputValue, language, chatHistory);
    
    setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { text: responseText, isUser: false };
        return newMessages;
    });

    setIsLoading(false);
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={toggleChat}
          className="bg-red-600 text-white rounded-full p-4 shadow-lg hover:bg-red-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? <CloseIcon className="w-8 h-8" /> : <ChatIcon className="w-8 h-8" />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-gradient-to-br from-yellow-400 via-red-500 to-red-600 rounded-2xl shadow-2xl flex flex-col z-50 animate-slide-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-white/20 rounded-t-2xl border-b border-white/30">
            <h3 className="font-serif font-bold text-lg text-white drop-shadow">{uiContent.chatbotTitle[language]}</h3>
            <LanguageSelector language={language} onLanguageChange={setLanguage} />
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex flex-col space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-end max-w-xs ${
                    msg.isUser ? 'self-end' : 'self-start'
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      msg.isUser
                        ? 'bg-red-500 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {msg.isTyping ? (
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-1"></span>
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-2"></span>
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-3"></span>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-white/20 rounded-b-2xl border-t border-white/30">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={uiContent.chatbotPlaceholder[language]}
                className="flex-1 px-4 py-2 bg-white text-gray-800 placeholder-gray-600 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
              >
                <SendIcon className="w-5 h-5" />
              </button>
            </form>
          </div>
          <style>{`
            @keyframes slide-in {
              0% { transform: translateY(20px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
            .animate-slide-in {
              animation: slide-in 0.3s ease-out forwards;
            }
            @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
            .animate-bounce-1 { animation: bounce 1s infinite; animation-delay: 0s; }
            .animate-bounce-2 { animation: bounce 1s infinite; animation-delay: 0.2s; }
            .animate-bounce-3 { animation: bounce 1s infinite; animation-delay: 0.4s; }
          `}</style>
        </div>
      )}
    </>
  );
};

export default Chatbot;