
import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold brand">ZARA ONLINE</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Minimalismo premium e elegância contemporânea. Redefinindo o seu estilo com a curadoria exclusiva da Zara Online.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400"><Instagram size={20} /></a>
            <a href="#" className="hover:text-gray-400"><Facebook size={20} /></a>
            <a href="#" className="hover:text-gray-400"><Mail size={20} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Explorar</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="#/catalog" className="hover:text-white">Novidades</a></li>
            <li><a href="#/catalog" className="hover:text-white">Mais Vendidos</a></li>
            <li><a href="#/catalog" className="hover:text-white">Feminino</a></li>
            <li><a href="#/catalog" className="hover:text-white">Masculino</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Suporte</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="#/contact" className="hover:text-white">Fale Conosco</a></li>
            <li><a href="#/about" className="hover:text-white">Trocas e Devoluções</a></li>
            <li><a href="#/about" className="hover:text-white">Privacidade</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Aviso Legal</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Este site é uma plataforma demonstrativa de catálogo para a Zara Online. 
            <span className="text-white block mt-2">NÃO PROCESSAMOS PAGAMENTOS ONLINE.</span>
            Todas as compras são concluídas via WhatsApp. Pagamento e entrega são combinados diretamente com o vendedor após a confirmação do pedido.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Zara Online Store. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
