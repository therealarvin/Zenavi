-- TEMPORARY: Allow public uploads to storage buckets for admin panel
-- TODO: Replace with proper authentication before production

-- Allow anyone to upload to product-images bucket
CREATE POLICY "Temporary: Allow public uploads to product images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'product-images');

-- Allow anyone to delete from product-images bucket
CREATE POLICY "Temporary: Allow public deletes from product images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'product-images');

-- Allow anyone to upload to hero-slides bucket
CREATE POLICY "Temporary: Allow public uploads to hero slides"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'hero-slides');

-- Allow anyone to delete from hero-slides bucket
CREATE POLICY "Temporary: Allow public deletes from hero slides"
ON storage.objects
FOR DELETE
USING (bucket_id = 'hero-slides');
