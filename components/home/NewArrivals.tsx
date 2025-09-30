'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Eye, ShoppingBag } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

const NewArrivals = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createClient()

      // Fetch products with their primary images
      const { data: productsData, error } = await supabase
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
        .limit(6)

      if (productsData && !error) {
        // Transform the data to match the component's expected format
        const transformedProducts = productsData.map(product => ({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          salePrice: product.sale_price,
          image: product.product_images[0]?.image_url || '',
          category: product.product_categories?.[0]?.categories?.name || 'Jewelry',
        }))
        setProducts(transformedProducts)
      }
      setIsLoading(false)
    }

    fetchProducts()
  }, [])

  if (isLoading) {
    return (
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto animate-pulse mb-4" />
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 aspect-square rounded animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-cream">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-2 text-charcoal mb-4">New Arrivals</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Discover our latest creations, meticulously crafted for the modern connoisseur
          </p>
          <Link
            href="/shop"
            className="inline-block text-gold-600 font-medium hover:text-gold-700 transition-colors"
          >
            View All Products →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              className="group"
            >
              <div className="relative bg-white overflow-hidden">
                <Link href={`/products/${product.slug}`}>
                  <div className="relative aspect-square">
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    {product.salePrice && (
                      <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-medium">
                        SALE
                      </span>
                    )}
                  </div>
                </Link>

                {/* Quick Actions */}
                <AnimatePresence>
                  {hoveredProduct === product.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-4 right-4 flex flex-col space-y-2"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-gold-100 transition-colors"
                        aria-label="Add to wishlist"
                      >
                        <Heart className="w-5 h-5 text-charcoal" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-gold-100 transition-colors"
                        aria-label="Quick view"
                      >
                        <Eye className="w-5 h-5 text-charcoal" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-gold-100 transition-colors"
                        aria-label="Add to cart"
                      >
                        <ShoppingBag className="w-5 h-5 text-charcoal" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="p-4">
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
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewArrivals
