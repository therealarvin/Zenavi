import { createClient } from './client'

export async function uploadImage(
  file: File,
  bucket: 'product-images' | 'hero-slides' | 'collection-images' | 'media-logos',
  folder?: string
): Promise<{ url: string | null; error: Error | null }> {
  const supabase = createClient()

  // Generate unique filename
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
  const filePath = folder ? `${folder}/${fileName}` : fileName

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    return { url: null, error }
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return { url: publicUrl, error: null }
}

export async function deleteImage(
  url: string,
  bucket: 'product-images' | 'hero-slides' | 'collection-images' | 'media-logos'
): Promise<{ error: Error | null }> {
  const supabase = createClient()

  // Extract path from URL
  const urlParts = url.split(`/${bucket}/`)
  if (urlParts.length < 2) {
    return { error: new Error('Invalid URL format') }
  }

  const filePath = urlParts[1]

  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath])

  return { error }
}
