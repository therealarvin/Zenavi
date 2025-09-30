'use client'

import Link from 'next/link'
import { Instagram, Facebook, Mail, Phone, MapPin, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { name: 'Gold Jewellery', href: '/shop/gold' },
      { name: 'Diamond Jewellery', href: '/shop/diamond' },
      { name: 'New Arrivals', href: '/shop/new' },
      { name: 'Sale', href: '/shop/sale' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Location', href: '/location' },
      { name: 'Careers', href: '/careers' },
    ],
    policies: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Shipping Policy', href: '/shipping' },
      { name: 'Returns Policy', href: '/returns' },
      { name: 'Terms & Conditions', href: '/terms' },
    ],
  }

  return (
    <footer className="bg-charcoal text-white mt-20">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-3xl font-bold mb-4 text-gold-400">ZENAVI</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Discover handcrafted fine jewellery designed to celebrate your moments, big and small.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold-600 p-2 rounded-full hover:bg-gold-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold-600 p-2 rounded-full hover:bg-gold-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gold-400">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gold-400">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gold-400">Contact Info</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>hello@zenavi.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>123 Luxury Lane, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Mon-Sat: 10AM-7PM<br />Sun: 12PM-5PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Zenavi Jewellery. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {footerLinks.policies.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-400 text-sm hover:text-gold-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer