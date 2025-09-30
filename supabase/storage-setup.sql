-- Storage bucket setup for Zenavi Jewellery
-- Run this after creating the buckets in the Supabase dashboard

-- Enable RLS (Row Level Security) for storage
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

-- Policy for product-images bucket (public read)
CREATE POLICY "Public read access for product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');

-- Policy for hero-slides bucket (public read)
CREATE POLICY "Public read access for hero slides" ON storage.objects FOR SELECT USING (bucket_id = 'hero-slides');

-- Policy for contact-uploads bucket (private)
CREATE POLICY "Authenticated users can upload contact files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'contact-uploads' AND auth.role() = 'authenticated');
CREATE POLICY "Users can view their own contact uploads" ON storage.objects FOR SELECT USING (bucket_id = 'contact-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Admin policies for managing all buckets (you'll need to customize this based on your admin auth setup)
CREATE POLICY "Admin full access to product images" ON storage.objects FOR ALL USING (bucket_id = 'product-images' AND auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access to hero slides" ON storage.objects FOR ALL USING (bucket_id = 'hero-slides' AND auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access to contact uploads" ON storage.objects FOR ALL USING (bucket_id = 'contact-uploads' AND auth.jwt() ->> 'role' = 'admin');