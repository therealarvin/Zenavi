'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <section className="py-20 bg-charcoal text-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="heading-3 mb-4">Stay in Touch</h2>
          <p className="text-gray-300 mb-8">
            Subscribe to receive exclusive offers, new collection previews, and styling tips
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm text-white placeholder-white/60 focus:outline-none focus:border-gold-400 transition-colors"
            />
            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gold-600 hover:bg-gold-700 rounded-sm font-medium tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {status === 'loading' ? (
                <span>Subscribing...</span>
              ) : (
                <>
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-green-400"
            >
              Thank you for subscribing! Check your email for confirmation.
            </motion.p>
          )}

          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-red-400"
            >
              Something went wrong. Please try again.
            </motion.p>
          )}

          <p className="text-xs text-gray-400 mt-6">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from Zenavi Jewellery.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter