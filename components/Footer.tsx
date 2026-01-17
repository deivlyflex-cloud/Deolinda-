
import React from 'react';
import { Instagram, Facebook, Mail, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-midnight text-white pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="space-y-8">
          <h3 className="text-3xl font-bold brand text-gold tracking-tighter">ZARA ONLINE</h3>
          <p className="text-slate-400 text-sm leading-relaxed font-light">
            Elegância contemporânea e curadoria premium. Redefinindo o luxo digital através de um atendimento humanizado e exclusivo.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-midnight transition-all"><Instagram size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-midnight transition-all"><Facebook size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-midnight transition-all"><Mail size={18} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="font-black mb-8 text-[10px] uppercase tracking-[0.3em] text-gold">Shop Collection</h4>
          <ul className="space-y-4 text-sm text-slate-400 font-medium">
            <li><a href="#/catalog" className="hover:text-white transition-colors">Novidades Verão 2026</a></li>
            <li><a href="#/catalog" className="hover:text-white transition-colors">Mais Vendidos</a></li>
            <li><a href="#/catalog" className="hover:text-white transition-colors">Artigos Masculinos</a></li>
            <li><a href="#/catalog" className="hover:text-white transition-colors">Essentials</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black mb-8 text-[10px] uppercase tracking-[0.3em] text-gold">Suporte Elite</h4>
          <ul className="space-y-4 text-sm text-slate-400 font-medium">
            <li><a href="#/contact" className="hover:text-white transition-colors">Private Concierge</a></li>
            <li><a href="#/about" className="hover:text-white transition-colors">Shipping Policy</a></li>
            <li><a href="#/about" className="hover:text-white transition-colors">Garantia Zara</a></li>
          </ul>
        </div>

        <div className="bg-midnight-light/30 p-8 rounded-[2rem] border border-white/5 space-y-4">
          <div className="flex items-center gap-3 text-gold">
            <ShieldCheck size={20} />
            <h4 className="font-black text-[10px] uppercase tracking-widest">Aviso Legal</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed italic font-light">
            Esta é uma vitrine premium. O processamento final e pagamento ocorrem exclusivamente via WhatsApp para sua total segurança e privacidade.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} ZARA ONLINE | LUXURY CONCIERGE.
        </p>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-600">
           <a href="#" className="hover:text-gold">Privacy</a>
           <a href="#" className="hover:text-gold">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
