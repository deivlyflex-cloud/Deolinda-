
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { Loader2, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils/format';

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const categories = ['Todos', 'Masculino', 'Feminino', 'Acessórios', 'Infantil'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true);
      
      if (error) throw error;
      setProducts(data || []);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 dark:text-white brand">Nossa Coleção</h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-light italic">
            {loading ? 'Preparando vitrine...' : `${filteredProducts.length} peças exclusivas disponíveis`}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all border ${activeCategory === cat ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' : 'bg-transparent text-zinc-500 border-zinc-200 hover:border-black dark:text-zinc-400 dark:border-zinc-800 dark:hover:border-white dark:hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-40">
          <Loader2 className="animate-spin text-zinc-300" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group">
              <div className="aspect-[3/4] mb-6 overflow-hidden bg-zinc-100 dark:bg-zinc-800 rounded shadow-sm">
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />
              </div>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-bold tracking-[0.2em] mb-1">{product.category}</p>
              <h3 className="text-lg font-bold mb-1 dark:text-white brand">{product.name}</h3>
              <p className="text-zinc-900 dark:text-zinc-200 font-light">{formatCurrency(product.price)}</p>
            </Link>
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-20 text-zinc-500 uppercase tracking-widest text-sm">
              Nenhuma peça encontrada nesta seção.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Catalog;
