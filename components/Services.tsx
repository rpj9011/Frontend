'use client'

import { useState, useEffect, useRef } from 'react'
import { Code2, TrendingUp, Target, Palette, Lightbulb, Search } from 'lucide-react'

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const services = [
    {
      icon: Code2,
      title: 'Web Development',
      description: 'High-performance platforms engineered for conversion and scale.',
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Strategic campaigns that drive measurable revenue growth.',
    },
    {
      icon: Target,
      title: 'Performance Marketing',
      description: 'Data-driven optimization across every customer touchpoint.',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Interfaces crafted for intuitive user experiences.',
    },
    {
      icon: Lightbulb,
      title: 'Branding & Strategy',
      description: 'Cohesive brand systems built for market differentiation.',
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Technical SEO architecture for sustainable organic growth.',
    },
  ]


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
    <>
      {/* Hero Section */}
      <section 
        id="services"
        ref={sectionRef}
        className="relative py-32 px-8 sm:px-12 lg:px-16 bg-luxury-charcoal overflow-hidden"
      >
        {/* Grain texture */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay animate-grain"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Subtle background gradient */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-luxury-gold/5 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-display font-light text-luxury-off-white leading-tight tracking-luxury">
              Strategic Digital Services
              <br />
              <span className="text-luxury-gold italic">That Drive Growth</span>
            </h2>
            <div className="w-16 h-[1px] bg-luxury-gold/60 mt-10 mx-auto"></div>
            <p className="text-luxury-warm-gray/80 mt-10 text-base max-w-2xl mx-auto font-light leading-loose">
              Engineered solutions for ambitious brands ready to scale.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-32 px-8 sm:px-12 lg:px-16 bg-luxury-off-white overflow-hidden">
        {/* Subtle depth */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-luxury-gold/3 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className={`group relative bg-white/60 backdrop-blur-sm border border-luxury-gold/10 rounded-sm p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-luxury-gold/5 hover:border-luxury-gold/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className="mb-8">
                    <Icon className="w-10 h-10 text-luxury-gold/60 group-hover:text-luxury-gold transition-colors duration-500" strokeWidth={1} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-display font-light text-luxury-charcoal mb-4 leading-tight group-hover:text-luxury-gold transition-colors duration-500">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-luxury-mid-gray text-sm leading-loose font-light">
                    {service.description}
                  </p>

                  {/* Hover line */}
                  <div className="mt-8 w-0 h-[1px] bg-luxury-gold group-hover:w-12 transition-all duration-700"></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-8 sm:px-12 lg:px-16 bg-gradient-to-br from-luxury-charcoal via-luxury-charcoal-light to-luxury-charcoal overflow-hidden">
        {/* Grain texture */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay animate-grain"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="bg-luxury-charcoal-light/60 backdrop-blur-md border border-luxury-gold/20 rounded-sm p-16">
            <h3 className="text-4xl lg:text-5xl font-display font-light text-luxury-off-white leading-tight tracking-luxury mb-6">
              Let's Build Something
              <br />
              <span className="text-luxury-gold italic">That Converts</span>
            </h3>
            <div className="w-12 h-[1px] bg-luxury-gold/60 mt-8 mb-12 mx-auto"></div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-4 bg-transparent text-luxury-off-white px-12 py-6 border border-luxury-gold/40 hover:bg-luxury-gold/10 hover:border-luxury-gold hover:shadow-2xl hover:shadow-luxury-gold/20 transition-all duration-500 font-light text-xs tracking-ultra-wide uppercase group"
            >
              Start Your Project
              <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
