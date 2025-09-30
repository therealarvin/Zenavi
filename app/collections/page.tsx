'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const collections = [
  {
    id: 'bridal',
    name: 'Bridal Collection',
    description: 'Exquisite pieces for your special day, crafted with love and attention to detail',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200',
    productCount: 45,
  },
  {
    id: 'diamond-essentials',
    name: 'Diamond Essentials',
    description: 'Timeless diamonds for everyday luxury and special occasions',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200',
    productCount: 32,
  },
  {
    id: 'gold-heritage',
    name: 'Gold Heritage',
    description: 'Traditional designs with modern elegance, celebrating cultural richness',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200',
    productCount: 58,
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple, elegant pieces for the modern minimalist',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200',
    productCount: 28,
  },
  {
    id: 'statement',
    name: 'Statement Pieces',
    description: 'Bold designs that make a lasting impression',
    image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=1200',
    productCount: 22,
  },
  {
    id: 'vintage',
    name: 'Vintage Inspired',
    description: 'Timeless designs inspired by bygone eras',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200',
    productCount: 35,
  },
]

export default function CollectionsPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1920"
          alt="Collections"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center text-white text-center"
        >
          <div>
            <h1 className="heading-1 mb-4">Our Collections</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Curated collections for every style and occasion
            </p>
          </div>
        </motion.div>
      </section>

      {/* Collections Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/collections/${collection.id}`}>
                  <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-serif font-semibold mb-2">
                        {collection.name}
                      </h3>
                      <p className="text-sm mb-3 opacity-90">
                        {collection.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm opacity-75">
                          {collection.productCount} Products
                        </span>
                        <motion.div
                          className="flex items-center space-x-2 text-sm font-medium"
                          whileHover={{ x: 5 }}
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gold-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cream">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-3 text-charcoal mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our expert consultants are here to help you find or create the perfect piece
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gold-600 text-white px-8 py-3 rounded-sm hover:bg-gold-700 transition-colors"
            >
              Book a Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}