
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-12 brand text-center">Nossa História</h1>
      
      <div className="space-y-12 text-lg leading-relaxed text-gray-700 font-light">
        <p>
          Fundada sob a premissa de que a moda deve ser atemporal, a <span className="font-bold text-black">Zara Online</span> nasceu da busca pelo minimalismo perfeito e pela acessibilidade moderna. 
          Localizada no coração da moda contemporânea, nossa curadoria foca em peças que transcendem estações.
        </p>

        <img 
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80" 
          alt="Showroom Zara" 
          className="w-full h-[400px] object-cover grayscale brightness-75 shadow-2xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-black mb-4 brand">Missão</h2>
            <p className="text-sm">Oferecer vestuário de alta qualidade com um processo de compra humanizado e direto, garantindo que cada cliente da Zara Online receba uma peça que conte uma história.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black mb-4 brand">Visão</h2>
            <p className="text-sm">Ser a referência nacional em curadoria de moda minimalista premium acessível, redefinindo o estilo através da simplicidade digital.</p>
          </div>
        </div>

        <p>
          Diferente das grandes lojas de departamento, na Zara Online, cada pedido é tratado individualmente. 
          Escolhemos o WhatsApp como nosso canal principal para garantir que o atendimento, o pagamento e o agendamento da entrega sejam feitos de forma segura e pessoal.
        </p>
      </div>
    </div>
  );
};

export default About;
