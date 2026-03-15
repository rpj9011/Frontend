'use client'

import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen hero-mobile flex items-center px-8 sm:px-12 lg:px-16 bg-luxury-charcoal overflow-hidden">
      {/* Animated grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
      
      {/* Subtle gold accent line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto w-full py-32">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          {/* Left: Refined Typography */}
          <div className={`space-y-16 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="space-y-10">
              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-display font-light text-luxury-off-white leading-[1.1] tracking-luxury">
                Engineering Growth
                <br />
                <span className="block mt-4">for Ambitious</span>
                <br />
                <span className="text-luxury-gold italic">Brands</span>
              </h1>
              
              <div className="w-16 h-[1px] bg-luxury-gold/60"></div>
              
              <p className="text-base text-luxury-warm-gray/80 leading-loose max-w-md font-light tracking-wide">
                Strategic systems built for scale.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-4 bg-transparent text-luxury-off-white px-10 py-5 border border-luxury-gold/40 hover:bg-luxury-gold/10 hover:border-luxury-gold transition-all duration-500 font-light text-xs tracking-ultra-wide uppercase group"
              >
                Begin the Conversation
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-4 bg-transparent text-luxury-warm-gray px-10 py-5 border border-luxury-warm-gray/20 hover:text-luxury-off-white hover:border-luxury-warm-gray/40 transition-all duration-500 font-light text-xs tracking-ultra-wide uppercase"
              >
                View Selected Work
              </a>
            </div>
            
            {/* Minimal Stats - Understated */}
            <div className="mt-24 pt-16 border-t border-luxury-gold/10">
              <div className="grid grid-cols-3 gap-12">
                <div>
                  <div className="text-5xl font-display font-light text-luxury-gold mb-2">6+</div>
                  <div className="text-luxury-mid-gray text-xs uppercase tracking-luxury font-light">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-5xl font-display font-light text-luxury-gold mb-2">98%</div>
                  <div className="text-luxury-mid-gray text-xs uppercase tracking-luxury font-light">Client Retention</div>
                </div>
                <div>
                  <div className="text-5xl font-display font-light text-luxury-gold mb-2">3.5x</div>
                  <div className="text-luxury-mid-gray text-xs uppercase tracking-luxury font-light">Average Growth</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Minimal Editorial Image */}
          <div className={`relative ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="relative flex justify-center lg:justify-end">
              {/* Subtle depth card */}
              <div className="absolute -top-12 -right-12 w-[380px] h-[480px] lg:w-[420px] lg:h-[540px] bg-luxury-gold/5 backdrop-blur-sm opacity-30"></div>
              
              {/* Main Image Container - Clean & Minimal */}
              <div className="relative w-[400px] h-[500px] lg:w-[460px] lg:h-[580px] bg-luxury-charcoal-light overflow-hidden border border-luxury-gold/20">
                {/* Image */}
                <div className="relative w-full h-full">
                  <img 
                    src="/Hero_image.jpg" 
                    alt="Digital Excellence"
                    className="w-full h-full object-cover opacity-90"
                  />
                  
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-luxury-charcoal/30"></div>
                  
                  {/* Film grain */}
                  <div 
                    className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
                
                {/* Minimal Badge - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-luxury-charcoal/95 backdrop-blur-md text-luxury-off-white px-8 py-6 border-t border-luxury-gold/20">
                  <div className="text-xs text-luxury-mid-gray uppercase tracking-ultra-wide mb-2 font-light">Engineering Focus</div>
                  <div className="text-2xl font-display font-light text-luxury-gold">Conversion-First Architecture</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
