'use client'

import { Search, Lightbulb, Code2, Rocket, LineChart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Process() {
  const steps = [
    {
      iconName: 'Search',
      title: 'Discovery & Strategy',
      description: 'We analyze your business, competitors, and target audience to build a data-driven roadmap.',
      duration: '1-2 weeks',
    },
    {
      iconName: 'Lightbulb',
      title: 'Planning & Design',
      description: 'Wireframes, prototypes, and strategic planning aligned with your business goals.',
      duration: '2-3 weeks',
    },
    {
      iconName: 'Code2',
      title: 'Development',
      description: 'Clean, scalable code built with modern tech stack and best practices.',
      duration: '4-8 weeks',
    },
    {
      iconName: 'Rocket',
      title: 'Marketing & Launch',
      description: 'Strategic launch with SEO optimization, analytics setup, and initial campaigns.',
      duration: '1-2 weeks',
    },
    {
      iconName: 'LineChart',
      title: 'Optimization & Growth',
      description: 'Continuous testing, optimization, and scaling based on performance data.',
      duration: 'Ongoing',
    },
  ]

  const getIcon = (name: string) => {
    const icons = { Search, Lightbulb, Code2, Rocket, LineChart }
    return icons[name as keyof typeof icons]
  }

  return (
    <section id="process" className="relative py-32 px-8 sm:px-12 lg:px-16 bg-gradient-to-br from-luxury-charcoal via-luxury-charcoal-light to-luxury-charcoal overflow-hidden">
      {/* Grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
      
      {/* Subtle radial glow behind center cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-luxury-gold/3 blur-3xl rounded-full pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl lg:text-6xl font-display font-light text-luxury-off-white leading-tight tracking-luxury mb-6">
            Our Proven Process
          </h2>
          <div className="w-16 h-[1px] bg-luxury-gold/60 mx-auto mb-8"></div>
          <p className="text-luxury-warm-gray/70 text-base max-w-2xl mx-auto font-light leading-loose">
            A systematic approach to delivering exceptional results
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Timeline Spine - Premium gradient line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent -translate-y-1/2 z-0"></div>
          
          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = getIcon(step.iconName)
              return (
                <motion.div 
                  key={index} 
                  className="relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Premium Glassmorphism Card */}
                  <div className="group relative p-8 rounded-3xl bg-luxury-off-white/8 backdrop-blur-md border border-luxury-gold/10 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-luxury-gold/10 hover:border-luxury-gold/30 hover:bg-luxury-off-white/12">
                    
                    {/* Step Number Badge - Gradient with glow */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-luxury-gold to-luxury-gold-muted text-luxury-charcoal flex items-center justify-center font-display font-semibold text-lg shadow-lg shadow-luxury-gold/20 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-luxury-gold/30 group-hover:scale-105 z-20">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Icon Container - Glass effect */}
                    <div className="relative flex justify-center mb-8 mt-8">
                      <div className="w-16 h-16 bg-luxury-gold/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-luxury-gold/20 transition-all duration-300 group-hover:bg-luxury-gold/20 group-hover:border-luxury-gold/40 group-hover:shadow-lg group-hover:shadow-luxury-gold/20 group-hover:rotate-3">
                        <Icon className="text-luxury-gold group-hover:scale-110 transition-all duration-300" size={24} strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative text-center">
                      <h3 className="text-xl font-display font-medium text-luxury-off-white mb-4 leading-tight group-hover:text-luxury-gold transition-colors duration-300">
                        {step.title}
                      </h3>
                      
                      <p className="text-luxury-warm-gray/80 text-sm leading-relaxed mb-6 font-light max-w-xs mx-auto">
                        {step.description}
                      </p>
                      
                      <div className="text-xs text-luxury-mid-gray/70 uppercase tracking-ultra-wide font-light">
                        {step.duration}
                      </div>
                    </div>

                    {/* Subtle hover glow effect */}
                    <div className="absolute inset-0 rounded-3xl bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
