
import { createClient } from '@supabase/supabase-js';

// Função segura para obter variáveis de ambiente sem quebrar o navegador
const getEnv = (key: string, fallback: string) => {
  try {
    // Tenta acessar via process.env (Node/Build time) ou window (Browser runtime)
    return (typeof process !== 'undefined' && process.env?.[key]) || 
           (window as any)._env_?.[key] || 
           fallback;
  } catch {
    return fallback;
  }
};

const supabaseUrl = getEnv('SUPABASE_URL', 'https://qisslybwcpuhxlbblgnb.supabase.co');
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY', 'sb_publishable_jfazcycPh7dPskcCLk9juw_RTD0qEkG');

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('SUPABASE: Chaves de API não detectadas. O app usará os fallbacks de produção.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const DATABASE_SETUP_SQL = `-- 1. Criar tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Criar tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  product TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Criar tabela de cliques (WhatsApp tracking)
CREATE TABLE IF NOT EXISTS clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'whatsapp',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE clicks ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público
CREATE POLICY "Acesso Público Leitura" ON products FOR SELECT USING (true);
CREATE POLICY "Acesso Público Escrita" ON products FOR ALL USING (true);
CREATE POLICY "Acesso Público Leitura" ON orders FOR SELECT USING (true);
CREATE POLICY "Acesso Público Escrita" ON orders FOR ALL USING (true);
CREATE POLICY "Acesso Público Leitura" ON clicks FOR SELECT USING (true);
CREATE POLICY "Acesso Público Escrita" ON clicks FOR INSERT WITH CHECK (true);
`;
