import { motion } from 'framer-motion';
import { Briefcase, Lock, Phone } from 'lucide-react';

export default function Login({ handleLogin, phoneInput, setPhoneInput, pinInput, setPinInput, loginError }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
      >
        <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg mb-6">
          <Briefcase className="text-white w-7 h-7" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Workspace Login</h1>
        <p className="text-slate-500 mb-8 font-medium">Enter your credentials to access your chats.</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <Phone className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
            <input 
              type="tel" required placeholder="Phone Number" 
              value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all font-medium"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
            <input 
              type="password" required placeholder="Secret PIN" 
              value={pinInput} onChange={(e) => setPinInput(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all font-medium"
            />
          </div>

          {loginError && <p className="text-red-500 text-sm font-semibold">{loginError}</p>}

          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 shadow-md transition-all active:scale-[0.98]">
            Continue to App
          </button>
        </form>
      </motion.div>
    </div>
  );
}