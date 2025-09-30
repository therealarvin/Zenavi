-- Seed current hardcoded content into Supabase
-- Run this after schema.sql to populate the database with existing website content

-- Hero Slides
INSERT INTO hero_slides (image_url, title, subtitle, button_text, button_link, display_order, is_active) VALUES
('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920', 'Elevate Your Everyday', 'With Timeless Elegance', 'Shop New Arrivals', '/shop/new', 1, true),
('https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1920', 'Handcrafted Excellence', 'Made to Last Generations', 'Discover Collections', '/collections', 2, true),
('https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1920', 'Lab Grown Diamonds', 'Ethical Luxury Redefined', 'Book Consultation', '/contact', 3, true);

-- Collections
INSERT INTO collections (name, slug, description, image_url, display_order, is_active) VALUES
('Bridal Collection', 'bridal', 'Exquisite pieces for your special day', 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800', 1, true),
('Diamond Essentials', 'diamond-essentials', 'Timeless diamonds for everyday luxury', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800', 2, true),
('Gold Heritage', 'gold-heritage', 'Traditional designs with modern elegance', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800', 3, true);

-- Testimonials
INSERT INTO testimonials (customer_name, customer_title, testimonial_text, rating, is_featured, is_published, display_order) VALUES
('Sarah Johnson', 'Bride', 'The engagement ring from Zenavi exceeded all my expectations. The craftsmanship is impeccable and the customer service was outstanding throughout the entire process.', 5, true, true, 1),
('Michael Chen', 'Loyal Customer', 'I''ve been shopping at Zenavi for years. Their attention to detail and quality is unmatched. Every piece tells a story and becomes a cherished family heirloom.', 5, true, true, 2),
('Emily Davis', 'Anniversary Gift', 'My husband surprised me with a diamond necklace from Zenavi for our 10th anniversary. It''s absolutely stunning and I receive compliments every time I wear it.', 5, true, true, 3),
('Robert Taylor', 'First-time Buyer', 'The personalized consultation made choosing the perfect piece so easy. They understood exactly what I was looking for and helped me find something truly special.', 5, true, true, 4);

-- Media Mentions (using text logos for now - can be replaced with actual images later)
INSERT INTO media_mentions (publication_name, display_order, is_active) VALUES
('Vogue', 1, true),
('Harper''s Bazaar', 2, true),
('Elle', 3, true),
('Town & Country', 4, true),
('Brides', 5, true),
('InStyle', 6, true);

-- Sample Categories
INSERT INTO categories (name, slug, category_type, material_type, display_order, is_active) VALUES
('Rings', 'rings', 'type', 'gold', 1, true),
('Necklaces', 'necklaces', 'type', 'gold', 2, true),
('Earrings', 'earrings', 'type', 'gold', 3, true),
('Bracelets', 'bracelets', 'type', 'gold', 4, true),
('14K Gold', '14k-gold', 'karat', 'gold', 5, true),
('18K Gold', '18k-gold', 'karat', 'gold', 6, true),
('22K Gold', '22k-gold', 'karat', 'gold', 7, true);
