import { Users, LogOut, Search, MoreVertical, MessageSquare } from 'lucide-react';

export default function Sidebar({ users, currentUser, selectedUser, setSelectedUser, handleLogout }) {
  const contacts = users.filter(u => u.phone !== currentUser?.phone);

  return (
    <div className="w-full h-full bg-white border-r border-gray-200 flex flex-col">
      
      {/* WhatsApp Style Header */}
      <div className="p-3 md:p-4 flex justify-between items-center bg-[#f0f2f5] shrink-0 h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg overflow-hidden">
            {currentUser?.name.charAt(0)}
          </div>
        </div>
        <div className="flex gap-4 text-[#54656f]">
          <Users className="w-6 h-6 cursor-pointer" />
          <MessageSquare className="w-5 h-5 cursor-pointer" />
          <button onClick={handleLogout} title="Logout">
            <LogOut className="w-5 h-5 hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>

      {/* WhatsApp Search Bar */}
      <div className="p-2 border-b border-gray-200 bg-white">
        <div className="bg-[#f0f2f5] flex items-center gap-4 px-4 py-1.5 rounded-lg">
          <Search className="w-4 h-4 text-[#54656f]" />
          <input 
            type="text" 
            placeholder="Search or start new chat" 
            className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto bg-white">
        {contacts.length === 0 ? (
          <p className="text-[#54656f] text-sm p-4 text-center mt-4">No contacts found.</p>
        ) : (
          contacts.map((user) => (
            <div 
              key={user.phone}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-all ${
                selectedUser?.phone === user.phone ? 'bg-[#f0f2f5]' : 'hover:bg-[#f5f6f6]'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-lg shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 border-b border-gray-100 pb-3 pt-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-[17px] text-gray-900">{user.name}</h4>
                  <span className="text-xs text-gray-400">Yesterday</span>
                </div>
                <p className="text-sm text-[#54656f] truncate">Tap to view chat</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}