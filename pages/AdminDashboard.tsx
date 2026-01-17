
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Trash2, Edit, Package, ShoppingCart, LogOut, CheckCircle, Clock, 
  Loader2, RefreshCcw, X, UserCircle, Settings,
  TrendingUp, Wallet, MousePointer2, BarChart3, Image as ImageIcon,
  AlertTriangle, ArrowUpRight, MessageCircle, Eye
} from 'lucide-react';
import { Product, Order } from '../types';
import { supabase } from '../lib/supabase';
import { formatCurrency } from '../utils/format';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'stats' | 'products' | 'orders' | 'settings'>('stats');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [clicks, setClicks] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Feminino',
    image_url: '',
    active: true
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin');
    } else {
      loadData();
    }
  }, [navigate, activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: pData } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      setProducts(pData || []);

      const { data: oData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      setOrders(oData || []);

      const { count } = await supabase.from('clicks').select('*', { count: 'exact', head: true });
      setClicks(count || 0);
    } catch (error: any) {
      console.error('Erro no dashboard:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `products/${fileName}`;
    const { error: uploadError } = await supabase.storage.from('product-images').upload(filePath, file);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalImageUrl = newProduct.image_url;
      if (imageFile) {
        setUploading(true);
        finalImageUrl = await uploadImage(imageFile);
      }
      const { error } = await supabase.from('products').insert({
        ...newProduct,
        image_url: finalImageUrl,
        price: parseFloat(newProduct.price) || 0
      });
      if (error) throw error;
      setShowAddModal(false);
      setImageFile(null);
      setImagePreview(null);
      setNewProduct({ name: '', description: '', price: '', category: 'Feminino', image_url: '', active: true });
      loadData();
    } catch (error: any) {
      alert("Erro ao salvar: " + error.message);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    loadData();
  };

  const stats = {
    totalSales: orders.filter(o => o.status === 'paid' || o.status === 'completed').length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    balance: orders.filter(o => o.status === 'paid' || o.status === 'completed').reduce((acc, curr) => acc + curr.total_price, 0),
    conversion: clicks > 0 ? ((orders.length / clicks) * 100).toFixed(1) : 0
  };

  return (
    <div className="pt-20 min-h-screen bg-zinc-50 dark:bg-zinc-950 flex transition-colors duration-500">
      {/* Sidebar Ultra-Moderna */}
      <aside className="w-20 lg:w-72 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-r border-zinc-200 dark:border-zinc-800 flex flex-col z-30">
        <div className="p-8 mb-4">
          <h2 className="text-xl font-bold brand dark:text-white hidden lg:block tracking-tighter">ZARA <span className="font-light">BI</span></h2>
          <div className="lg:hidden w-8 h-8 bg-black dark:bg-white rounded-full mx-auto" />
        </div>
        
        <nav className="flex-grow px-4 space-y-2">
          {[
            { id: 'stats', icon: BarChart3, label: 'Analytics' },
            { id: 'products', icon: Package, label: 'Inventário' },
            { id: 'orders', icon: ShoppingCart, label: 'Vendas' },
            { id: 'settings', icon: Settings, label: 'Segurança' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center justify-center lg:justify-start gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${activeTab === item.id ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xl scale-[1.02]' : 'text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 1.5} />
              <span className="hidden lg:block text-xs font-bold uppercase tracking-[0.15em]">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6">
          <button 
            onClick={() => { localStorage.removeItem('isAdmin'); navigate('/admin'); }}
            className="w-full flex items-center justify-center lg:justify-start gap-4 px-5 py-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest"
          >
            <LogOut size={22} />
            <span className="hidden lg:block">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-grow p-6 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {activeTab === 'stats' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <header className="flex justify-between items-end">
                <div className="space-y-1">
                  <h1 className="text-4xl font-bold dark:text-white tracking-tight brand">Executive Overview</h1>
                  <p className="text-zinc-500 text-sm font-medium">Relatórios em tempo real de deolindainacio15@icloud.com</p>
                </div>
                <button onClick={loadData} className="p-3 bg-white dark:bg-zinc-900 rounded-full shadow-sm hover:rotate-180 transition-all duration-500 text-zinc-400">
                  <RefreshCcw size={20} className={loading ? 'animate-spin' : ''}/>
                </button>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Receita Líquida', val: formatCurrency(stats.balance), icon: Wallet, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                  { label: 'Interesse (Cliques)', val: clicks, icon: MousePointer2, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                  { label: 'Pedidos Abertos', val: stats.pendingOrders, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                  { label: 'Conversão Real', val: stats.conversion + '%', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' }
                ].map((card, i) => (
                  <div key={i} className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all group">
                    <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <card.icon size={24} />
                    </div>
                    <p className="text-zinc-400 text-[10px] uppercase font-black tracking-widest mb-1">{card.label}</p>
                    <h3 className="text-2xl font-bold dark:text-white tracking-tighter">{card.val}</h3>
                  </div>
                ))}
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-sm">
                <div className="p-8 border-b dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-800/30">
                  <h4 className="font-bold text-xs uppercase tracking-[0.2em] dark:text-white">Recent Activity</h4>
                  <button onClick={() => setActiveTab('orders')} className="text-[10px] font-black uppercase text-zinc-400 hover:text-black dark:hover:text-white transition-colors">See Ledger <ArrowUpRight size={14} className="inline ml-1"/></button>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-50/50 dark:bg-zinc-900/50 text-[10px] uppercase tracking-widest text-zinc-400">
                      <tr>
                        <th className="px-8 py-5">Client</th>
                        <th className="px-8 py-5">Article</th>
                        <th className="px-8 py-5">State</th>
                        <th className="px-8 py-5 text-right">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-zinc-800">
                      {orders.slice(0, 6).map(order => (
                        <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                          <td className="px-8 py-5 font-bold dark:text-zinc-200">{order.customer_name}</td>
                          <td className="px-8 py-5 dark:text-zinc-400 text-xs">{order.product}</td>
                          <td className="px-8 py-5">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                              order.status === 'paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                              order.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                              'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right font-bold dark:text-zinc-100">{formatCurrency(order.total_price)}</td>
                        </tr>
                      ))}
                    </tbody>
                   </table>
                   {orders.length === 0 && <div className="p-20 text-center text-zinc-400 uppercase tracking-widest text-xs">No transactions recorded</div>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <h2 className="text-4xl font-bold dark:text-white brand tracking-tight">Showroom Collection</h2>
                  <p className="text-zinc-500 text-sm">Gerencie sua vitrine digital com curadoria Zara.</p>
                </div>
                <button onClick={() => setShowAddModal(true)} className="w-full sm:w-auto bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-2xl">
                  <Plus size={20}/> New Article
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(p => (
                  <div key={p.id} className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500">
                    <div className="aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
                      <img src={p.image_url} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <button className="bg-white p-3 rounded-full text-black hover:scale-110 transition-transform"><Edit size={18}/></button>
                        <button onClick={() => { if(confirm("Permanently remove this item?")) supabase.from('products').delete().eq('id', p.id).then(() => loadData()); }} className="bg-white p-3 rounded-full text-red-600 hover:scale-110 transition-transform"><Trash2 size={18}/></button>
                      </div>
                      <div className="absolute bottom-4 left-4">
                         <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter text-black">{p.category}</span>
                      </div>
                    </div>
                    <div className="p-6 flex justify-between items-center">
                      <div className="max-w-[70%]">
                        <h3 className="font-bold dark:text-white text-sm truncate">{p.name}</h3>
                        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">{formatCurrency(p.price)}</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${p.active ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-zinc-300'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
               <h2 className="text-4xl font-bold dark:text-white brand tracking-tight">Sales & Logistics</h2>
               <div className="grid gap-6">
                 {orders.map(order => (
                   <div key={order.id} className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 flex flex-col lg:flex-row justify-between gap-8 hover:shadow-xl transition-all">
                     <div className="space-y-4">
                       <div className="flex items-center gap-4">
                         <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-[9px] font-black text-zinc-400">ID: {order.id.slice(0, 8)}</span>
                         <div className="flex gap-1">
                           {['pending', 'paid', 'completed', 'cancelled'].map(st => (
                             <button key={st} onClick={() => updateOrderStatus(order.id, st as any)} className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${order.status === st ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-black'}`}>{st}</button>
                           ))}
                         </div>
                       </div>
                       <h3 className="text-2xl font-bold dark:text-white brand tracking-tight">{order.customer_name}</h3>
                       <div className="flex flex-wrap gap-4 text-xs font-medium text-zinc-500">
                          <span className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/50 px-3 py-2 rounded-xl"><Package size={14}/> {order.product} (x{order.quantity})</span>
                          <span className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/50 px-3 py-2 rounded-xl"><Eye size={14}/> {order.address}</span>
                       </div>
                     </div>
                     <div className="lg:text-right flex flex-col justify-between items-start lg:items-end gap-6">
                        <div className="space-y-1">
                          <p className="text-3xl font-bold dark:text-white tracking-tighter">{formatCurrency(order.total_price)}</p>
                          <p className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.2em]">{new Date(order.created_at).toLocaleString()}</p>
                        </div>
                        <a href={`https://wa.me/${order.phone.replace(/\D/g, '')}`} target="_blank" className="bg-emerald-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-600 hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                          <MessageCircle size={16}/> Chat via WhatsApp
                        </a>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl bg-white dark:bg-zinc-900 p-12 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm animate-in zoom-in duration-500">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-20 h-20 bg-black dark:bg-white rounded-3xl flex items-center justify-center text-white dark:text-black shadow-2xl">
                   <UserCircle size={40} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold dark:text-white brand tracking-tighter">Profile Security</h2>
                  <p className="text-zinc-500 text-sm font-medium">deolindainacio15@icloud.com</p>
                </div>
              </div>
              
              <div className="space-y-10">
                 <div className="p-6 bg-zinc-50 dark:bg-zinc-800/30 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] dark:text-white mb-4">Account Access</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b dark:border-zinc-800">
                        <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Status</span>
                        <span className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">Active Admin</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b dark:border-zinc-800">
                        <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Two-Factor</span>
                        <span className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400">Disabled</span>
                      </div>
                    </div>
                 </div>

                 <button className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                   Change Master Password
                 </button>

                 <div className="flex gap-4 p-5 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl">
                    <AlertTriangle className="text-amber-500 shrink-0" size={20}/>
                    <p className="text-[10px] text-amber-700 dark:text-amber-400 font-medium leading-relaxed uppercase tracking-tighter">
                      O acesso administrativo é confidencial. Todas as alterações são rastreadas e vinculadas ao seu e-mail de administrador.
                    </p>
                 </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal Moderno: Add Product */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-3xl p-10 rounded-[3rem] shadow-2xl overflow-y-auto max-h-[90vh] border dark:border-zinc-800">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold brand dark:text-white tracking-tight">New Piece Entry</h2>
              <button onClick={() => setShowAddModal(false)} className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center dark:text-white hover:rotate-90 transition-all"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleAddProduct} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">High-Res Visual</label>
                   <div 
                    onClick={() => document.getElementById('image-upload')?.click()}
                    className="aspect-[3/4] border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer hover:border-black dark:hover:border-white transition-all overflow-hidden relative bg-zinc-50 dark:bg-zinc-800/50"
                   >
                     {imagePreview ? (
                       <img src={imagePreview} className="w-full h-full object-cover"/>
                     ) : (
                       <div className="text-center p-8 space-y-4">
                         <div className="w-16 h-16 bg-white dark:bg-zinc-700 rounded-3xl mx-auto flex items-center justify-center shadow-lg"><ImageIcon size={32} className="text-zinc-300"/></div>
                         <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Drag or Tap to Upload</p>
                       </div>
                     )}
                     {uploading && (
                       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white text-xs font-black uppercase tracking-[0.3em] animate-pulse">Syncing...</div>
                     )}
                   </div>
                   <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">Article Name</label>
                    <input required type="text" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-800/50 dark:text-white p-4 rounded-2xl outline-none focus:ring-1 ring-black dark:focus:ring-white transition-all border dark:border-zinc-700" placeholder="Minimalist Linen Shirt" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">Value (Kz)</label>
                      <input required type="number" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-800/50 dark:text-white p-4 rounded-2xl outline-none border dark:border-zinc-700" placeholder="45000" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">Section</label>
                      <select value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-800/50 dark:text-white p-4 rounded-2xl outline-none border dark:border-zinc-700">
                        <option>Feminino</option>
                        <option>Masculino</option>
                        <option>Acessórios</option>
                        <option>Infantil</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">Editorial Details</label>
                    <textarea required value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-800/50 dark:text-white p-4 rounded-2xl outline-none h-44 text-sm border dark:border-zinc-700" placeholder="Describe the cut, material and heritage of this piece..." />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-5 border border-zinc-200 dark:border-zinc-800 dark:text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">Abort</button>
                <button type="submit" disabled={loading} className="flex-1 bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50">
                  {loading ? "Confirming..." : "Add to Boutique"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
