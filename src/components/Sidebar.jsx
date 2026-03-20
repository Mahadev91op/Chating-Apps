import { Users, LogOut } from 'lucide-react';

export default function Sidebar({ users, currentUser, selectedUser, setSelectedUser, handleLogout }) {
  const contacts = users.filter(u => u.phone !== currentUser?.phone);

  return (
    // width full aur h-full kar diya hai
    <div className="w-full h-full bg-white border-r border-slate-200 flex flex-col">
      <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <Users className="text-indigo-600 w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">{currentUser?.name}</h2>
            <p className="text-xs text-slate-500 font-medium">Online</p>
          </div>
        </div>
        <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-1 md:space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 md:mb-4 px-3 mt-2">Chats</h3>
        
        {contacts.length === 0 ? (
          <p className="text-slate-500 text-sm px-3">No other users found.</p>
        ) : (
          contacts.map((user) => (
            <div 
              key={user.phone}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 p-3 md:p-4 rounded-2xl cursor-pointer transition-all ${
                selectedUser?.phone === user.phone ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-slate-50 border border-transparent'
              }`}
            >
              <div className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-lg md:text-base shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 border-b border-slate-100 pb-2 md:border-none md:pb-0">
                <h4 className={`text-[15px] md:text-sm font-semibold ${selectedUser?.phone === user.phone ? 'text-indigo-700' : 'text-slate-800'}`}>
                  {user.name}
                </h4>
                <p className="text-sm md:text-xs text-slate-500 truncate">Tap to open chat</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}