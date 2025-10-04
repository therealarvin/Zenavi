'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .eq('is_featured', true)
        .order('display_order', { ascending: true })

      if (data && !error) {
        setTestimonials(data)
      }
      setIsLoading(false)
    }

    fetchTestimonials()
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-200 p-12 rounded-lg animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-8" />
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
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
          <h2 className="heading-2 text-charcoal mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their perfect piece at Zenavi
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="bg-cream p-8 md:p-12 rounded-lg"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[currentIndex].rating
                          ? 'fill-gold-500 text-gold-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl font-serif text-charcoal text-center mb-8 leading-relaxed">
                  &quot;{testimonials[currentIndex].testimonial_text}&quot;
                </blockquote>

                <div className="text-center">
                  <p className="font-semibold text-charcoal">
                    {testimonials[currentIndex].customer_name}
                  </p>
                  {testimonials[currentIndex].customer_title && (
                    <p className="text-gray-600">{testimonials[currentIndex].customer_title}</p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full md:-translate-x-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-gold-100 transition-colors group"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 text-charcoal group-hover:text-gold-600" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full md:translate-x-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-gold-100 transition-colors group"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 text-charcoal group-hover:text-gold-600" />
                </button>
              </>
            )}
          </div>

          {/* Dots Indicator */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'w-8 bg-gold-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
