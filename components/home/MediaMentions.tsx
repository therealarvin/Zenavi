'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

const MediaMentions = () => {
  const [mediaMentions, setMediaMentions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMediaMentions = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('media_mentions')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })

      if (data && !error) {
        setMediaMentions(data)
      }
      setIsLoading(false)
    }

    fetchMediaMentions()
  }, [])

  if (isLoading) {
    return (
      <section className="py-16 bg-cream">
        <div className="container">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-24 h-12 bg-gray-300 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (mediaMentions.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-cream">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-lg font-medium text-gray-600 mb-8">As Featured In</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {mediaMentions.map((media, index) => (
            <motion.div
              key={media.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="transition-colors cursor-pointer"
            >
              {media.logo_url ? (
                <div className="relative w-24 h-12 md:w-32 md:h-16 grayscale hover:grayscale-0 transition-all">
                  <Image
                    src={media.logo_url}
                    alt={media.publication_name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="text-2xl md:text-3xl font-serif text-gray-400 hover:text-gold-600 transition-colors">
                  {media.publication_name.toUpperCase()}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default MediaMentions
