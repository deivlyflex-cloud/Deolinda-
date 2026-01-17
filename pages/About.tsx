
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-5xl font-bold mb-12 brand text-center dark:text-white tracking-tighter">Nossa História</h1>
      
      <div className="space-y-12 text-lg leading-relaxed text-slate-600 dark:text-slate-400 font-light">
        <p>
          Fundada sob a premissa de que a moda deve ser atemporal, a <span className="font-bold text-midnight dark:text-white">Zara Online</span> nasceu da busca pelo minimalismo perfeito e pela acessibilidade moderna. 
          Localizada no coração da moda contemporânea, nossa curadoria foca em peças que transcendem estações.
        </p>

        <img 
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80" 
          alt="Showroom Zara" 
          className="w-full h-[300px] object-cover rounded-[3rem] shadow-2xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-8 bg-white dark:bg-midnight rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-bold text-midnight dark:text-gold mb-4 brand">Missão</h2>
            <p className="text-sm">Oferecer vestuário de alta qualidade com um processo de compra humanizado e direto, garantindo que cada cliente receba uma peça que conte uma história.</p>
          </div>
          <div className="p-8 bg-white dark:bg-midnight rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-bold text-midnight dark:text-gold mb-4 brand">Visão</h2>
            <p className="text-sm">Ser a referência em curadoria de moda minimalista premium, redefinindo o estilo através da simplicidade digital e atendimento exclusivo.</p>
          </div>
        </div>

        <div className="p-10 bg-midnight text-white rounded-[3rem] space-y-4">
          <h3 className="text-xl font-bold text-gold brand">Logística & Entrega</h3>
          <p className="text-sm opacity-80 leading-loose">
            Diferente das grandes lojas de departamento, na Zara Online, cada pedido é tratado individualmente. 
            Operamos exclusivamente através de um sistema de <span className="text-gold font-bold">entrega direta agendada</span>. 
            Escolhemos o WhatsApp como nosso canal principal para garantir que o atendimento, o pagamento e o agendamento da entrega sejam feitos de forma segura e pessoal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
