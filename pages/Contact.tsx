
import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-5xl font-bold mb-8 brand">Contato</h1>
          <p className="text-gray-500 mb-12 text-lg">Dúvidas sobre tamanhos, tecidos ou entregas? Nossa equipe está pronta para te atender na Zara Online.</p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="bg-black p-4 text-white"><Phone size={24} /></div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-widest mb-1">WhatsApp de Vendas</h3>
                <p className="text-gray-600">929 704 642</p>
                <p className="text-xs text-gray-400 mt-1">Atendimento personalizado via chat</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-black p-4 text-white"><Mail size={24} /></div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-widest mb-1">E-mail</h3>
                <p className="text-gray-600">contato@zaraonline.demo</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-black p-4 text-white"><MapPin size={24} /></div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-widest mb-1">Operação</h3>
                <p className="text-gray-600">Centro Logístico Zara Online</p>
                <p className="text-gray-600">Atendimento 100% Digital</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-8 brand">Siga a Zara Online</h2>
          <div className="space-y-6">
            <a href="#" className="flex items-center gap-4 hover:translate-x-2 transition-transform">
              <Instagram size={24} />
              <span className="text-lg font-light">@zaraonline_style</span>
            </a>
            <a href="#" className="flex items-center gap-4 hover:translate-x-2 transition-transform">
              <Facebook size={24} />
              <span className="text-lg font-light">facebook.com/zaraonline</span>
            </a>
          </div>
          
          <div className="mt-16 border-t border-gray-200 pt-8">
            <p className="text-xs text-gray-500 uppercase tracking-tighter leading-relaxed">
              *Atendimento via WhatsApp (929 704 642) é o único canal para processamento de pedidos e confirmação de pagamento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
