"use client";
import { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';

// Components import kar rahe hain
import Login from '@/components/Login';
import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';

export default function Home() {
  // Auth & User States
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Login Form States
  const [phoneInput, setPhoneInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Chat States
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef(null);

  // 1. Check if user is logged in (Local Storage)
  useEffect(() => {
    const storedUser = localStorage.getItem('messenger_user');
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
  }, []);

  // 2. Fetch Users List for Sidebar
  useEffect(() => {
    if (currentUser) {
      axios.get('/api/users')
        .then((res) => setUsers(res.data))
        .catch(console.error);
    }
  }, [currentUser]);

  // 3. Fetch Messages & Setup Pusher real-time connection
  useEffect(() => {
    if (!currentUser || !selectedUser) return;

    // Purane messages laao
    axios.post('/api/messages', { 
      action: "fetch", 
      senderId: currentUser.phone, 
      receiverId: selectedUser.phone 
    }).then((res) => {
      setMessages(res.data);
      scrollToBottom();
    });

    // Pusher setup
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    // Unique room name banayein (taaki messages sirf in dono ke paas jayein)
    const channelName = `chat-${[currentUser.phone, selectedUser.phone].sort().join('-')}`;
    const channel = pusher.subscribe(channelName);
    
    channel.bind('new-message', function (data) {
      setMessages((prev) => [...prev, data]);
      scrollToBottom();
    });

    return () => pusher.unsubscribe(channelName);
  }, [currentUser, selectedUser]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  // Login Function
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await axios.post('/api/auth', { phone: phoneInput, name: "User", pin: pinInput });
      localStorage.setItem('messenger_user', JSON.stringify(res.data));
      setCurrentUser(res.data);
    } catch (error) {
      setLoginError(error.response?.data?.error || "Login Failed");
    }
  };

  // Logout Function
  const handleLogout = () => {
    if(window.confirm("Log out of workspace?")) {
      localStorage.removeItem('messenger_user');
      setCurrentUser(null);
      setSelectedUser(null);
      setPhoneInput('');
      setPinInput('');
    }
  };

  // Send Message Function
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedUser) return;

    const messageData = { senderId: currentUser.phone, receiverId: selectedUser.phone, text: input };
    setInput('');
    setShowEmoji(false);
    
    try {
      await axios.post('/api/messages', messageData);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Emoji Click Handler
  const onEmojiClick = (emojiObject) => setInput((prev) => prev + emojiObject.emoji);

  // Agar user logged in nahi hai, toh Login page dikhao
  if (!currentUser) {
    return <Login {...{handleLogin, phoneInput, setPhoneInput, pinInput, setPinInput, loginError}} />;
  }

  // Agar user logged in hai, toh Main App Layout dikhao (Mobile Responsive)
  return (
    <div className="flex h-[100dvh] overflow-hidden bg-slate-50 font-sans w-full max-w-[100vw]">
      
      {/* Sidebar Component */}
      <div className={`w-full md:w-80 h-full flex-shrink-0 ${selectedUser ? 'hidden md:block' : 'block'}`}>
        <Sidebar {...{users, currentUser, selectedUser, setSelectedUser, handleLogout}} />
      </div>

      {/* ChatWindow Component */}
      <div className={`flex-1 h-full w-full ${!selectedUser ? 'hidden md:flex' : 'flex'}`}>
        <ChatWindow {...{
          selectedUser, currentUser, messages, input, setInput, 
          sendMessage, showEmoji, setShowEmoji, onEmojiClick, 
          messagesEndRef, setSelectedUser
        }} />
      </div>

    </div>
  );
}