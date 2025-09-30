-- Seed sample products with images
-- Run this after seed-current-content.sql

-- Insert Products
INSERT INTO products (name, slug, description, price, sale_price, material_type, karat, stock_quantity, is_featured, is_active) VALUES
('Diamond Solitaire Ring', 'diamond-solitaire-ring', 'A stunning solitaire ring featuring a brilliant cut diamond set in platinum. Perfect for engagements and special occasions.', 2999, 2499, 'diamond', '18K', 5, true, true),
('Pearl Drop Earrings', 'pearl-drop-earrings', 'Elegant pearl drop earrings with lustrous freshwater pearls. A timeless addition to any jewelry collection.', 899, NULL, 'gold', '14K', 12, false, true),
('Gold Chain Necklace', 'gold-chain-necklace', 'Classic gold chain necklace in 22K gold. Versatile piece suitable for both casual and formal wear.', 1299, NULL, 'gold', '22K', 8, false, true),
('Tennis Bracelet', 'tennis-bracelet', 'Luxurious diamond tennis bracelet with precisely set stones. A statement piece that exudes elegance.', 3499, NULL, 'diamond', '18K', 3, true, true),
('Emerald Pendant', 'emerald-pendant', 'Beautiful emerald pendant with natural gemstone surrounded by diamond accents. Perfect for gifting.', 1899, 1599, 'gold', '18K', 6, false, true),
('Rose Gold Bangles', 'rose-gold-bangles', 'Set of 2 rose gold bangles with intricate detailing. Lightweight and comfortable for daily wear.', 1499, NULL, 'gold', '18K', 10, false, true),
('Diamond Stud Earrings', 'diamond-stud-earrings', 'Classic diamond stud earrings perfect for the office or everyday elegance. Timeless design that never goes out of style.', 1799, NULL, 'diamond', '14K', 15, true, true),
('Gold Anklet', 'gold-anklet', 'Delicate gold anklet with traditional design. Perfect for festive occasions and daily wear.', 699, NULL, 'gold', '14K', 20, false, true);

-- Get the inserted product IDs and insert images
-- Note: We'll use the same Unsplash images for now, but these can be replaced with actual uploads

-- Diamond Solitaire Ring
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id, 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600', true, 0
FROM products WHERE slug = 'diamond-solitaire-ring';

-- Pearl Drop Earrings
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id, 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=600', true, 0
FROM products WHERE slug = 'pearl-drop-earrings';

-- Gold Chain Necklace
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id, 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600', true, 0
FROM products WHERE slug = 'gold-chain-necklace';

-- Tennis Bracelet
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id, 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600', true, 0
FROM products WHERE slug = 'tennis-bracelet';

-- Emerald Pendant
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id, 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600', true, 0
FROM products WHERE slug = 'emerald-pendant';

-- Rose Gold Bangles
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id, 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600', true, 0
FROM products WHERE slug = 'rose-gold-bangles';

-- Diamond Stud Earrings
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id, 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600', true, 0
FROM products WHERE slug = 'diamond-stud-earrings';

-- Gold Anklet
INSERT INTO product_images (product_id, image_url, is_primary, display_order)
SELECT id, 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600', true, 0
FROM products WHERE slug = 'gold-anklet';

-- Link products to categories (using the categories we created earlier)
-- Diamond Solitaire Ring -> Rings
INSERT INTO product_categories (product_id, category_id)
SELECT p.id, c.id
FROM products p, categories c
WHERE p.slug = 'diamond-solitaire-ring' AND c.slug = 'rings';

-- Pearl Drop Earrings -> Earrings
INSERT INTO product_categories (product_id, category_id)
SELECT p.id, c.id
FROM products p, categories c
WHERE p.slug = 'pearl-drop-earrings' AND c.slug = 'earrings';

-- Gold Chain Necklace -> Necklaces
INSERT INTO product_categories (product_id, category_id)
SELECT p.id, c.id
FROM products p, categories c
WHERE p.slug = 'gold-chain-necklace' AND c.slug = 'necklaces';

-- Tennis Bracelet -> Bracelets
INSERT INTO product_categories (product_id, category_id)
SELECT p.id, c.id
FROM products p, categories c
WHERE p.slug = 'tennis-bracelet' AND c.slug = 'bracelets';

-- Rose Gold Bangles -> Bracelets
INSERT INTO product_categories (product_id, category_id)
SELECT p.id, c.id
FROM products p, categories c
WHERE p.slug = 'rose-gold-bangles' AND c.slug = 'bracelets';

-- Diamond Stud Earrings -> Earrings
INSERT INTO product_categories (product_id, category_id)
SELECT p.id, c.id
FROM products p, categories c
WHERE p.slug = 'diamond-stud-earrings' AND c.slug = 'earrings';
