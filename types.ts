
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  active: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  product: string;
  quantity: number;
  total_price: number;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
  created_at: string;
}

export interface Click {
  id: string;
  product_id: string;
  type: 'whatsapp';
  created_at: string;
}

export enum Category {
  MEN = 'Masculino',
  WOMEN = 'Feminino',
  ACCESSORIES = 'Acessórios',
  KIDS = 'Infantil'
}
