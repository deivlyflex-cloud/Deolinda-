
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Truck, ShieldCheck, ArrowLeft, MessageCircle, Loader2, AlertCircle } from 'lucide-react';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { formatCurrency } from '../utils/format';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    quantity: 1
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) throw new Error("Produto não encontrado.");
      setProduct(data);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setSending(true);
    const total = product!.price * formData.quantity;

    try {
      // 1. Registrar o Pedido no Banco
      const { error: orderError } = await supabase.from('orders').insert({
        customer_name: formData.name,
        phone: formData.phone,
        address: formData.address,
        product: product!.name,
        quantity: formData.quantity,
        total_price: total,
        status: 'pending'
      });
      if (orderError) console.error('Erro no registro do pedido:', orderError.message);

      // 2. Registrar o Clique (Métrica)
      const { error: clickError } = await supabase.from('clicks').insert({
        product_id: product!.id,
        type: 'whatsapp'
      });
      if (clickError) console.error('Erro no registro de métrica:', clickError.message);

      // 3. Redirecionar
      const link = generateWhatsAppLink(
        product!.name,
        formData.quantity,
        total,
        formData.name,
        formData.phone,
        formData.address
      );
      window.open(link, '_blank');
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-40 flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-gray-400 mb-4" size={40} />
        <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Carregando detalhes...</p>
      </div>
    );
  }

  if (errorMsg || !product) {
    return (
      <div className="pt-40 px-6 text-center dark:text-white min-h-screen flex flex-col items-center justify-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Ops! Algo deu errado</h2>
        <p className="text-gray-500 mb-8 max-w-md">{errorMsg || "Produto não encontrado."}</p>
        <button onClick={() => navigate('/catalog')} className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 uppercase text-xs font-bold tracking-widest">Voltar ao Catálogo</button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm uppercase tracking-widest mb-10 hover:text-gray-500 dark:text-zinc-400 dark:hover:text-white transition-colors">
        <ArrowLeft size={16} /> Voltar
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-4">
          <div className="bg-zinc-100 dark:bg-zinc-800 aspect-[3/4] overflow-hidden rounded-lg">
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2 font-bold">{product.category}</p>
            <h1 className="text-4xl font-bold mb-4 dark:text-white brand tracking-tight">{product.name}</h1>
            <p className="text-3xl font-light dark:text-zinc-200">{formatCurrency(product.price)}</p>
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm whitespace-pre-line font-light">
            {product.description}
          </p>

          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-8">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 dark:text-white">Finalizar Pedido via WhatsApp</h3>
            <form onSubmit={handleBuy} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-2">Seu Nome</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border-b border-zinc-200 dark:border-zinc-700 dark:bg-transparent dark:text-white py-3 focus:border-black dark:focus:border-white outline-none transition-all" placeholder="Nome Completo" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-2">WhatsApp</label>
                  <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border-b border-zinc-200 dark:border-zinc-700 dark:bg-transparent dark:text-white py-3 focus:border-black dark:focus:border-white outline-none transition-all" placeholder="9xx xxx xxx" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-2">Qtd</label>
                  <input type="number" min="1" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})} className="w-full border-b border-zinc-200 dark:border-zinc-700 dark:bg-transparent dark:text-white py-3 focus:border-black dark:focus:border-white outline-none transition-all" />
                </div>
              </div>
              <button type="submit" disabled={sending} className="w-full bg-black dark:bg-white text-white dark:text-black py-5 flex items-center justify-center gap-3 uppercase font-bold tracking-[0.2em] text-xs hover:opacity-80 transition-all disabled:opacity-50 shadow-xl">
                {sending ? <Loader2 className="animate-spin" size={20} /> : <><MessageCircle size={20} /> Comprar no WhatsApp</>}
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-tighter text-zinc-500">
              <Truck size={18} className="text-black dark:text-white" />
              <span>Entrega Agendada</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-tighter text-zinc-500">
              <ShieldCheck size={18} className="text-black dark:text-white" />
              <span>Garantia Zara</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
