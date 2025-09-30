'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { createClient } from '@/lib/supabase/client'

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [slides, setSlides] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch slides from Supabase
  useEffect(() => {
    const fetchSlides = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })

      if (data && !error) {
        setSlides(data)
      }
      setIsLoading(false)
    }

    fetchSlides()
  }, [])

  useEffect(() => {
    if (!emblaApi || slides.length === 0) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)

    return () => {
      clearInterval(interval)
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, slides])

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()
  const scrollTo = (index: number) => emblaApi?.scrollTo(index)

  if (isLoading) {
    return (
      <section className="relative h-screen overflow-hidden bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      </section>
    )
  }

  if (slides.length === 0) {
    return (
      <section className="relative h-screen overflow-hidden bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <p className="text-xl">No slides available</p>
            <p className="text-sm mt-2">Add slides from the admin panel</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full flex">
          {slides.map((slide, index) => (
            <div className="embla__slide relative h-full flex-[0_0_100%]" key={slide.id}>
              <Image
                src={slide.image_url}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: selectedIndex === index ? 1 : 0, y: selectedIndex === index ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center text-white px-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0, y: selectedIndex === index ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="heading-1 mb-4"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0, y: selectedIndex === index ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-xl md:text-2xl mb-8 font-light"
                  >
                    {slide.subtitle}
                  </motion.p>
                  {slide.button_text && slide.button_link && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: selectedIndex === index ? 1 : 0, scale: selectedIndex === index ? 1 : 0.9 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      <Link
                        href={slide.button_link}
                        className="inline-block bg-white text-charcoal px-10 py-4 font-medium tracking-wide hover:bg-gold-100 transition-all duration-300 transform hover:scale-105"
                      >
                        {slide.button_text}
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              selectedIndex === index
                ? 'w-8 bg-white'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection
