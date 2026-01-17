
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, KeyRound, Loader2 } from 'lucide-react';

type LoginView = 'login' | 'forgot' | 'verify';

const AdminLogin: React.FC = () => {
  const [view, setView] = useState<LoginView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulação de login com as novas credenciais solicitadas
    setTimeout(() => {
      if (email === 'deolindainacio15@icloud.com' && password === 'zaraonline2026') {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin/dashboard');
      } else {
        alert('Credenciais inválidas. Tente novamente.');
      }
      setLoading(false);
    }, 1000);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de envio de código
    setTimeout(() => {
      setView('verify');
      setLoading(false);
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de verificação
    setTimeout(() => {
      alert('Código verificado! Em uma implementação real, você seria redirecionado para alterar a senha.');
      setView('login');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-6 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-10 shadow-2xl border border-zinc-100 dark:border-zinc-800">
        <div className="flex justify-center mb-8">
          <div className="bg-black dark:bg-white text-white dark:text-black p-4 rounded-full">
            {view === 'login' ? <Lock size={32} /> : view === 'forgot' ? <Mail size={32} /> : <KeyRound size={32} />}
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2 brand dark:text-white">Zara Admin</h1>
        <p className="text-center text-zinc-500 dark:text-zinc-400 text-sm mb-8 uppercase tracking-widest font-medium">
          {view === 'login' ? 'Acesso Restrito' : view === 'forgot' ? 'Recuperar Senha' : 'Verificar Código'}
        </p>

        {view === 'login' && (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">E-mail</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white p-4 focus:border-black dark:focus:border-white outline-none transition-all font-light"
                placeholder="Ex: deolinda@exemplo.com"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Senha</label>
                <button 
                  type="button" 
                  onClick={() => setView('forgot')}
                  className="text-[10px] font-bold uppercase tracking-tighter text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white p-4 focus:border-black dark:focus:border-white outline-none transition-all font-light"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Entrar no Painel'}
            </button>
          </form>
        )}

        {view === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center leading-relaxed">
              Insira seu e-mail administrativo para receber um código de acesso temporário.
            </p>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">E-mail de Recuperação</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white p-4 focus:border-black dark:focus:border-white outline-none transition-all font-light"
                placeholder="deolindainacio15@icloud.com"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Enviar Código'}
            </button>
            <button 
              type="button"
              onClick={() => setView('login')}
              className="w-full flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={14} /> Voltar para Login
            </button>
          </form>
        )}

        {view === 'verify' && (
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center leading-relaxed">
              Enviamos um código para <span className="font-bold text-black dark:text-white">{email}</span>. Digite-o abaixo:
            </p>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">Código de 6 dígitos</label>
              <input 
                required
                type="text" 
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                className="w-full border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white p-4 text-center text-2xl tracking-[0.5em] focus:border-black dark:focus:border-white outline-none transition-all font-bold"
                placeholder="000000"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Confirmar Código'}
            </button>
            <button 
              type="button"
              onClick={() => setView('forgot')}
              className="w-full text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Não recebeu? Reenviar código
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
