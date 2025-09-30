'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const FeaturedCollections = () => {
  const [collections, setCollections] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCollections = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(3)

      if (data && !error) {
        setCollections(data)
      }
      setIsLoading(false)
    }

    fetchCollections()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto animate-pulse mb-4" />
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 aspect-[3/4] rounded animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (collections.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-2 text-charcoal mb-4">Featured Collections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections, each piece telling a unique story of craftsmanship and elegance
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <Link href={`/collections/${collection.slug}`}>
                <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                  {collection.image_url && (
                    <Image
                      src={collection.image_url}
                      alt={collection.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  >
                    <ArrowRight className="w-6 h-6 mb-2" />
                    <p className="text-sm">Explore Collection</p>
                  </motion.div>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-serif font-semibold text-charcoal group-hover:text-gold-600 transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-gray-600 mt-2">{collection.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedCollections
