'use client'

import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      designation: 'CEO',
      company: 'TechStart Solutions',
      content: 'AgencyK transformed our digital presence completely. The new website increased our conversion rate by 187% in just 3 months. Their team understands business, not just technology.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      designation: 'Marketing Director',
      company: 'RetailHub India',
      content: 'Working with AgencyK was a game-changer. They delivered a lightning-fast e-commerce platform that handles our growing traffic effortlessly. Revenue is up 89% year-over-year.',
      rating: 5,
    },
    {
      name: 'Amit Patel',
      designation: 'Founder',
      company: 'FinanceGrow',
      content: 'Finally, an agency that focuses on ROI instead of vanity metrics. Our cost per acquisition dropped by 62% while lead quality improved dramatically. Highly recommend their strategic approach.',
      rating: 5,
    },
    {
      name: 'Sneha Reddy',
      designation: 'Operations Head',
      company: 'HealthPlus Clinics',
      content: 'The local SEO strategy they implemented brought us from zero online visibility to page 1 rankings. Patient appointments increased by 95%. Professional team, measurable results.',
      rating: 5,
    },
    {
      name: 'Vikram Singh',
      designation: 'Managing Director',
      company: 'LuxuryStay Hotels',
      content: 'AgencyK helped us modernize our brand and digital strategy. The results exceeded expectations—bookings up 78% and our average order value increased by 35%. Worth every rupee.',
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="relative py-32 px-8 sm:px-12 lg:px-16 bg-luxury-off-white overflow-hidden">
      {/* Subtle grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
      
      {/* Subtle gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-luxury-gold/3 blur-3xl rounded-full pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Premium Header */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl lg:text-6xl font-display font-light text-luxury-charcoal leading-tight tracking-luxury mb-6">
            What Our Clients Say
          </h2>
          <div className="w-16 h-[1px] bg-luxury-gold/60 mx-auto mb-8"></div>
          <p className="text-luxury-mid-gray text-base max-w-2xl mx-auto font-light leading-loose">
            Real partnerships. Real measurable outcomes.
          </p>
        </motion.div>

        {/* Premium Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative p-10 rounded-2xl bg-white/80 backdrop-blur-sm border border-luxury-gold/10 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-luxury-gold/10 hover:border-luxury-gold/30 hover:bg-white/90"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Gold Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-luxury-gold to-luxury-gold-muted rounded-t-2xl transition-all duration-500 group-hover:h-[3px] group-hover:shadow-lg group-hover:shadow-luxury-gold/30"></div>
              
              {/* Quote Symbol */}
              <div className="absolute top-8 right-8 text-luxury-gold/10 text-7xl font-display leading-none transition-all duration-500 group-hover:text-luxury-gold/20">
                "
              </div>
              
              {/* Stars */}
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-luxury-gold fill-luxury-gold group-hover:scale-110 transition-transform duration-300" size={18} />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-luxury-charcoal/80 leading-relaxed text-base mb-8 relative z-10 font-light">
                "{testimonial.content}"
              </p>
              
              {/* Divider */}
              <div className="h-[1px] bg-luxury-gold/20 mb-6 group-hover:bg-luxury-gold/40 transition-colors duration-300"></div>
              
              {/* Client Info */}
              <div className="relative z-10">
                <p className="font-display font-medium text-luxury-charcoal text-lg group-hover:text-luxury-gold transition-colors duration-300">
                  {testimonial.name}
                </p>
                <p className="text-luxury-mid-gray text-sm mt-1 font-light tracking-wide">
                  {testimonial.designation}, {testimonial.company}
                </p>
              </div>

              {/* Subtle hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-luxury-gold/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Row - 2 Cards Centered */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {testimonials.slice(3).map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative p-10 rounded-2xl bg-white/80 backdrop-blur-sm border border-luxury-gold/10 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-luxury-gold/10 hover:border-luxury-gold/30 hover:bg-white/90"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
            >
              {/* Gold Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-luxury-gold to-luxury-gold-muted rounded-t-2xl transition-all duration-500 group-hover:h-[3px] group-hover:shadow-lg group-hover:shadow-luxury-gold/30"></div>
              
              {/* Quote Symbol */}
              <div className="absolute top-8 right-8 text-luxury-gold/10 text-7xl font-display leading-none transition-all duration-500 group-hover:text-luxury-gold/20">
                "
              </div>
              
              {/* Stars */}
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-luxury-gold fill-luxury-gold group-hover:scale-110 transition-transform duration-300" size={18} />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-luxury-charcoal/80 leading-relaxed text-base mb-8 relative z-10 font-light">
                "{testimonial.content}"
              </p>
              
              {/* Divider */}
              <div className="h-[1px] bg-luxury-gold/20 mb-6 group-hover:bg-luxury-gold/40 transition-colors duration-300"></div>
              
              {/* Client Info */}
              <div className="relative z-10">
                <p className="font-display font-medium text-luxury-charcoal text-lg group-hover:text-luxury-gold transition-colors duration-300">
                  {testimonial.name}
                </p>
                <p className="text-luxury-mid-gray text-sm mt-1 font-light tracking-wide">
                  {testimonial.designation}, {testimonial.company}
                </p>
              </div>

              {/* Subtle hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-luxury-gold/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicator Row */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-luxury-mid-gray/70 text-xs uppercase tracking-ultra-wide mb-8 font-light">
            Trusted by 6+ Businesses
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {['TechStart', 'RetailHub', 'FinanceGrow', 'HealthPlus', 'LuxuryStay'].map((company, index) => (
              <div key={index} className="text-xl font-display font-light text-luxury-gold tracking-luxury hover:opacity-100 transition-opacity duration-300">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}