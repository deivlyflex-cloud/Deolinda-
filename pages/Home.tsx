
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
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
    <div className="w-full bg-white dark:bg-zinc-950 transition-colors duration-700">
      {/* Hero Section Masterpiece */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover opacity-80 animate-slow-zoom grayscale-[20%] dark:grayscale-0"
            alt="Zara Editorial"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 dark:to-zinc-950"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl animate-in fade-in zoom-in-95 duration-1000">
          <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.6em] mb-6 opacity-80 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-white/50"></span>
            Heritage & Innovation
            <span className="w-8 h-px bg-white/50"></span>
          </p>
          <h1 className="text-6xl md:text-[9rem] font-bold mb-8 tracking-tighter brand leading-none drop-shadow-2xl">ZARA</h1>
          <p className="text-base md:text-lg font-light mb-12 tracking-[0.3em] uppercase opacity-90 max-w-xl mx-auto leading-relaxed">
            The Online Concierge for Modern Elegance
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/catalog" 
              className="group relative inline-flex items-center gap-4 bg-white text-black px-12 py-5 text-xs font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10">Explorar Coleção</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
           <div className="w-px h-16 bg-white"></div>
        </div>
      </section>

      {/* Featured Curated Selection */}
      <section className="max-w-7xl mx-auto py-32 px-6">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-6">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Curadoria Exclusiva</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter dark:text-white brand">Destaques da Estação</h2>
          </div>
          <Link to="/catalog" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-zinc-100 dark:border-zinc-800 pb-2 hover:border-black dark:hover:border-white transition-all dark:text-zinc-400 dark:hover:text-white">
            Ver Todos os Artigos <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-40">
            <Loader2 className="animate-spin text-zinc-200" size={60} />
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group block">
                <div className="relative overflow-hidden aspect-[3/4] mb-8 bg-zinc-50 dark:bg-zinc-900 shadow-sm transition-all duration-700 group-hover:shadow-2xl">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] dark:text-white flex items-center justify-center gap-2">
                      <Sparkles size={12}/> Discover Piece
                    </p>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{product.category}</p>
                <h3 className="text-xl font-bold mb-2 dark:text-white brand tracking-tight">{product.name}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 font-light text-sm">{formatCurrency(product.price)}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border-y border-zinc-100 dark:border-zinc-800">
             <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-300 dark:text-zinc-700">Nova Coleção em Breve</p>
          </div>
        )}
      </section>

      {/* Editorial Narrative Section */}
      <section className="relative bg-zinc-950 text-white py-40 px-6 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 hidden lg:block">
           <img src="https://images.unsplash.com/photo-1445205170230-053b830c6050?auto=format&fit=crop&w=1200" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2">
          <div className="max-w-xl space-y-12">
            <h2 className="text-5xl md:text-7xl font-bold leading-tight brand tracking-tighter">Sophistication is an attitude.</h2>
            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed tracking-wide">
              Na Zara Online, não vendemos apenas vestuário. Oferecemos uma curadoria de estilo que celebra a individualidade e o minimalismo premium. Cada peça é uma promessa de qualidade e design atemporal.
            </p>
            <div className="pt-6">
              <Link 
                to="/about" 
                className="inline-block border border-white/20 px-12 py-5 hover:bg-white hover:text-black hover:border-white transition-all duration-500 uppercase tracking-[0.3em] text-[10px] font-black"
              >
                Nossa Filosofia
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Club Zara */}
      <section className="max-w-3xl mx-auto py-40 px-6 text-center">
        <div className="space-y-4 mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Exclusividade por E-mail</p>
          <h3 className="text-4xl md:text-5xl font-bold dark:text-white brand tracking-tight">Privé Newsletter</h3>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto font-light leading-relaxed">
            Seja o primeiro a saber sobre novos lançamentos e coleções limitadas da Zara Online.
          </p>
        </div>
        <form className="flex flex-col sm:flex-row gap-6">
          <input 
            type="email" 
            placeholder="INSIRA SEU E-MAIL" 
            className="flex-grow border-b border-zinc-200 dark:border-zinc-800 py-5 outline-none focus:border-black dark:focus:border-white dark:bg-transparent dark:text-white transition-colors text-xs font-bold tracking-widest"
          />
          <button className="bg-black dark:bg-white text-white dark:text-black px-12 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-xl">Join the Club</button>
        </form>
      </section>

      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 30s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Home;
