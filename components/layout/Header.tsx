'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Collections', href: '/collections' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <motion.header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-6'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={cn(
                'font-serif text-2xl md:text-3xl font-bold transition-colors duration-300',
                isScrolled ? 'text-charcoal' : 'text-white'
              )}
            >
              ZENAVI
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'font-medium tracking-wide hover:text-gold-600 transition-colors duration-300',
                  isScrolled ? 'text-charcoal' : 'text-white'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'p-2 transition-colors duration-300',
                isScrolled ? 'text-charcoal hover:text-gold-600' : 'text-white hover:text-gold-300'
              )}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'p-2 transition-colors duration-300',
                isScrolled ? 'text-charcoal hover:text-gold-600' : 'text-white hover:text-gold-300'
              )}
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'p-2 relative transition-colors duration-300',
                isScrolled ? 'text-charcoal hover:text-gold-600' : 'text-white hover:text-gold-300'
              )}
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-gold-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                'lg:hidden p-2 transition-colors duration-300',
                isScrolled ? 'text-charcoal' : 'text-white'
              )}
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="container py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-3 text-charcoal hover:text-gold-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header