'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import {
  Settings,
  Package,
  Image as ImageIcon,
  Users,
  Plus,
  Edit,
  Trash2,
  Save,
  Upload,
  X,
  Folder,
  Tags,
  Star,
  Newspaper,
  Mail,
  MessageSquare
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { uploadImage, deleteImage } from '@/lib/supabase/storage'
import Image from 'next/image'

type Message = { type: 'success' | 'error', text: string } | null

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('settings')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<Message>(null)
  const supabase = createClient()

  // Site Settings
  const [siteSettings, setSiteSettings] = useState({
    id: '',
    brand_name: 'Zenavi Jewellery',
    hero_headline: 'Elevate Your Everyday With Timeless Elegance',
    hero_subheadline: 'Discover handcrafted fine jewellery designed to celebrate your moments, big and small.',
    about_headline: 'Our Story',
    about_content: '',
    founder_note: '',
    phone_number: '',
    email_address: '',
    showroom_address: '',
    operating_hours: '',
    instagram_url: '',
    facebook_url: '',
  })

  // Hero Slides
  const [heroSlides, setHeroSlides] = useState<any[]>([])
  const [editingSlide, setEditingSlide] = useState<any>(null)
  const [slideFormData, setSlideFormData] = useState({
    image_url: '',
    title: '',
    subtitle: '',
    button_text: '',
    button_link: '',
    display_order: 0,
  })
  const slideFileInputRef = useRef<HTMLInputElement>(null)
  const [slideImageFile, setSlideImageFile] = useState<File | null>(null)

  // Collections
  const [collections, setCollections] = useState<any[]>([])
  const [editingCollection, setEditingCollection] = useState<any>(null)
  const [collectionFormData, setCollectionFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    display_order: 0,
  })
  const collectionFileInputRef = useRef<HTMLInputElement>(null)
  const [collectionImageFile, setCollectionImageFile] = useState<File | null>(null)

  // Categories
  const [categories, setCategories] = useState<any[]>([])
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    parent_category: '',
    category_type: 'type',
    material_type: 'gold',
    display_order: 0,
  })

  // Products
  const [products, setProducts] = useState<any[]>([])
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [productFormData, setProductFormData] = useState({
    name: '',
    price: '',
    description: '',
    material_type: 'gold',
    karat: '18K',
    stock_quantity: 0,
    is_featured: false,
  })

  // Product Images
  const [selectedProductForImages, setSelectedProductForImages] = useState<any>(null)
  const [productImages, setProductImages] = useState<any[]>([])
  const productImageFileInputRef = useRef<HTMLInputElement>(null)
  const [productImageFile, setProductImageFile] = useState<File | null>(null)

  // Media Mentions
  const [mediaMentions, setMediaMentions] = useState<any[]>([])
  const [editingMedia, setEditingMedia] = useState<any>(null)
  const [mediaFormData, setMediaFormData] = useState({
    publication_name: '',
    logo_url: '',
    article_url: '',
    display_order: 0,
  })
  const mediaFileInputRef = useRef<HTMLInputElement>(null)
  const [mediaImageFile, setMediaImageFile] = useState<File | null>(null)

  // Reviews
  const [reviews, setReviews] = useState<any[]>([])
  const [editingReview, setEditingReview] = useState<any>(null)
  const [reviewFormData, setReviewFormData] = useState({
    product_id: '',
    customer_name: '',
    rating: 5,
    review_text: '',
    is_verified: false,
    is_published: false,
  })

  // Testimonials
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null)
  const [testimonialFormData, setTestimonialFormData] = useState({
    customer_name: '',
    customer_title: '',
    rating: 5,
    testimonial_text: '',
    is_featured: false,
    is_published: true,
  })

  // Contact Submissions
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([])

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  // === SITE SETTINGS ===
  const loadSiteSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single()

    if (data && !error) {
      setSiteSettings(data)
    }
  }

  const saveSiteSettings = async () => {
    setIsLoading(true)
    const { error } = await supabase
      .from('site_settings')
      .upsert(siteSettings)

    if (!error) {
      showMessage('success', 'Settings saved successfully!')
    } else {
      showMessage('error', 'Failed to save settings')
    }
    setIsLoading(false)
  }

  // === HERO SLIDES ===
  const loadHeroSlides = async () => {
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .order('display_order', { ascending: true })

    if (data && !error) {
      setHeroSlides(data)
    }
  }

  const saveSlide = async () => {
    setIsLoading(true)

    let imageUrl = slideFormData.image_url

    if (slideImageFile) {
      const { url, error } = await uploadImage(slideImageFile, 'hero-slides')
      if (error) {
        showMessage('error', 'Failed to upload image')
        setIsLoading(false)
        return
      }
      imageUrl = url!
    }

    const slideData = { ...slideFormData, image_url: imageUrl }

    if (editingSlide) {
      const { error } = await supabase
        .from('hero_slides')
        .update(slideData)
        .eq('id', editingSlide.id)

      if (!error) {
        showMessage('success', 'Slide updated successfully!')
        setEditingSlide(null)
      } else {
        showMessage('error', 'Failed to update slide')
      }
    } else {
      const { error } = await supabase
        .from('hero_slides')
        .insert(slideData)

      if (!error) {
        showMessage('success', 'Slide added successfully!')
      } else {
        showMessage('error', 'Failed to add slide')
      }
    }

    setSlideFormData({ image_url: '', title: '', subtitle: '', button_text: '', button_link: '', display_order: 0 })
    setSlideImageFile(null)
    if (slideFileInputRef.current) slideFileInputRef.current.value = ''
    setIsLoading(false)
    loadHeroSlides()
  }

  const deleteSlide = async (slide: any) => {
    if (!confirm('Are you sure you want to delete this slide?')) return
    setIsLoading(true)

    if (slide.image_url?.includes('hero-slides')) {
      await deleteImage(slide.image_url, 'hero-slides')
    }

    const { error } = await supabase.from('hero_slides').delete().eq('id', slide.id)

    if (!error) {
      showMessage('success', 'Slide deleted successfully!')
      loadHeroSlides()
    } else {
      showMessage('error', 'Failed to delete slide')
    }
    setIsLoading(false)
  }

  // === COLLECTIONS ===
  const loadCollections = async () => {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .order('display_order', { ascending: true })

    if (data && !error) {
      setCollections(data)
    }
  }

  const saveCollection = async () => {
    setIsLoading(true)

    let imageUrl = collectionFormData.image_url

    if (collectionImageFile) {
      const { url, error } = await uploadImage(collectionImageFile, 'collection-images')
      if (error) {
        showMessage('error', 'Failed to upload image')
        setIsLoading(false)
        return
      }
      imageUrl = url!
    }

    const collectionData = {
      ...collectionFormData,
      image_url: imageUrl,
      slug: collectionFormData.name.toLowerCase().replace(/\s+/g, '-'),
    }

    if (editingCollection) {
      const { error } = await supabase
        .from('collections')
        .update(collectionData)
        .eq('id', editingCollection.id)

      if (!error) {
        showMessage('success', 'Collection updated successfully!')
        setEditingCollection(null)
      } else {
        showMessage('error', 'Failed to update collection')
      }
    } else {
      const { error } = await supabase.from('collections').insert(collectionData)

      if (!error) {
        showMessage('success', 'Collection added successfully!')
      } else {
        showMessage('error', 'Failed to add collection')
      }
    }

    setCollectionFormData({ name: '', description: '', image_url: '', display_order: 0 })
    setCollectionImageFile(null)
    if (collectionFileInputRef.current) collectionFileInputRef.current.value = ''
    setIsLoading(false)
    loadCollections()
  }

  const deleteCollection = async (collection: any) => {
    if (!confirm('Are you sure you want to delete this collection?')) return
    setIsLoading(true)

    if (collection.image_url?.includes('collection-images')) {
      await deleteImage(collection.image_url, 'collection-images')
    }

    const { error } = await supabase.from('collections').delete().eq('id', collection.id)

    if (!error) {
      showMessage('success', 'Collection deleted successfully!')
      loadCollections()
    } else {
      showMessage('error', 'Failed to delete collection')
    }
    setIsLoading(false)
  }

  // === CATEGORIES ===
  const loadCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true })

    if (data && !error) {
      setCategories(data)
    }
  }

  const saveCategory = async () => {
    setIsLoading(true)

    const categoryData = {
      ...categoryFormData,
      slug: categoryFormData.name.toLowerCase().replace(/\s+/g, '-'),
    }

    if (editingCategory) {
      const { error } = await supabase
        .from('categories')
        .update(categoryData)
        .eq('id', editingCategory.id)

      if (!error) {
        showMessage('success', 'Category updated successfully!')
        setEditingCategory(null)
      } else {
        showMessage('error', 'Failed to update category')
      }
    } else {
      const { error } = await supabase.from('categories').insert(categoryData)

      if (!error) {
        showMessage('success', 'Category added successfully!')
      } else {
        showMessage('error', 'Failed to add category')
      }
    }

    setCategoryFormData({ name: '', parent_category: '', category_type: 'type', material_type: 'gold', display_order: 0 })
    setIsLoading(false)
    loadCategories()
  }

  const deleteCategory = async (category: any) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    setIsLoading(true)

    const { error } = await supabase.from('categories').delete().eq('id', category.id)

    if (!error) {
      showMessage('success', 'Category deleted successfully!')
      loadCategories()
    } else {
      showMessage('error', 'Failed to delete category')
    }
    setIsLoading(false)
  }

  // === PRODUCTS ===
  const loadProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (data && !error) {
      setProducts(data)
    }
  }

  const saveProduct = async () => {
    setIsLoading(true)

    const productData = {
      ...productFormData,
      price: parseFloat(productFormData.price),
      slug: productFormData.name.toLowerCase().replace(/\s+/g, '-'),
    }

    if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProduct.id)

      if (!error) {
        showMessage('success', 'Product updated successfully!')
        setEditingProduct(null)
      } else {
        showMessage('error', 'Failed to update product')
      }
    } else {
      const { error } = await supabase.from('products').insert(productData)

      if (!error) {
        showMessage('success', 'Product added successfully!')
      } else {
        showMessage('error', 'Failed to add product')
      }
    }

    setProductFormData({ name: '', price: '', description: '', material_type: 'gold', karat: '18K', stock_quantity: 0, is_featured: false })
    setIsLoading(false)
    loadProducts()
  }

  const deleteProduct = async (product: any) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    setIsLoading(true)

    const { error } = await supabase.from('products').delete().eq('id', product.id)

    if (!error) {
      showMessage('success', 'Product deleted successfully!')
      loadProducts()
    } else {
      showMessage('error', 'Failed to delete product')
    }
    setIsLoading(false)
  }

  // === PRODUCT IMAGES ===
  const loadProductImages = async (productId: string) => {
    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId)
      .order('display_order', { ascending: true })

    if (data && !error) {
      setProductImages(data)
    }
  }

  const uploadProductImage = async () => {
    if (!productImageFile || !selectedProductForImages) return
    setIsLoading(true)

    const { url, error } = await uploadImage(productImageFile, 'product-images')
    if (error) {
      showMessage('error', 'Failed to upload image')
      setIsLoading(false)
      return
    }

    const { error: insertError } = await supabase.from('product_images').insert({
      product_id: selectedProductForImages.id,
      image_url: url!,
      display_order: productImages.length,
    })

    if (!insertError) {
      showMessage('success', 'Image uploaded successfully!')
      loadProductImages(selectedProductForImages.id)
      setProductImageFile(null)
      if (productImageFileInputRef.current) productImageFileInputRef.current.value = ''
    } else {
      showMessage('error', 'Failed to save image')
    }
    setIsLoading(false)
  }

  const setPrimaryProductImage = async (imageId: string) => {
    if (!selectedProductForImages) return
    setIsLoading(true)

    // Unset all primary images for this product
    await supabase
      .from('product_images')
      .update({ is_primary: false })
      .eq('product_id', selectedProductForImages.id)

    // Set the selected image as primary
    const { error } = await supabase
      .from('product_images')
      .update({ is_primary: true })
      .eq('id', imageId)

    if (!error) {
      showMessage('success', 'Primary image updated!')
      loadProductImages(selectedProductForImages.id)
    } else {
      showMessage('error', 'Failed to update primary image')
    }
    setIsLoading(false)
  }

  const deleteProductImage = async (image: any) => {
    if (!confirm('Delete this image?')) return
    setIsLoading(true)

    if (image.image_url?.includes('product-images')) {
      await deleteImage(image.image_url, 'product-images')
    }

    const { error } = await supabase.from('product_images').delete().eq('id', image.id)

    if (!error) {
      showMessage('success', 'Image deleted!')
      loadProductImages(selectedProductForImages!.id)
    } else {
      showMessage('error', 'Failed to delete image')
    }
    setIsLoading(false)
  }

  // === MEDIA MENTIONS ===
  const loadMediaMentions = async () => {
    const { data, error } = await supabase
      .from('media_mentions')
      .select('*')
      .order('display_order', { ascending: true })

    if (data && !error) {
      setMediaMentions(data)
    }
  }

  const saveMediaMention = async () => {
    setIsLoading(true)

    let logoUrl = mediaFormData.logo_url

    if (mediaImageFile) {
      const { url, error } = await uploadImage(mediaImageFile, 'media-logos')
      if (error) {
        showMessage('error', 'Failed to upload logo')
        setIsLoading(false)
        return
      }
      logoUrl = url!
    }

    const mediaData = { ...mediaFormData, logo_url: logoUrl }

    if (editingMedia) {
      const { error } = await supabase
        .from('media_mentions')
        .update(mediaData)
        .eq('id', editingMedia.id)

      if (!error) {
        showMessage('success', 'Media mention updated!')
        setEditingMedia(null)
      } else {
        showMessage('error', 'Failed to update media mention')
      }
    } else {
      const { error } = await supabase.from('media_mentions').insert(mediaData)

      if (!error) {
        showMessage('success', 'Media mention added!')
      } else {
        showMessage('error', 'Failed to add media mention')
      }
    }

    setMediaFormData({ publication_name: '', logo_url: '', article_url: '', display_order: 0 })
    setMediaImageFile(null)
    if (mediaFileInputRef.current) mediaFileInputRef.current.value = ''
    setIsLoading(false)
    loadMediaMentions()
  }

  const deleteMediaMention = async (media: any) => {
    if (!confirm('Delete this media mention?')) return
    setIsLoading(true)

    if (media.logo_url?.includes('media-logos')) {
      await deleteImage(media.logo_url, 'media-logos')
    }

    const { error } = await supabase.from('media_mentions').delete().eq('id', media.id)

    if (!error) {
      showMessage('success', 'Media mention deleted!')
      loadMediaMentions()
    } else {
      showMessage('error', 'Failed to delete media mention')
    }
    setIsLoading(false)
  }

  // === REVIEWS ===
  const loadReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*, products(name)')
      .order('created_at', { ascending: false })

    if (data && !error) {
      setReviews(data)
    }
  }

  const saveReview = async () => {
    setIsLoading(true)

    if (editingReview) {
      const { error } = await supabase
        .from('reviews')
        .update(reviewFormData)
        .eq('id', editingReview.id)

      if (!error) {
        showMessage('success', 'Review updated!')
        setEditingReview(null)
      } else {
        showMessage('error', 'Failed to update review')
      }
    } else {
      const { error } = await supabase.from('reviews').insert(reviewFormData)

      if (!error) {
        showMessage('success', 'Review added!')
      } else {
        showMessage('error', 'Failed to add review')
      }
    }

    setReviewFormData({ product_id: '', customer_name: '', rating: 5, review_text: '', is_verified: false, is_published: false })
    setIsLoading(false)
    loadReviews()
  }

  const deleteReview = async (review: any) => {
    if (!confirm('Delete this review?')) return
    setIsLoading(true)

    const { error } = await supabase.from('reviews').delete().eq('id', review.id)

    if (!error) {
      showMessage('success', 'Review deleted!')
      loadReviews()
    } else {
      showMessage('error', 'Failed to delete review')
    }
    setIsLoading(false)
  }

  // === TESTIMONIALS ===
  const loadTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })

    if (data && !error) {
      setTestimonials(data)
    }
  }

  const saveTestimonial = async () => {
    setIsLoading(true)

    if (editingTestimonial) {
      const { error } = await supabase
        .from('testimonials')
        .update(testimonialFormData)
        .eq('id', editingTestimonial.id)

      if (!error) {
        showMessage('success', 'Testimonial updated!')
        setEditingTestimonial(null)
      } else {
        showMessage('error', 'Failed to update testimonial')
      }
    } else {
      const { error } = await supabase.from('testimonials').insert(testimonialFormData)

      if (!error) {
        showMessage('success', 'Testimonial added!')
      } else {
        showMessage('error', 'Failed to add testimonial')
      }
    }

    setTestimonialFormData({ customer_name: '', customer_title: '', rating: 5, testimonial_text: '', is_featured: false, is_published: true })
    setIsLoading(false)
    loadTestimonials()
  }

  const deleteTestimonial = async (testimonial: any) => {
    if (!confirm('Delete this testimonial?')) return
    setIsLoading(true)

    const { error } = await supabase.from('testimonials').delete().eq('id', testimonial.id)

    if (!error) {
      showMessage('success', 'Testimonial deleted!')
      loadTestimonials()
    } else {
      showMessage('error', 'Failed to delete testimonial')
    }
    setIsLoading(false)
  }

  // === CONTACT SUBMISSIONS ===
  const loadContactSubmissions = async () => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (data && !error) {
      setContactSubmissions(data)
    }
  }

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ is_read: true })
      .eq('id', id)

    if (!error) {
      loadContactSubmissions()
    }
  }

  // Load all data on mount
  useEffect(() => {
    loadSiteSettings()
    loadHeroSlides()
    loadCollections()
    loadCategories()
    loadProducts()
    loadMediaMentions()
    loadReviews()
    loadTestimonials()
    loadContactSubmissions()
  }, [])

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-charcoal mb-8">Admin Panel</h1>

          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-6 p-4 rounded-sm ${
                  message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm mb-8 overflow-x-auto">
              <TabsTrigger value="settings" className="px-3 py-2 rounded-md data-[state=active]:bg-gold-100 data-[state=active]:text-gold-700 transition-colors whitespace-nowrap text-sm">
                <Settings className="w-4 h-4 mr-1 inline" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="slides" className="px-3 py-2 rounded-md data-[state=active]:bg-gold-100 data-[state=active]:text-gold-700 transition-colors whitespace-nowrap text-sm">
                <ImageIcon className="w-4 h-4 mr-1 inline" />
                Slides
              </TabsTrigger>
              <TabsTrigger value="collections" className="px-3 py-2 rounded-md data-[state=active]:bg-gold-100 data-[state=active]:text-gold-700 transition-colors whitespace-nowrap text-sm">
                <Folder className="w-4 h-4 mr-1 inline" />
                Collections
              </TabsTrigger>
              <TabsTrigger value="categories" className="px-3 py-2 rounded-md data-[state=active]:bg-gold-100 data-[state=active]:text-gold-700 transition-colors whitespace-nowrap text-sm">
                <Tags className="w-4 h-4 mr-1 inline" />
                Categories
              </TabsTrigger>
              <TabsTrigger value="products" className="px-3 py-2 rounded-md data-[state=active]:bg-gold-100 data-[state=active]:text-gold-700 transition-colors whitespace-nowrap text-sm">
                <Package className="w-4 h-4 mr-1 inline" />
                Products
              </TabsTrigger>
              <TabsTrigger value="product-images" className="px-3 py-2 rounded-md data-[state=active]:bg-gold-100 data-[state=active]:text-gold-700 transition-colors whitespace-nowrap text-sm">
                <ImageIcon className="w-4 h-4 mr-1 inline" />
                Images
              </TabsTrigger>
              <TabsTrigger value="media" className="px-3 py-2 rounded-md data-[state=active]:bg-gold-100 data-[state=active]:text-gold-700 transition-colors whitespace-nowrap text-sm">
                <Newspaper className="w-4 h-4 mr-1 inline" />
                Media
              </TabsTrigger>
              <TabsTrigger value="reviews" className="px-3 py-2 rounded-md data-[state=active]:bg-gold-100 data-[state=active]:text-gold-700 transition-colors whitespace-nowrap text-sm">
                <Star className="w-4 h-4 mr-1 inline" />
                Reviews
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="px-3 py-2 rounded-md data-[state=active]:bg-gold-100 data-[state=active]:text-gold-700 transition-colors whitespace-nowrap text-sm">
                <MessageSquare className="w-4 h-4 mr-1 inline" />
                Testimonials
              </TabsTrigger>
              <TabsTrigger value="contact" className="px-3 py-2 rounded-md data-[state=active]:bg-gold-100 data-[state=active]:text-gold-700 transition-colors whitespace-nowrap text-sm">
                <Mail className="w-4 h-4 mr-1 inline" />
                Contact
              </TabsTrigger>
            </TabsList>

            {/* Site Settings Tab */}
            <TabsContent value="settings" className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Site Settings</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
                  <input
                    type="text"
                    value={siteSettings.brand_name}
                    onChange={(e) => setSiteSettings({ ...siteSettings, brand_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hero Headline</label>
                  <input
                    type="text"
                    value={siteSettings.hero_headline}
                    onChange={(e) => setSiteSettings({ ...siteSettings, hero_headline: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subheadline</label>
                  <textarea
                    value={siteSettings.hero_subheadline}
                    onChange={(e) => setSiteSettings({ ...siteSettings, hero_subheadline: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">About Content</label>
                  <textarea
                    value={siteSettings.about_content || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, about_content: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="text"
                    value={siteSettings.phone_number || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, phone_number: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={siteSettings.email_address || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, email_address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                  <input
                    type="url"
                    value={siteSettings.instagram_url || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, instagram_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                  <input
                    type="url"
                    value={siteSettings.facebook_url || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, facebook_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>
              <button
                onClick={saveSiteSettings}
                disabled={isLoading}
                className="mt-6 px-6 py-2 bg-gold-600 text-white rounded-sm hover:bg-gold-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{isLoading ? 'Saving...' : 'Save Settings'}</span>
              </button>
            </TabsContent>

            {/* Hero Slides Tab */}
            <TabsContent value="slides" className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Hero Slides</h2>
              <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-gold-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">{editingSlide ? 'Edit Slide' : 'Add New Slide'}</h3>
                  {editingSlide && (
                    <button onClick={() => { setEditingSlide(null); setSlideFormData({ image_url: '', title: '', subtitle: '', button_text: '', button_link: '', display_order: 0 }); setSlideImageFile(null); if (slideFileInputRef.current) slideFileInputRef.current.value = ''; }} className="text-gray-500 hover:text-gray-700">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                    <input ref={slideFileInputRef} type="file" accept="image/*" onChange={(e) => { if (e.target.files && e.target.files[0]) { setSlideImageFile(e.target.files[0]); } }} className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                    {slideImageFile && <p className="text-sm text-gray-600 mt-1">Selected: {slideImageFile.name}</p>}
                  </div>
                  <input type="text" placeholder="Title" value={slideFormData.title} onChange={(e) => setSlideFormData({ ...slideFormData, title: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <input type="text" placeholder="Subtitle" value={slideFormData.subtitle} onChange={(e) => setSlideFormData({ ...slideFormData, subtitle: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <input type="text" placeholder="Button Text" value={slideFormData.button_text} onChange={(e) => setSlideFormData({ ...slideFormData, button_text: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <input type="text" placeholder="Button Link" value={slideFormData.button_link} onChange={(e) => setSlideFormData({ ...slideFormData, button_link: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <input type="number" placeholder="Display Order" value={slideFormData.display_order} onChange={(e) => setSlideFormData({ ...slideFormData, display_order: parseInt(e.target.value) })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <button onClick={saveSlide} disabled={isLoading || (!slideImageFile && !slideFormData.image_url)} className="px-6 py-2 bg-gold-600 text-white rounded-sm hover:bg-gold-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>{editingSlide ? 'Update' : 'Add'} Slide</span>
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Existing Slides ({heroSlides.length})</h3>
                {heroSlides.length === 0 ? (
                  <p className="text-gray-500">No slides yet.</p>
                ) : (
                  <div className="grid gap-4">
                    {heroSlides.map((slide) => (
                      <div key={slide.id} className="border rounded-lg p-4 flex gap-4 items-start">
                        {slide.image_url && (
                          <div className="relative w-32 h-20 flex-shrink-0">
                            <Image src={slide.image_url} alt={slide.title} fill className="object-cover rounded" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium">{slide.title}</h4>
                          <p className="text-sm text-gray-600">{slide.subtitle}</p>
                          <p className="text-xs text-gray-500 mt-1">Order: {slide.display_order}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingSlide(slide); setSlideFormData({ image_url: slide.image_url, title: slide.title, subtitle: slide.subtitle, button_text: slide.button_text, button_link: slide.button_link, display_order: slide.display_order }); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteSlide(slide)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Collections Tab */}
            <TabsContent value="collections" className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Collections</h2>
              <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-gold-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">{editingCollection ? 'Edit Collection' : 'Add New Collection'}</h3>
                  {editingCollection && (
                    <button onClick={() => { setEditingCollection(null); setCollectionFormData({ name: '', description: '', image_url: '', display_order: 0 }); setCollectionImageFile(null); if (collectionFileInputRef.current) collectionFileInputRef.current.value = ''; }} className="text-gray-500 hover:text-gray-700">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                    <input ref={collectionFileInputRef} type="file" accept="image/*" onChange={(e) => { if (e.target.files && e.target.files[0]) { setCollectionImageFile(e.target.files[0]); } }} className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  </div>
                  <input type="text" placeholder="Collection Name" value={collectionFormData.name} onChange={(e) => setCollectionFormData({ ...collectionFormData, name: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <input type="number" placeholder="Display Order" value={collectionFormData.display_order} onChange={(e) => setCollectionFormData({ ...collectionFormData, display_order: parseInt(e.target.value) })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <textarea placeholder="Description" value={collectionFormData.description} onChange={(e) => setCollectionFormData({ ...collectionFormData, description: e.target.value })} rows={3} className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <button onClick={saveCollection} disabled={isLoading || !collectionFormData.name} className="px-6 py-2 bg-gold-600 text-white rounded-sm hover:bg-gold-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>{editingCollection ? 'Update' : 'Add'} Collection</span>
                  </button>
                </div>
              </div>
              <div className="grid gap-4">
                {collections.map((collection) => (
                  <div key={collection.id} className="border rounded-lg p-4 flex gap-4 items-start">
                    {collection.image_url && (
                      <div className="relative w-32 h-20 flex-shrink-0">
                        <Image src={collection.image_url} alt={collection.name} fill className="object-cover rounded" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium">{collection.name}</h4>
                      <p className="text-sm text-gray-600">{collection.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingCollection(collection); setCollectionFormData({ name: collection.name, description: collection.description || '', image_url: collection.image_url || '', display_order: collection.display_order }); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteCollection(collection)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories" className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Categories</h2>
              <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-gold-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
                  {editingCategory && (
                    <button onClick={() => { setEditingCategory(null); setCategoryFormData({ name: '', parent_category: '', category_type: 'type', material_type: 'gold', display_order: 0 }); }} className="text-gray-500 hover:text-gray-700">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Category Name" value={categoryFormData.name} onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <select value={categoryFormData.category_type} onChange={(e) => setCategoryFormData({ ...categoryFormData, category_type: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500">
                    <option value="type">Type</option>
                    <option value="karat">Karat</option>
                    <option value="occasion">Occasion</option>
                    <option value="diamond_type">Diamond Type</option>
                  </select>
                  <select value={categoryFormData.material_type} onChange={(e) => setCategoryFormData({ ...categoryFormData, material_type: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500">
                    <option value="gold">Gold</option>
                    <option value="diamond">Diamond</option>
                  </select>
                  <input type="number" placeholder="Display Order" value={categoryFormData.display_order} onChange={(e) => setCategoryFormData({ ...categoryFormData, display_order: parseInt(e.target.value) })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <button onClick={saveCategory} disabled={isLoading || !categoryFormData.name} className="px-6 py-2 bg-gold-600 text-white rounded-sm hover:bg-gold-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>{editingCategory ? 'Update' : 'Add'} Category</span>
                  </button>
                </div>
              </div>
              <div className="grid gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="border rounded-lg p-4 flex gap-4 items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{category.name}</h4>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <span>Type: {category.category_type}</span>
                        <span>Material: {category.material_type}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingCategory(category); setCategoryFormData({ name: category.name, parent_category: category.parent_category || '', category_type: category.category_type, material_type: category.material_type, display_order: category.display_order }); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteCategory(category)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Products</h2>
              <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-gold-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                  {editingProduct && (
                    <button onClick={() => { setEditingProduct(null); setProductFormData({ name: '', price: '', description: '', material_type: 'gold', karat: '18K', stock_quantity: 0, is_featured: false }); }} className="text-gray-500 hover:text-gray-700">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Product Name" value={productFormData.name} onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <input type="number" step="0.01" placeholder="Price" value={productFormData.price} onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <select value={productFormData.material_type} onChange={(e) => setProductFormData({ ...productFormData, material_type: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500">
                    <option value="gold">Gold</option>
                    <option value="diamond">Diamond</option>
                  </select>
                  <select value={productFormData.karat} onChange={(e) => setProductFormData({ ...productFormData, karat: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500">
                    <option value="14K">14K</option>
                    <option value="18K">18K</option>
                    <option value="22K">22K</option>
                  </select>
                  <input type="number" placeholder="Stock Quantity" value={productFormData.stock_quantity} onChange={(e) => setProductFormData({ ...productFormData, stock_quantity: parseInt(e.target.value) || 0 })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="is_featured" checked={productFormData.is_featured} onChange={(e) => setProductFormData({ ...productFormData, is_featured: e.target.checked })} className="w-4 h-4" />
                    <label htmlFor="is_featured" className="text-sm">Featured Product</label>
                  </div>
                  <textarea placeholder="Description" value={productFormData.description} onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })} rows={3} className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <button onClick={saveProduct} disabled={isLoading || !productFormData.name || !productFormData.price} className="px-6 py-2 bg-gold-600 text-white rounded-sm hover:bg-gold-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>{editingProduct ? 'Update' : 'Add'} Product</span>
                  </button>
                </div>
              </div>
              <div className="grid gap-4">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4 flex gap-4 items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.description}</p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <span>Price: ${product.price}</span>
                        <span>Material: {product.material_type}</span>
                        <span>Stock: {product.stock_quantity}</span>
                        {product.is_featured && <span className="text-gold-600 font-medium">★ Featured</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingProduct(product); setProductFormData({ name: product.name, price: product.price.toString(), description: product.description || '', material_type: product.material_type, karat: product.karat, stock_quantity: product.stock_quantity, is_featured: product.is_featured }); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteProduct(product)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Product Images Tab */}
            <TabsContent value="product-images" className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Product Images</h2>

              {!selectedProductForImages ? (
                <div>
                  <p className="text-gray-600 mb-4">Select a product to manage its images:</p>
                  <div className="grid gap-2">
                    {products.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => { setSelectedProductForImages(product); loadProductImages(product.id); }}
                        className="text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">${product.price}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Managing: {selectedProductForImages.name}</h3>
                    <button onClick={() => { setSelectedProductForImages(null); setProductImages([]); }} className="text-sm text-gray-600 hover:text-gray-900">
                      ← Back to products
                    </button>
                  </div>

                  <div className="mb-6 p-6 bg-gray-50 rounded-lg border-2 border-gold-200">
                    <h4 className="font-medium mb-4">Upload New Image</h4>
                    <div className="flex gap-4">
                      <input
                        ref={productImageFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => { if (e.target.files && e.target.files[0]) { setProductImageFile(e.target.files[0]); } }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500"
                      />
                      <button
                        onClick={uploadProductImage}
                        disabled={isLoading || !productImageFile}
                        className="px-6 py-2 bg-gold-600 text-white rounded-sm hover:bg-gold-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    {productImages.map((image) => (
                      <div key={image.id} className="border rounded-lg p-4">
                        <div className="relative w-full h-40 mb-3">
                          <Image src={image.image_url} alt="Product" fill className="object-cover rounded" />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setPrimaryProductImage(image.id)}
                            className={`flex-1 text-xs px-3 py-2 rounded ${image.is_primary ? 'bg-gold-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                          >
                            {image.is_primary ? '★ Primary' : 'Set Primary'}
                          </button>
                          <button onClick={() => deleteProductImage(image)} className="text-xs px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Media Mentions Tab */}
            <TabsContent value="media" className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Media Mentions</h2>
              <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-gold-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">{editingMedia ? 'Edit Media Mention' : 'Add New Media Mention'}</h3>
                  {editingMedia && (
                    <button onClick={() => { setEditingMedia(null); setMediaFormData({ publication_name: '', logo_url: '', article_url: '', display_order: 0 }); setMediaImageFile(null); if (mediaFileInputRef.current) mediaFileInputRef.current.value = ''; }} className="text-gray-500 hover:text-gray-700">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Logo</label>
                    <input ref={mediaFileInputRef} type="file" accept="image/*" onChange={(e) => { if (e.target.files && e.target.files[0]) { setMediaImageFile(e.target.files[0]); } }} className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  </div>
                  <input type="text" placeholder="Publication Name" value={mediaFormData.publication_name} onChange={(e) => setMediaFormData({ ...mediaFormData, publication_name: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <input type="url" placeholder="Article URL" value={mediaFormData.article_url} onChange={(e) => setMediaFormData({ ...mediaFormData, article_url: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <input type="number" placeholder="Display Order" value={mediaFormData.display_order} onChange={(e) => setMediaFormData({ ...mediaFormData, display_order: parseInt(e.target.value) })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <button onClick={saveMediaMention} disabled={isLoading || !mediaFormData.publication_name} className="px-6 py-2 bg-gold-600 text-white rounded-sm hover:bg-gold-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>{editingMedia ? 'Update' : 'Add'} Media Mention</span>
                  </button>
                </div>
              </div>
              <div className="grid gap-4">
                {mediaMentions.map((media) => (
                  <div key={media.id} className="border rounded-lg p-4 flex gap-4 items-start">
                    {media.logo_url && (
                      <div className="relative w-24 h-16 flex-shrink-0">
                        <Image src={media.logo_url} alt={media.publication_name} fill className="object-contain rounded" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium">{media.publication_name}</h4>
                      {media.article_url && <a href={media.article_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">View Article →</a>}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingMedia(media); setMediaFormData({ publication_name: media.publication_name, logo_url: media.logo_url || '', article_url: media.article_url || '', display_order: media.display_order }); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteMediaMention(media)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Product Reviews</h2>
              <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-gold-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">{editingReview ? 'Edit Review' : 'Add New Review'}</h3>
                  {editingReview && (
                    <button onClick={() => { setEditingReview(null); setReviewFormData({ product_id: '', customer_name: '', rating: 5, review_text: '', is_verified: false, is_published: false }); }} className="text-gray-500 hover:text-gray-700">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <select value={reviewFormData.product_id} onChange={(e) => setReviewFormData({ ...reviewFormData, product_id: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500">
                    <option value="">Select Product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                  </select>
                  <input type="text" placeholder="Customer Name" value={reviewFormData.customer_name} onChange={(e) => setReviewFormData({ ...reviewFormData, customer_name: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <select value={reviewFormData.rating} onChange={(e) => setReviewFormData({ ...reviewFormData, rating: parseInt(e.target.value) })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500">
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="is_verified" checked={reviewFormData.is_verified} onChange={(e) => setReviewFormData({ ...reviewFormData, is_verified: e.target.checked })} className="w-4 h-4" />
                      <label htmlFor="is_verified" className="text-sm">Verified</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="is_published_review" checked={reviewFormData.is_published} onChange={(e) => setReviewFormData({ ...reviewFormData, is_published: e.target.checked })} className="w-4 h-4" />
                      <label htmlFor="is_published_review" className="text-sm">Published</label>
                    </div>
                  </div>
                  <textarea placeholder="Review Text" value={reviewFormData.review_text} onChange={(e) => setReviewFormData({ ...reviewFormData, review_text: e.target.value })} rows={3} className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <button onClick={saveReview} disabled={isLoading || !reviewFormData.product_id || !reviewFormData.customer_name} className="md:col-span-2 px-6 py-2 bg-gold-600 text-white rounded-sm hover:bg-gold-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>{editingReview ? 'Update' : 'Add'} Review</span>
                  </button>
                </div>
              </div>
              <div className="grid gap-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{review.customer_name}</h4>
                      <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                      {review.is_verified && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Verified</span>}
                      {!review.is_published && <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Draft</span>}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{review.review_text}</p>
                    <p className="text-xs text-gray-500">Product: {review.products?.name}</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => { setEditingReview(review); setReviewFormData({ product_id: review.product_id, customer_name: review.customer_name, rating: review.rating, review_text: review.review_text, is_verified: review.is_verified, is_published: review.is_published }); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteReview(review)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Testimonials</h2>
              <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-gold-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
                  {editingTestimonial && (
                    <button onClick={() => { setEditingTestimonial(null); setTestimonialFormData({ customer_name: '', customer_title: '', rating: 5, testimonial_text: '', is_featured: false, is_published: true }); }} className="text-gray-500 hover:text-gray-700">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Customer Name" value={testimonialFormData.customer_name} onChange={(e) => setTestimonialFormData({ ...testimonialFormData, customer_name: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <input type="text" placeholder="Customer Title (optional)" value={testimonialFormData.customer_title} onChange={(e) => setTestimonialFormData({ ...testimonialFormData, customer_title: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <select value={testimonialFormData.rating} onChange={(e) => setTestimonialFormData({ ...testimonialFormData, rating: parseInt(e.target.value) })} className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500">
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="is_featured_testimonial" checked={testimonialFormData.is_featured} onChange={(e) => setTestimonialFormData({ ...testimonialFormData, is_featured: e.target.checked })} className="w-4 h-4" />
                      <label htmlFor="is_featured_testimonial" className="text-sm">Featured</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="is_published_testimonial" checked={testimonialFormData.is_published} onChange={(e) => setTestimonialFormData({ ...testimonialFormData, is_published: e.target.checked })} className="w-4 h-4" />
                      <label htmlFor="is_published_testimonial" className="text-sm">Published</label>
                    </div>
                  </div>
                  <textarea placeholder="Testimonial Text" value={testimonialFormData.testimonial_text} onChange={(e) => setTestimonialFormData({ ...testimonialFormData, testimonial_text: e.target.value })} rows={3} className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500" />
                  <button onClick={saveTestimonial} disabled={isLoading || !testimonialFormData.customer_name || !testimonialFormData.testimonial_text} className="md:col-span-2 px-6 py-2 bg-gold-600 text-white rounded-sm hover:bg-gold-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>{editingTestimonial ? 'Update' : 'Add'} Testimonial</span>
                  </button>
                </div>
              </div>
              <div className="grid gap-4">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{testimonial.customer_name}</h4>
                      {testimonial.customer_title && <span className="text-sm text-gray-500">- {testimonial.customer_title}</span>}
                      <span className="text-yellow-500">{'★'.repeat(testimonial.rating)}</span>
                      {testimonial.is_featured && <span className="text-xs bg-gold-100 text-gold-700 px-2 py-1 rounded">Featured</span>}
                      {!testimonial.is_published && <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Draft</span>}
                    </div>
                    <p className="text-sm text-gray-600">{testimonial.testimonial_text}</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => { setEditingTestimonial(testimonial); setTestimonialFormData({ customer_name: testimonial.customer_name, customer_title: testimonial.customer_title || '', rating: testimonial.rating, testimonial_text: testimonial.testimonial_text, is_featured: testimonial.is_featured, is_published: testimonial.is_published }); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteTestimonial(testimonial)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Contact Submissions Tab */}
            <TabsContent value="contact" className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Contact Submissions</h2>
              <div className="grid gap-4">
                {contactSubmissions.length === 0 ? (
                  <p className="text-gray-500">No contact submissions yet.</p>
                ) : (
                  contactSubmissions.map((submission) => (
                    <div key={submission.id} className={`border rounded-lg p-4 ${submission.is_read ? 'bg-white' : 'bg-blue-50 border-blue-200'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{submission.name}</h4>
                          <p className="text-sm text-gray-600">{submission.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {!submission.is_read && (
                            <button onClick={() => markAsRead(submission.id)} className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                              Mark Read
                            </button>
                          )}
                          <span className="text-xs text-gray-500">
                            {new Date(submission.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{submission.message}</p>
                      {submission.file_url && (
                        <a href={submission.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
                          View Attachment →
                        </a>
                      )}
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
