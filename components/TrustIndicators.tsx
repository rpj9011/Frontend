'use client'

import { motion } from 'framer-motion'

export default function TrustIndicators() {
  const clients = [
    { name: 'TechStart Solutions', logo: '/TechStart.png' },
    { name: 'RetailHub India', logo: '/RetailHub.png' },
    { name: 'FinanceGrow', logo: '/FinanceGrow.png' },
    { name: 'HealthPlus Clinics', logo: '/HealthPlus.png' },
    { name: 'LuxuryStay Hotels', logo: '/LuxuryStay.png' },
    { name: 'EduTech Academy', logo: '/EduTech.png' },
  ]

  return (
    <section className="relative py-32 bg-luxury-off-white overflow-hidden">
      {/* Subtle grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
      
      {/* Subtle gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-luxury-gold/3 blur-3xl rounded-full pointer-events-none"></div>
      
      {/* Subtle horizontal divider line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Enhanced Section Title */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-luxury-mid-gray/70 mb-4 uppercase tracking-ultra-wide font-light">
            Select Partnerships
          </p>
          <div className="w-12 h-[1px] bg-luxury-gold/40 mx-auto mb-6"></div>
          <h3 className="text-2xl font-display font-light text-luxury-charcoal tracking-luxury">
            Trusted by Growing Brands
          </h3>
        </motion.div>

        {/* Premium Client Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Glass Container */}
              <div className="relative h-20 bg-white/60 backdrop-blur-sm border border-luxury-gold/10 rounded-2xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:border-luxury-gold/30 hover:shadow-lg hover:shadow-luxury-gold/10">
                
                {/* Client Logo */}
                <div className="flex items-center justify-center w-full h-full p-3">
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100"
                  />
                </div>

                {/* Subtle hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-luxury-gold/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
