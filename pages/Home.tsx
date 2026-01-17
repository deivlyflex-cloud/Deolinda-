
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, Sparkles, ShoppingBag, Globe, Zap, Truck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { formatCurrency } from '../utils/format';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .limit(4);
      setFeaturedProducts(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-midnight-dark transition-colors duration-500 overflow-x-hidden pb-20">
      {/* Hero Mobile Impactante */}
      <section className="relative h-[90vh] w-full flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=90" 
            className="w-full h-full object-cover brightness-[0.6] dark:brightness-[0.4]"
            alt="Zara Editorial"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full px-6 pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-gold"></div>
            <span className="text-gold text-[10px] font-black uppercase tracking-[0.4em]">Coleção 2026</span>
          </div>
          
          <h1 className="text-7xl font-bold leading-[0.85] tracking-tighter brand text-white">
            ZARA <br/> <span className="text-gold italic font-light">ONLINE</span>
          </h1>
          
          <p className="text-white/70 text-lg font-light leading-snug max-w-[280px]">
            Luxo minimalista e curadoria exclusiva ao alcance de um clique.
          </p>
          
          <Link 
            to="/catalog" 
            className="group relative flex items-center justify-between bg-gold text-midnight w-full px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_15px_40px_rgba(197,160,89,0.4)]"
          >
            <span>Ver Catálogo Completo</span>
            <ShoppingBag size={20} />
          </Link>
        </div>
      </section>

      {/* Grid de Destaques Mobile */}
      <section className="py-20 px-6">
        <div className="flex flex-col gap-2 mb-12">
          <span className="text-gold text-[10px] font-black uppercase tracking-[0.5em]">Vitrine Premium</span>
          <h2 className="text-4xl font-bold dark:text-white brand">Peças Icónicas</h2>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-gold" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group block">
                <div className="relative aspect-[4/5] mb-6 bg-midnight-light overflow-hidden rounded-[2rem] shadow-xl">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
                    <Sparkles size={16} className="text-gold" />
                  </div>
                </div>
                <div className="flex justify-between items-start px-2">
                  <div className="space-y-1">
                    <p className="text-gold text-[9px] font-black uppercase tracking-widest">{product.category}</p>
                    <h3 className="text-2xl font-bold dark:text-white brand tracking-tight">{product.name}</h3>
                  </div>
                  <p className="text-midnight dark:text-gold font-bold text-lg">{formatCurrency(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <Link 
          to="/catalog" 
          className="mt-16 flex items-center justify-center gap-4 py-8 border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest dark:text-white rounded-2xl"
        >
          Explorar Tudo <ArrowRight size={16} className="text-gold" />
        </Link>
      </section>

      {/* Manifesto Mobile - Ajustado para disponibilidade de entrega */}
      <section className="bg-midnight text-white py-24 px-8 text-center rounded-t-[3rem]">
        <Truck size={32} className="text-gold mx-auto mb-8 animate-bounce" />
        <h3 className="text-4xl font-bold brand leading-tight mb-6">Entrega Rápida & <br/> Estilo Eterno</h3>
        <p className="text-slate-400 font-light text-base leading-relaxed mb-10">
          Processamos o seu pedido via WhatsApp para garantir que o atendimento seja tão exclusivo quanto as nossas peças.
        </p>
        <div className="flex items-center justify-center gap-4 text-gold border border-gold/20 py-4 px-6 rounded-full inline-flex">
          <Zap size={14} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Apenas disponível para entrega</span>
        </div>
      </section>
    </div>
  );
};

export default Home;
