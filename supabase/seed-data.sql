-- Sample data for Zenavi Jewellery website
-- Run this after the main schema to populate with initial content

-- Insert sample collections
INSERT INTO collections (name, slug, description, display_order) VALUES
('Engagement Rings', 'engagement-rings', 'Timeless engagement rings crafted with the finest diamonds and precious metals', 1),
('Wedding Bands', 'wedding-bands', 'Perfect wedding bands to symbolize your eternal love', 2),
('Necklaces', 'necklaces', 'Elegant necklaces for every occasion', 3),
('Earrings', 'earrings', 'Beautiful earrings to complement your style', 4),
('Bracelets', 'bracelets', 'Stunning bracelets and bangles', 5);

-- Insert sample categories
INSERT INTO categories (name, slug, category_type, material_type, display_order) VALUES
-- Jewelry Types
('Rings', 'rings', 'type', NULL, 1),
('Necklaces', 'necklaces', 'type', NULL, 2),
('Earrings', 'earrings', 'type', NULL, 3),
('Bracelets', 'bracelets', 'type', NULL, 4),
('Pendants', 'pendants', 'type', NULL, 5),

-- Gold Karat Types
('14K Gold', '14k-gold', 'karat', 'gold', 1),
('18K Gold', '18k-gold', 'karat', 'gold', 2),
('22K Gold', '22k-gold', 'karat', 'gold', 3),

-- Occasions
('Engagement', 'engagement', 'occasion', NULL, 1),
('Wedding', 'wedding', 'occasion', NULL, 2),
('Anniversary', 'anniversary', 'occasion', NULL, 3),
('Birthday', 'birthday', 'occasion', NULL, 4),
('Everyday', 'everyday', 'occasion', NULL, 5),

-- Diamond Types
('Natural Diamonds', 'natural-diamonds', 'diamond_type', 'diamond', 1),
('Lab-Grown Diamonds', 'lab-grown-diamonds', 'diamond_type', 'diamond', 2);

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, customer_title, testimonial_text, rating, display_order) VALUES
('Sarah Johnson', 'Bride', 'The engagement ring from Zenavi is absolutely stunning. The craftsmanship is incredible and the diamond sparkles beautifully. I receive compliments every day!', 5, 1),
('Michael Chen', 'Groom', 'Outstanding service and quality. The team helped me design the perfect custom wedding band. Highly recommend Zenavi for anyone looking for exceptional jewelry.', 5, 2),
('Emma Williams', 'Jewelry Enthusiast', 'I have purchased several pieces from Zenavi and each one exceeds my expectations. The attention to detail and quality is unmatched.', 5, 3);

-- Insert sample hero slides
INSERT INTO hero_slides (title, subtitle, button_text, button_link, display_order) VALUES
('Discover Timeless Elegance', 'Handcrafted jewelry designed to celebrate life''s precious moments', 'Shop Collections', '/collections', 1),
('Custom Design Services', 'Create a one-of-a-kind piece that tells your unique story', 'Learn More', '/custom-design', 2),
('Ethically Sourced Diamonds', 'Beautiful diamonds sourced with care and responsibility', 'View Diamonds', '/diamonds', 3);

-- Insert sample media mentions
INSERT INTO media_mentions (publication_name, article_url, display_order) VALUES
('Vogue Jewelry', 'https://vogue.com/zenavi-feature', 1),
('Harper''s Bazaar', 'https://harpersbazaar.com/zenavi-review', 2),
('Town & Country', 'https://townandcountry.com/zenavi-spotlight', 3);