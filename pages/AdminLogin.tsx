
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, Loader2, Shield, ArrowRight } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      if (email === 'deolindainacio15@icloud.com' && password === 'zaraonline2026') {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin/dashboard');
      } else {
        alert('Dados incorretos para acesso restrito.');
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-midnight-dark px-6">
      <div className="max-w-md w-full bg-white dark:bg-midnight p-10 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in duration-700">
        <div className="flex justify-center mb-10">
          <div className="w-20 h-20 bg-midnight dark:bg-gold text-gold dark:text-midnight rounded-3xl flex items-center justify-center shadow-2xl">
            <Shield size={32} />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2 brand dark:text-white tracking-tighter">Área de Gestão</h1>
        <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12">
          Acesso Restrito Zara Online
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Credencial Administrativa</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 dark:bg-midnight-light/50 dark:text-white p-5 rounded-2xl outline-none border border-slate-100 dark:border-slate-700 focus:ring-2 ring-gold/20 transition-all text-sm font-bold"
              placeholder="e-mail de acesso"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Palavra-passe</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 dark:bg-midnight-light/50 dark:text-white p-5 rounded-2xl outline-none border border-slate-100 dark:border-slate-700 focus:ring-2 ring-gold/20 transition-all text-sm font-bold"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-midnight dark:bg-gold text-white dark:text-midnight py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-4"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : (
              <><span>Entrar no Painel</span> <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
           <Link to="/" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-gold transition-colors">
              Voltar para a Loja
           </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
