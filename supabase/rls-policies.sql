-- Row Level Security (RLS) policies for Zenavi Jewellery

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_mentions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read policies for frontend data
CREATE POLICY "Public read access to site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read access to active hero slides" ON hero_slides FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access to active collections" ON collections FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access to active categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access to active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access to product categories" ON product_categories FOR SELECT USING (true);
CREATE POLICY "Public read access to product images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Public read access to product tags" ON product_tags FOR SELECT USING (true);
CREATE POLICY "Public read access to published reviews" ON reviews FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access to published testimonials" ON testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access to active media mentions" ON media_mentions FOR SELECT USING (is_active = true);

-- Contact form submission policy
CREATE POLICY "Anyone can submit contact forms" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Admin policies (you'll need to customize based on your admin authentication)
-- These assume you have a JWT claim for admin role
CREATE POLICY "Admin full access to site settings" ON site_settings FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access to hero slides" ON hero_slides FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access to collections" ON collections FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access to categories" ON categories FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access to products" ON products FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access to product categories" ON product_categories FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access to product images" ON product_images FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access to product tags" ON product_tags FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access to reviews" ON reviews FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access to testimonials" ON testimonials FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access to contact submissions" ON contact_submissions FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access to media mentions" ON media_mentions FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access to admin users" ON admin_users FOR ALL USING (auth.jwt() ->> 'role' = 'admin');