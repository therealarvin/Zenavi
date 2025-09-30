-- Create tables for Zenavi Jewellery

-- Site settings table
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_name TEXT DEFAULT 'Zenavi Jewellery',
  hero_headline TEXT,
  hero_subheadline TEXT,
  about_headline TEXT,
  about_content TEXT,
  founder_note TEXT,
  phone_number TEXT,
  email_address TEXT,
  showroom_address TEXT,
  operating_hours TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Hero slides table
CREATE TABLE hero_slides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  button_text TEXT,
  button_link TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Collections table
CREATE TABLE collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_category TEXT,
  category_type TEXT CHECK (category_type IN ('type', 'karat', 'occasion', 'diamond_type')),
  material_type TEXT CHECK (material_type IN ('gold', 'diamond')),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  sku TEXT UNIQUE,
  collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
  material_type TEXT CHECK (material_type IN ('gold', 'diamond')),
  karat TEXT,
  weight DECIMAL(10,2),
  dimensions TEXT,
  care_instructions TEXT,
  stock_quantity INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Product categories junction table
CREATE TABLE product_categories (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);

-- Product images table
CREATE TABLE product_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Product tags table
CREATE TABLE product_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Customer reviews table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_title TEXT,
  testimonial_text TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  is_published BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Contact submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  file_url TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Media/Press mentions table
CREATE TABLE media_mentions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  publication_name TEXT NOT NULL,
  logo_url TEXT,
  article_url TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Admin users table
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create indexes for better performance
CREATE INDEX idx_products_material_type ON products(material_type);
CREATE INDEX idx_products_collection_id ON products(collection_id);
CREATE INDEX idx_products_is_featured ON products(is_featured);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_categories_material_type ON categories(material_type);
CREATE INDEX idx_categories_category_type ON categories(category_type);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to relevant tables
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hero_slides_updated_at BEFORE UPDATE ON hero_slides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON collections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_images_updated_at BEFORE UPDATE ON product_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_mentions_updated_at BEFORE UPDATE ON media_mentions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default site settings
INSERT INTO site_settings (
  brand_name,
  hero_headline,
  hero_subheadline,
  about_headline,
  about_content,
  founder_note,
  phone_number,
  email_address,
  showroom_address,
  operating_hours
) VALUES (
  'Zenavi Jewellery',
  'Elevate Your Everyday With Timeless Elegance',
  'Discover handcrafted fine jewellery designed to celebrate your moments, big and small.',
  'Our Story',
  'At Zenavi, we believe jewellery should be more than beautiful- it should be meaningful. Founded on the principles of craftsmanship, sustainability, and timeless design, our pieces are made to be cherished for a lifetime and passed on for generations.',
  'Every piece we create tells a story. Your story. Let us be part of your journey.',
  '+1 (555) 123-4567',
  'hello@zenavi.com',
  '123 Luxury Lane, Beverly Hills, CA 90210',
  'Mon-Sat: 10AM-7PM, Sun: 12PM-5PM'
);