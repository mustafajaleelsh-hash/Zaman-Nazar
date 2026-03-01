-- 1. Create a User Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Trigger to automatically create a profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Automatic updated_at timestamp trigger
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_profiles_modtime ON profiles;
CREATE TRIGGER update_profiles_modtime
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- 4. Create Orders & Order Items Tables
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, paid, shipped, delivered, cancelled
  shipping_address TEXT,
  contact_phone TEXT,
  promo_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id),
  quantity INT NOT NULL CHECK (quantity > 0),
  price_at_time NUMERIC NOT NULL
);

-- Enable RLS for orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own orders" ON orders;
CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own order items" ON order_items;
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Users can insert own order items" ON order_items;
CREATE POLICY "Users can insert own order items" ON order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Trigger for orders updated_at
DROP TRIGGER IF EXISTS update_orders_modtime ON orders;
CREATE TRIGGER update_orders_modtime
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- 5. Amazing function to create an order atomically
CREATE OR REPLACE FUNCTION create_order(p_total NUMERIC, p_address TEXT, p_phone TEXT, p_promo TEXT, p_items JSONB) RETURNS UUID AS $$
DECLARE
  new_order_id UUID;
  item RECORD;
BEGIN
  INSERT INTO orders (user_id, total_amount, shipping_address, contact_phone, promo_code)
  VALUES (auth.uid(), p_total, p_address, p_phone, p_promo) RETURNING id INTO new_order_id;
  
  FOR item IN SELECT * FROM jsonb_to_recordset(p_items) AS x(product_id TEXT, quantity INT, price NUMERIC) LOOP
    INSERT INTO order_items (order_id, product_id, quantity, price_at_time)
    VALUES (new_order_id, item.product_id, item.quantity, item.price);
  END LOOP;
  
  RETURN new_order_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;