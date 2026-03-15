'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Process', href: '#process' },
    { name: 'Testimonials', href: '#testimonials' },
  ]

  return (
    <nav className="fixed w-full bg-luxury-charcoal/95 backdrop-blur-md z-50 border-b border-luxury-gold/10 h-20">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <a href="#" className="text-xl font-display font-light text-luxury-off-white tracking-luxury">
              Agency<span className="text-luxury-gold italic">K</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-luxury-warm-gray hover:text-luxury-gold transition-colors duration-500 text-xs font-light uppercase tracking-ultra-wide"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-transparent text-luxury-off-white px-6 py-3 border border-luxury-gold/40 hover:bg-luxury-gold/10 hover:border-luxury-gold transition-all duration-500 text-xs font-light uppercase tracking-ultra-wide"
            >
              Begin
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-luxury-off-white"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-luxury-charcoal/98 border-t border-luxury-gold/10">
          <div className="px-8 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-luxury-warm-gray hover:text-luxury-gold py-3 text-xs uppercase tracking-ultra-wide font-light"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="block bg-transparent text-luxury-off-white px-6 py-3 border border-luxury-gold/40 text-center text-xs uppercase tracking-ultra-wide font-light"
              onClick={() => setIsOpen(false)}
            >
              Begin
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
