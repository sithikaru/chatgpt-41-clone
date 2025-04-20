// app/chat/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageRenderer } from '../components/MessageRenderer';

type Role = 'user' | 'assistant' | 'system';
interface Message { role: Role; content: string; }

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm GPT-4.1, how can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;
    const newMessages: Message[] = [...messages, { role: 'user' as Role, content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([
        ...newMessages,
        { role: 'assistant' as Role, content: res.ok ? data.reply : `Error: ${data.error}` }
      ]);
    } catch {
      setMessages([...newMessages, { role: 'assistant' as Role, content: 'Network error.' }]);
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-black">
      {/* Header */}
      <div className="p-4 bg-white shadow flex justify-between items-center">
        <div className="font-bold text-lg">GPT-4.1 Chat</div>
        <div className="text-xs bg-gray-200 px-2 py-1 rounded">Personal Use</div>
      </div>

      {/* Messages */}
      <div className="flex-2 overflow-y-auto px-2 py-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex mb-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={` px-4 py-2 rounded-lg shadow text-sm whitespace-pre-line ${
                msg.role === 'assistant'
                  ? 'bg-white text-gray-900 w-full lg:w-3/4 '
                  : 'bg-blue-600 text-white'
              }`}
            >
              <MessageRenderer content={msg.content} />
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start mb-2">
            <div className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow text-sm animate-pulse">
              Typing...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form className="p-4 bg-white border-t flex items-center" onSubmit={sendMessage}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          disabled={loading}
          className="flex-1 border rounded-lg px-4 py-2 mr-2 outline-none text-black"
          placeholder="Type your message…"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
