
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Trash2, Edit, Package, ShoppingCart, LogOut, 
  Loader2, RefreshCcw, X, 
  BarChart3, Image as ImageIcon, CheckCircle2, LayoutGrid
} from 'lucide-react';
import { Product, Order } from '../types';
import { supabase } from '../lib/supabase';
import { formatCurrency } from '../utils/format';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'stats' | 'products' | 'orders'>('stats');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin');
    } else {
      loadData();
    }
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: pData } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      setProducts(pData || []);
      const { data: oData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      setOrders(oData || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    revenue: orders.filter(o => o.status === 'paid' || o.status === 'completed').reduce((acc, curr) => acc + curr.total_price, 0),
    count: orders.length,
    pending: orders.filter(o => o.status === 'pending').length
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-midnight-dark pb-32 transition-colors duration-500">
      {/* Header Mobile Fixo - Visual Limpo */}
      <header className="sticky top-0 z-40 bg-white dark:bg-midnight border-b dark:border-slate-800 p-6 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-xl font-bold brand dark:text-white tracking-tight">Zara Admin</h1>
          <p className="text-[9px] font-black text-gold uppercase tracking-widest">Controlo de Boutique</p>
        </div>
        <button 
          onClick={loadData} 
          className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center dark:text-gold active:scale-90 transition-transform"
        >
          <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </header>

      <main className="p-5 space-y-10">
        {/* Aba: Resumo / Stats */}
        {activeTab === 'stats' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold dark:text-white brand">Visão Geral</h2>
            
            <div className="p-8 bg-midnight text-white rounded-[2.5rem] shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-gold mb-2">Total em Vendas</p>
                <h3 className="text-4xl font-bold tracking-tighter">{formatCurrency(stats.revenue)}</h3>
              </div>
              <BarChart3 className="absolute -right-4 -bottom-4 opacity-10 w-28 h-28" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white dark:bg-midnight rounded-[2rem] border dark:border-slate-800 shadow-sm">
                <ShoppingCart className="text-gold mb-3" size={20} />
                <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Pedidos Totais</p>
                <h4 className="text-2xl font-bold dark:text-white">{stats.count}</h4>
              </div>
              <div className="p-6 bg-white dark:bg-midnight rounded-[2rem] border dark:border-slate-800 shadow-sm">
                <LayoutGrid className="text-amber-500 mb-3" size={20} />
                <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Por Validar</p>
                <h4 className="text-2xl font-bold text-amber-500">{stats.pending}</h4>
              </div>
            </div>
            
            <div className="space-y-4">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Actividade Recente</h3>
               {orders.slice(0, 3).map(order => (
                 <div key={order.id} className="p-5 bg-white dark:bg-midnight rounded-3xl border dark:border-slate-800 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gold">
                        {order.customer_name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold dark:text-white">{order.customer_name}</p>
                        <p className="text-[9px] text-slate-400 uppercase tracking-widest">{order.product}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gold">{formatCurrency(order.total_price)}</span>
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* Aba: Inventário - Ajustada para visibilidade de todos os botões */}
        {activeTab === 'products' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-2xl font-bold dark:text-white brand">Stock Disponível</h2>
              <button 
                onClick={() => setShowAddModal(true)} 
                className="bg-gold text-midnight px-6 py-3 rounded-full flex items-center gap-2 font-black text-[10px] uppercase tracking-widest shadow-lg"
              >
                <Plus size={16} /> Novo
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {products.map(p => (
                <div key={p.id} className="bg-white dark:bg-midnight rounded-[2rem] border dark:border-slate-800 overflow-hidden shadow-md">
                   <div className="flex p-4 gap-4">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-inner">
                        <img src={p.image_url} className="w-full h-full object-cover"/>
                      </div>
                      <div className="flex-grow flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-bold text-base dark:text-white truncate">{p.name}</h4>
                          <p className="text-[11px] text-gold font-bold uppercase">{formatCurrency(p.price)}</p>
                          <p className="text-[9px] text-slate-400 uppercase tracking-tighter mt-1">{p.category}</p>
                        </div>
                        <div className="flex gap-3 mt-4">
                           <button className="flex-grow flex items-center justify-center gap-2 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-[9px] font-black uppercase tracking-widest dark:text-white active:bg-slate-200">
                             <Edit size={14} className="text-gold"/> Editar
                           </button>
                           <button className="px-5 py-3 bg-red-500/10 text-red-500 rounded-xl active:bg-red-500/20">
                             <Trash2 size={16}/>
                           </button>
                        </div>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Aba: Pedidos - Organização sem confusão */}
        {activeTab === 'orders' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold dark:text-white brand">Ficheiro de Vendas</h2>
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order.id} className="bg-white dark:bg-midnight p-6 rounded-[2.5rem] border dark:border-slate-800 space-y-6 shadow-sm">
                   <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Identificação do Cliente</p>
                        <h4 className="font-bold text-lg dark:text-white">{order.customer_name}</h4>
                        <p className="text-xs text-slate-400">{order.phone}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest ${order.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                        {order.status === 'pending' ? 'Pendente' : 'Concluído'}
                      </div>
                   </div>

                   <div className="p-5 bg-slate-50 dark:bg-midnight-light/20 rounded-2xl border dark:border-slate-700/50">
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-[10px] font-black uppercase text-gold">Item do Pedido</p>
                        <p className="text-[10px] font-black text-slate-400">Qtd: {order.quantity}</p>
                      </div>
                      <p className="text-sm font-bold dark:text-slate-200 mb-1">{order.product}</p>
                      <p className="text-[10px] text-slate-500 italic leading-relaxed">{order.address}</p>
                   </div>

                   <div className="flex flex-col gap-3">
                      <button className="w-full py-5 bg-midnight dark:bg-gold text-white dark:text-midnight rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-transform">
                        <CheckCircle2 size={18} /> Confirmar Pagamento
                      </button>
                      <button className="w-full py-4 text-red-500 text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                        <Trash2 size={14}/> Cancelar Pedido
                      </button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Navegação Inferior "App-Style" */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-midnight border-t dark:border-slate-800 flex justify-around items-center h-24 px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setActiveTab('stats')}
          className={`flex flex-col items-center gap-2 flex-1 transition-all ${activeTab === 'stats' ? 'text-gold' : 'text-slate-400'}`}
        >
          <BarChart3 size={22} className={activeTab === 'stats' ? 'scale-125' : ''} />
          <span className="text-[8px] font-black uppercase tracking-widest">Resumo</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('products')}
          className={`flex flex-col items-center gap-2 flex-1 transition-all ${activeTab === 'products' ? 'text-gold' : 'text-slate-400'}`}
        >
          <Package size={22} className={activeTab === 'products' ? 'scale-125' : ''} />
          <span className="text-[8px] font-black uppercase tracking-widest">Stock</span>
        </button>

        <button 
          onClick={() => setActiveTab('orders')}
          className={`flex flex-col items-center gap-2 flex-1 transition-all ${activeTab === 'orders' ? 'text-gold' : 'text-slate-400'}`}
        >
          <ShoppingCart size={22} className={activeTab === 'orders' ? 'scale-125' : ''} />
          <span className="text-[8px] font-black uppercase tracking-widest">Vendas</span>
        </button>

        <button 
          onClick={() => { localStorage.removeItem('isAdmin'); navigate('/admin'); }}
          className="flex flex-col items-center gap-2 flex-1 text-red-400"
        >
          <LogOut size={22} />
          <span className="text-[8px] font-black uppercase tracking-widest">Sair</span>
        </button>
      </nav>

      {/* Modal Nova Entrada: Organizado para Mobile */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] bg-midnight/95 flex flex-col animate-in fade-in duration-300">
          <div className="p-6 flex justify-between items-center text-white">
            <h2 className="text-xl font-bold brand">Nova Peça</h2>
            <button onClick={() => setShowAddModal(false)} className="p-2"><X size={28}/></button>
          </div>
          
          <div className="flex-grow bg-white dark:bg-midnight-dark rounded-t-[3rem] p-8 overflow-y-auto">
            <form className="space-y-8 pb-10">
               <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-[2rem] border-2 border-dashed dark:border-slate-800 flex flex-col items-center justify-center text-slate-400 active:bg-slate-200 transition-colors">
                  <ImageIcon size={32} className="mb-2 text-gold" />
                  <p className="text-[9px] font-black uppercase tracking-widest">Carregar Imagem</p>
               </div>
               
               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Designação</label>
                    <input type="text" className="w-full p-5 bg-slate-50 dark:bg-midnight dark:text-white rounded-2xl outline-none border dark:border-slate-800 focus:border-gold transition-colors" placeholder="Ex: Vestido Floral Silk" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Preço de Venda (Kz)</label>
                    <input type="number" className="w-full p-5 bg-slate-50 dark:bg-midnight dark:text-white rounded-2xl outline-none border dark:border-slate-800 focus:border-gold transition-colors" placeholder="0.00" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Categoria</label>
                    <select className="w-full p-5 bg-slate-50 dark:bg-midnight dark:text-white rounded-2xl outline-none border dark:border-slate-800 focus:border-gold transition-colors appearance-none">
                      <option>Feminino</option>
                      <option>Masculino</option>
                      <option>Acessórios</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Descrição Editorial</label>
                    <textarea className="w-full p-5 bg-slate-50 dark:bg-midnight dark:text-white rounded-2xl outline-none border dark:border-slate-800 focus:border-gold transition-colors h-32" placeholder="Descreva os materiais e o corte da peça..." />
                  </div>
               </div>

               <button type="button" className="w-full py-6 bg-gold text-midnight font-black uppercase text-[11px] tracking-widest rounded-2xl shadow-2xl active:scale-95 transition-all">
                 Publicar na Boutique
               </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
