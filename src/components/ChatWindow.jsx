import { Send, Smile, Paperclip, Mic, ArrowLeft, Search, MoreVertical, CheckCheck } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

export default function ChatWindow({ 
  selectedUser, currentUser, messages, input, setInput, 
  sendMessage, showEmoji, setShowEmoji, onEmojiClick, messagesEndRef,
  setSelectedUser 
}) {
  
  if (!selectedUser) {
    return (
      <div className="hidden md:flex flex-1 bg-[#f0f2f5] flex-col items-center justify-center h-full border-b-[6px] border-[#25D366]">
        <div className="w-80 h-80 bg-[url('https://whatsapp-clone-web.netlify.app/static/media/chat-bg.a292d3f6.png')] opacity-10 bg-contain bg-no-repeat mb-4"></div>
        <h2 className="text-3xl font-light text-[#41525d]">WhatsApp Web Clone</h2>
        <p className="text-[#667781] mt-4 text-sm">Send and receive messages without keeping your phone online.</p>
      </div>
    );
  }

  const formatTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full relative">
      
      {/* WhatsApp Chat Header */}
      <div className="h-16 bg-[#f0f2f5] border-l border-gray-300 px-4 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="flex items-center">
          <button onClick={() => setSelectedUser(null)} className="md:hidden p-1 mr-2 text-[#54656f] hover:bg-gray-200 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 font-bold mr-4 shrink-0">
            {selectedUser.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-[16px] text-gray-900 leading-tight">{selectedUser.name}</h2>
            <p className="text-[13px] text-[#667781]">online</p>
          </div>
        </div>
        <div className="flex gap-4 text-[#54656f]">
          <Search className="w-5 h-5 cursor-pointer" />
          <MoreVertical className="w-5 h-5 cursor-pointer" />
        </div>
      </div>

      {/* WhatsApp Chat Background & Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-10 flex flex-col space-y-2 bg-[#efeae2] relative" 
           style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", backgroundSize: 'contain' }}>
        
        <div className="bg-[#ffeecd] text-[#54656f] text-xs px-3 py-1 rounded-lg self-center mb-4 shadow-sm text-center max-w-[90%]">
          🔒 Messages are end-to-end encrypted. No one outside of this chat can read them.
        </div>

        {messages.map((msg, index) => {
          const isMe = msg.senderId === currentUser.phone;
          return (
            <div key={index} className={`flex flex-col max-w-[85%] md:max-w-[65%] ${isMe ? 'self-end' : 'self-start'}`}>
              <div className={`px-2 pt-1.5 pb-1 rounded-lg shadow-sm relative flex flex-wrap items-end ${
                isMe ? 'bg-[#d9fdd3] rounded-tr-none' : 'bg-white rounded-tl-none'
              }`}>
                <p className="text-[14px] text-[#111b21] leading-snug break-words mr-12">{msg.text}</p>
                <div className="absolute right-2 bottom-1 flex items-center gap-1">
                  <span className="text-[10px] text-[#667781] leading-none">{formatTime(msg.createdAt)}</span>
                  {isMe && <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />} {/* Blue Ticks */}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Emoji Picker Popup */}
      {showEmoji && (
        <div className="absolute bottom-16 left-2 z-50 shadow-2xl">
          <EmojiPicker onEmojiClick={onEmojiClick} theme="light" width={300} height={400} />
        </div>
      )}

      {/* WhatsApp Input Footer */}
      <div className="bg-[#f0f2f5] px-4 py-3 flex items-center gap-3 shrink-0 min-h-[62px]">
        <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="text-[#54656f] hover:text-gray-700 transition-colors">
          <Smile className="w-6 h-6 md:w-7 md:h-7" />
        </button>
        <button type="button" className="text-[#54656f] hover:text-gray-700 transition-colors hidden md:block">
          <Paperclip className="w-6 h-6" />
        </button>
        
        <form onSubmit={sendMessage} className="flex-1 flex items-center">
          <input
            type="text" value={input} onChange={(e) => setInput(e.target.value)} onFocus={() => setShowEmoji(false)}
            placeholder="Type a message"
            className="w-full bg-white px-4 py-2.5 rounded-lg outline-none text-[#111b21] text-[15px] placeholder-[#667781]"
          />
          <button type="submit" className="hidden"></button> {/* Hidden submit to allow 'Enter' key */}
        </form>

        {input.trim() ? (
          <button onClick={sendMessage} className="text-[#54656f] hover:text-gray-700 transition-colors p-1">
            <Send className="w-6 h-6" />
          </button>
        ) : (
          <button type="button" className="text-[#54656f] hover:text-gray-700 transition-colors p-1">
            <Mic className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        )}
      </div>

    </div>
  );
}