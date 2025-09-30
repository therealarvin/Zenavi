'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, X, ChevronDown, Grid, List, Heart, Eye, ShoppingBag } from 'lucide-react'
import * as Slider from '@radix-ui/react-slider'
import * as Select from '@radix-ui/react-select'
import { formatPrice } from '@/lib/utils'

import { createClient } from '@/lib/supabase/client'
import { useEffect } from 'react'

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  // Filter states
  const [filters, setFilters] = useState({
    category: 'all',
    material: 'all',
    karat: 'all',
    priceRange: [0, 5000],
  })

  const [categories, setCategories] = useState<any[]>([])

  const materials = ['all', 'gold', 'diamond']
  const karats = ['all', '14K', '18K', '22K']

  // Fetch products and categories from Supabase
  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      // Fetch products with their primary images and categories
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          product_images!inner(image_url, is_primary),
          product_categories(
            categories(name)
          )
        `)
        .eq('is_active', true)
        .eq('product_images.is_primary', true)
        .order('created_at', { ascending: false })

      // Fetch categories for filter dropdown
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('name')
        .eq('is_active', true)
        .eq('category_type', 'type')
        .order('display_order', { ascending: true })

      if (productsData && !productsError) {
        const transformedProducts = productsData.map(product => ({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          salePrice: product.sale_price,
          image: product.product_images[0]?.image_url || '',
          category: product.product_categories?.[0]?.categories?.name || 'Jewelry',
          material: product.material_type,
          karat: product.karat,
        }))
        setProducts(transformedProducts)
        setFilteredProducts(transformedProducts)
      }

      if (categoriesData && !categoriesError) {
        setCategories(['all', ...categoriesData.map(cat => cat.name)])
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const applyFilters = () => {
    let filtered = products

    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category)
    }
    if (filters.material !== 'all') {
      filtered = filtered.filter(p => p.material === filters.material)
    }
    if (filters.karat !== 'all') {
      filtered = filtered.filter(p => p.karat === filters.karat)
    }
    filtered = filtered.filter(p => {
      const price = p.salePrice || p.price
      return price >= filters.priceRange[0] && price <= filters.priceRange[1]
    })

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
        break
      case 'price-high':
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Featured/default sorting
        break
    }

    setFilteredProducts(filtered)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20">
        <section className="py-12 bg-cream">
          <div className="container">
            <div className="text-center">
              <div className="h-10 bg-gray-200 rounded w-64 mx-auto animate-pulse mb-4" />
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
            </div>
          </div>
        </section>
        <section className="py-8 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-gray-200 aspect-square rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-12 bg-cream">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="heading-2 text-charcoal mb-4">Shop All Jewellery</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our exquisite collection of handcrafted fine jewellery
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="container">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {isFilterOpen && <X className="w-4 h-4" />}
            </button>

            <div className="flex items-center space-x-4">
              <Select.Root value={sortBy} onValueChange={setSortBy}>
                <Select.Trigger className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors">
                  <Select.Value />
                  <ChevronDown className="w-4 h-4" />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white border border-gray-200 rounded-sm shadow-lg">
                    <Select.Viewport className="p-2">
                      <Select.Item value="featured" className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-sm">
                        <Select.ItemText>Featured</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="price-low" className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-sm">
                        <Select.ItemText>Price: Low to High</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="price-high" className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-sm">
                        <Select.ItemText>Price: High to Low</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="name" className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-sm">
                        <Select.ItemText>Name</Select.ItemText>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-sm ${viewMode === 'grid' ? 'bg-gold-100 text-gold-600' : 'text-gray-400 hover:text-gray-600'}`}
                  aria-label="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-sm ${viewMode === 'list' ? 'bg-gold-100 text-gold-600' : 'text-gray-400 hover:text-gray-600'}`}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-6 bg-gray-50 rounded-lg overflow-hidden"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Material Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                    <select
                      value={filters.material}
                      onChange={(e) => setFilters({ ...filters, material: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500"
                    >
                      {materials.map(mat => (
                        <option key={mat} value={mat}>
                          {mat === 'all' ? 'All Materials' : mat.charAt(0).toUpperCase() + mat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Karat Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Karat</label>
                    <select
                      value={filters.karat}
                      onChange={(e) => setFilters({ ...filters, karat: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold-500"
                    >
                      {karats.map(k => (
                        <option key={k} value={k}>{k === 'all' ? 'All Karats' : k}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                    </label>
                    <Slider.Root
                      className="relative flex items-center select-none touch-none w-full h-5"
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                      max={5000}
                      step={100}
                      minStepsBetweenThumbs={1}
                    >
                      <Slider.Track className="bg-gray-300 relative grow rounded-full h-[3px]">
                        <Slider.Range className="absolute bg-gold-600 rounded-full h-full" />
                      </Slider.Track>
                      <Slider.Thumb className="block w-5 h-5 bg-white shadow-lg rounded-full hover:bg-gray-50 focus:outline-none focus:shadow-md" />
                      <Slider.Thumb className="block w-5 h-5 bg-white shadow-lg rounded-full hover:bg-gray-50 focus:outline-none focus:shadow-md" />
                    </Slider.Root>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      setFilters({
                        category: 'all',
                        material: 'all',
                        karat: 'all',
                        priceRange: [0, 5000],
                      })
                    }}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={applyFilters}
                    className="px-6 py-2 bg-gold-600 text-white rounded-sm hover:bg-gold-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="mb-4 text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>

          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className={viewMode === 'grid' ? 'group' : 'group flex bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow'}
              >
                <div className={viewMode === 'grid' ? 'relative bg-white overflow-hidden' : 'flex items-center space-x-4 w-full'}>
                  <Link href={`/products/${product.slug}`}>
                    <div className={viewMode === 'grid' ? 'relative aspect-square' : 'relative w-32 h-32 flex-shrink-0'}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {product.salePrice && viewMode === 'grid' && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-medium">
                          SALE
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Quick Actions for Grid View */}
                  {viewMode === 'grid' && (
                    <AnimatePresence>
                      {hoveredProduct === product.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-2 right-2 flex flex-col space-y-2"
                        >
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white p-2 rounded-full shadow-lg hover:bg-gold-100 transition-colors"
                          >
                            <Heart className="w-4 h-4 text-charcoal" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white p-2 rounded-full shadow-lg hover:bg-gold-100 transition-colors"
                          >
                            <Eye className="w-4 h-4 text-charcoal" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white p-2 rounded-full shadow-lg hover:bg-gold-100 transition-colors"
                          >
                            <ShoppingBag className="w-4 h-4 text-charcoal" />
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  <div className={viewMode === 'grid' ? 'p-4' : 'flex-1'}>
                    <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                    <h3 className="font-medium text-charcoal mb-2 group-hover:text-gold-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {product.salePrice ? (
                        <>
                          <span className="text-lg font-semibold text-red-500">
                            {formatPrice(product.salePrice)}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            {formatPrice(product.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-semibold text-charcoal">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>

                    {/* Actions for List View */}
                    {viewMode === 'list' && (
                      <div className="mt-3 flex space-x-2">
                        <button className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors">
                          <Heart className="w-3 h-3" />
                          <span>Wishlist</span>
                        </button>
                        <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-gold-600 text-white rounded-sm hover:bg-gold-700 transition-colors">
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}