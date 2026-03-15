'use client'

import { useEffect, useRef, useState } from 'react'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-40 px-8 sm:px-12 lg:px-16 bg-luxury-charcoal relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle, #C6A45C 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />

      <div className="max-w-6xl mx-auto relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Refined Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-5xl lg:text-6xl font-display font-light leading-tight text-luxury-off-white tracking-luxury mb-12">
              Most agencies promise results.
              <br />
              <span className="text-luxury-gold italic">We engineer them.</span>
            </h2>
            
            <div className="w-12 h-[1px] bg-luxury-gold/60 mx-auto mb-16" />
            
            <div className="space-y-8 text-luxury-warm-gray/70 leading-loose max-w-2xl mx-auto font-light text-base">
              <p>
                Since 2018, we've partnered with over 150 businesses to architect digital systems that convert ambition into measurable revenue.
              </p>
              <p className="text-luxury-off-white/90 text-lg font-light italic">
                Make growth predictable and profitable.
              </p>
            </div>

            {/* Elegant Metrics */}
            <div className="flex justify-center gap-20 mt-24 pt-16 border-t border-luxury-gold/10">
              {[
                { value: '6+', label: 'Projects Delivered' },
                { value: '98%', label: 'Client Retention' },
                { value: '3.5x', label: 'Average Growth' },
              ].map((metric, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                >
                  <div className="text-4xl font-display font-light text-luxury-gold mb-3">{metric.value}</div>
                  <div className="text-xs text-luxury-mid-gray uppercase tracking-ultra-wide font-light">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
