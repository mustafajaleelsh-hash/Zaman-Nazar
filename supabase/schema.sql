CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  features JSONB,
  movement TEXT,
  material TEXT,
  image TEXT
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create Policy to allow public read access
CREATE POLICY "Allow public read access" ON products
  FOR SELECT TO public
  USING (true);
