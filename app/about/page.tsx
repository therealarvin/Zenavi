'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Gem, Heart, Leaf, Award } from 'lucide-react'

const values = [
  {
    icon: Gem,
    title: 'Master Craftsmanship',
    description: 'Each piece is meticulously handcrafted by our skilled artisans with decades of experience.',
  },
  {
    icon: Leaf,
    title: 'Ethical Sourcing',
    description: 'We use only lab-grown diamonds and responsibly sourced materials for sustainable luxury.',
  },
  {
    icon: Heart,
    title: 'Timeless Design',
    description: 'Our designs blend classic elegance with contemporary style to create pieces that transcend trends.',
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    description: 'Every piece comes with certification and our lifetime quality assurance.',
  },
]

export default function AboutPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=1920"
          alt="Jewelry workshop"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center text-white text-center"
        >
          <div>
            <h1 className="heading-1 mb-4">Our Story</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Crafting timeless elegance since our founding
            </p>
          </div>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-2 mb-6 text-charcoal">
                A Legacy of Excellence
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                At Zenavi, we believe jewellery should be more than beautiful— it should be meaningful.
                Founded on the principles of craftsmanship, sustainability, and timeless design, our
                pieces are made to be cherished for a lifetime and passed on for generations.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Every piece we create is a testament to our dedication to excellence. From the initial
                sketch to the final polish, our master artisans pour their skill and passion into
                creating jewellery that tells your unique story.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We source only the finest materials, including lab-grown diamonds that offer the same
                brilliance and beauty as mined stones, but with a smaller environmental footprint.
                This commitment to ethical practices ensures that your jewellery is not just beautiful,
                but also responsible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[500px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800"
                alt="Craftsman at work"
                fill
                className="object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-cream">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 text-charcoal mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide every piece we create
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4"
                >
                  <value.icon className="w-8 h-8 text-gold-600" />
                </motion.div>
                <h3 className="font-semibold text-charcoal mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-3 mb-8 text-charcoal">Founders&apos; Note</h2>
              <blockquote className="text-xl font-serif text-gray-700 italic leading-relaxed mb-6">
                &quot;Every piece we create tells a story. Your story. From the moment you first hold
                one of our creations, it becomes part of your journey—marking milestones,
                celebrating love, and creating memories that last forever. This is why we pour
                our hearts into every detail, ensuring that each piece is worthy of the moments
                it will witness.&quot;
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full" />
                <div className="text-left">
                  <p className="font-semibold text-charcoal">Alexandra Zenavi</p>
                  <p className="text-gray-600 text-sm">Founder & Creative Director</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}