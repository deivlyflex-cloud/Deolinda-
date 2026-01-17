
import React from 'react';
import { Mail, MapPin, Instagram, Facebook, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-40 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div className="space-y-12">
          <div className="space-y-6">
            <span className="text-gold text-[10px] font-black uppercase tracking-[0.5em]">Premium Support</span>
            <h1 className="text-6xl md:text-8xl font-bold brand dark:text-white tracking-tighter leading-none">Canal de <br/> Atendimento</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-md">
              Processamos cada pedido individualmente para garantir uma experiência de luxo impecável.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {/* WhatsApp Card - Colorful */}
            <div className="p-10 bg-white dark:bg-midnight rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl hover:shadow-emerald-500/10 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform">
                <MessageCircle size={100} className="text-emerald-500" />
              </div>
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-[0_10px_30px_rgba(16,185,129,0.3)]">
                <MessageCircle size={32} />
              </div>
              <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-2 dark:text-white">WhatsApp Oficial</h3>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">929 704 642</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-4 font-bold flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-500"/> Verified Business Account
              </p>
            </div>

            <div className="p-8 bg-slate-100 dark:bg-midnight-light/30 rounded-[2.5rem] flex items-center gap-6 group">
              <div className="w-12 h-12 bg-midnight dark:bg-gold text-white dark:text-midnight rounded-full flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">E-mail Corporativo</p>
                <p className="text-lg font-bold dark:text-white">zara@online.ao</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 p-10 bg-midnight dark:bg-midnight-light rounded-[3rem] text-white">
            <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center shrink-0">
               <MapPin size={24} className="text-midnight" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gold mb-1">Logística Central</p>
              <p className="text-base font-light opacity-70">Operação Digital & Entrega Domiciliar Garantida</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-midnight p-12 lg:p-20 rounded-[4rem] shadow-2xl border border-slate-50 dark:border-slate-800 relative">
          <h2 className="text-4xl font-bold mb-16 brand dark:text-white tracking-tight">Presença Digital</h2>
          
          <div className="space-y-8">
            {/* Instagram - Colorful Gradient */}
            <a href="#" className="flex items-center justify-between group p-8 bg-slate-50 dark:bg-midnight-dark rounded-[2.5rem] hover:bg-white dark:hover:bg-midnight-light transition-all duration-500 border border-transparent hover:border-pink-500/20 shadow-sm hover:shadow-xl">
              <div className="flex items-center gap-8">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform">
                   <Instagram size={32} />
                </div>
                <div>
                   <p className="text-sm font-black uppercase tracking-[0.2em] dark:text-white">Instagram</p>
                   <p className="text-xs text-slate-400 font-medium">@zaraonline_style</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-slate-300 group-hover:text-pink-500 group-hover:translate-x-2 transition-all" />
            </a>

            {/* Facebook - Official Blue */}
            <a href="#" className="flex items-center justify-between group p-8 bg-slate-50 dark:bg-midnight-dark rounded-[2.5rem] hover:bg-white dark:hover:bg-midnight-light transition-all duration-500 border border-transparent hover:border-blue-500/20 shadow-sm hover:shadow-xl">
              <div className="flex items-center gap-8">
                <div className="w-16 h-16 rounded-3xl bg-[#1877F2] text-white flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform">
                   <Facebook size={32} />
                </div>
                <div>
                   <p className="text-sm font-black uppercase tracking-[0.2em] dark:text-white">Facebook</p>
                   <p className="text-xs text-slate-400 font-medium">Zara Online Oficial</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-2 transition-all" />
            </a>
          </div>
          
          <div className="mt-20 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] leading-relaxed max-w-xs mx-auto">
              Siga nossas redes para lançamentos antecipados e <span className="text-gold">vendas privadas</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
