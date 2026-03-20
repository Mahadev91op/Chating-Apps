"use client";
import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  // Abhi ke liye manually user set kar rahe hain, baad mein aap login add kar sakte hain
  const [user, setUser] = useState('Me'); 

  useEffect(() => {
    // Purane messages load karein
    axios.get('/api/messages').then((res) => setMessages(res.data));

    // Pusher setup for real-time
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe('chat-room');
    channel.bind('new-message', function (data) {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      pusher.unsubscribe('chat-room');
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input) return;

    const messageData = { sender: user, text: input };
    setInput(''); // Input box clear karein

    await axios.post('/api/messages', messageData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        
        {/* User Selection (Aap 'Me' ya 'GF' select kar sakte hain test karne ke liye) */}
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Our Private Chat ❤️</h1>
          <select 
            value={user} 
            onChange={(e) => setUser(e.target.value)} 
            className="border p-1 rounded"
          >
            <option value="Me">Me</option>
            <option value="GF">GF</option>
          </select>
        </div>

        {/* Chat Box */}
        <div className="h-80 overflow-y-auto mb-4 p-2 border rounded bg-gray-50 flex flex-col space-y-2">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`p-2 rounded-lg max-w-[70%] ${msg.sender === user ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}
            >
              <p className="text-xs text-gray-200 mb-1">{msg.sender}</p>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border p-2 rounded outline-none"
            placeholder="Type a message..."
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Send
          </button>
        </form>

      </div>
    </div>
  );
}