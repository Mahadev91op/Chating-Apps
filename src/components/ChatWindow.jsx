// ArrowLeft add kiya gaya hai
import { Send, Smile, Info, ArrowLeft } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

export default function ChatWindow({ 
  selectedUser, currentUser, messages, input, setInput, 
  sendMessage, showEmoji, setShowEmoji, onEmojiClick, messagesEndRef,
  setSelectedUser // Yeh prop add kiya hai back aane ke liye
}) {
  
  if (!selectedUser) {
    return (
      <div className="hidden md:flex flex-1 bg-slate-50 flex-col items-center justify-center h-full w-full">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-4">
          <Info className="text-indigo-400 w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-700">No Chat Selected</h2>
        <p className="text-slate-500 mt-2 font-medium">Select a user to start messaging.</p>
      </div>
    );
  }

  const formatTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full bg-slate-50 relative">
      {/* Chat Header with Mobile Back Button */}
      <div className="h-16 md:h-20 bg-white border-b border-slate-200 px-2 md:px-6 flex items-center shadow-sm z-10 shrink-0">
        
        {/* Back Button (Sirf Mobile par dikhega) */}
        <button 
          onClick={() => setSelectedUser(null)} 
          className="md:hidden p-2 mr-2 text-slate-500 hover:bg-slate-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold mr-3 shadow-md shrink-0">
          {selectedUser.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-[16px] md:text-lg font-bold text-slate-900 leading-tight">{selectedUser.name}</h2>
          <p className="text-[11px] md:text-xs text-indigo-600 font-semibold">{selectedUser.phone}</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col space-y-4">
        {messages.length === 0 ? (
          <div className="m-auto text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-[80%] md:max-w-sm">
            <p className="text-slate-800 font-bold text-base md:text-lg mb-1">Start a conversation</p>
            <p className="text-slate-500 text-xs md:text-sm">Say hello to {selectedUser.name}! 👋</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.senderId === currentUser.phone;
            return (
              <div key={index} className={`flex flex-col max-w-[85%] md:max-w-[70%] ${isMe ? 'self-end items-end' : 'self-start items-start'}`}>
                <div className={`p-3 md:p-3.5 rounded-2xl shadow-sm border ${
                  isMe 
                    ? 'bg-indigo-600 text-white rounded-br-none border-indigo-700' 
                    : 'bg-white text-slate-800 rounded-bl-none border-slate-200'
                }`}>
                  <p className="text-[14px] md:text-[15px] leading-relaxed break-words">{msg.text}</p>
                </div>
                <span className="text-[9px] md:text-[10px] text-slate-400 mt-1 px-1 font-semibold">{formatTime(msg.createdAt)}</span>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Emoji Picker */}
      {showEmoji && (
        <div className="absolute bottom-20 left-2 md:left-6 z-50 shadow-2xl rounded-2xl border border-slate-200 max-h-[300px] overflow-hidden">
          <EmojiPicker onEmojiClick={onEmojiClick} theme="light" width={300} height={300} />
        </div>
      )}

      {/* Input Area */}
      <div className="p-2 md:p-4 bg-white border-t border-slate-200 shrink-0">
        <form onSubmit={sendMessage} className="flex gap-2 md:gap-3 items-center w-full max-w-4xl mx-auto">
          <button 
            type="button" onClick={() => setShowEmoji(!showEmoji)}
            className="p-2.5 md:p-3 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-colors shrink-0"
          >
            <Smile className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <input
            type="text" value={input} onChange={(e) => setInput(e.target.value)} onFocus={() => setShowEmoji(false)}
            placeholder="Message..."
            className="flex-1 bg-slate-50 border border-slate-200 p-3 rounded-2xl md:rounded-xl outline-none text-slate-900 text-[15px] placeholder-slate-400 focus:border-indigo-400 focus:bg-white transition-colors min-w-0"
          />
          <button 
            type="submit" disabled={!input.trim()}
            className="bg-indigo-600 text-white p-3 md:p-3.5 rounded-full md:rounded-xl hover:bg-indigo-700 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center justify-center"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5 ml-0.5 md:ml-0" />
          </button>
        </form>
      </div>
    </div>
  );
}