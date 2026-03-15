'use client'

import { useState, useEffect, useRef } from 'react'

export default function Portfolio() {
  const [filter, setFilter] = useState('all')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const projects = [
    {
      client: 'TechStart Solutions',
      logo: '/TechStart.png',
      industry: 'SaaS',
      category: 'web',
      problem: 'Low conversion rate on landing page',
      solution: 'Redesigned UX with A/B tested conversion funnels',
      metrics: [
        { label: 'Conversion Rate', value: '+187%' },
        { label: 'Revenue Growth', value: '+142%' },
      ],
    },
    {
      client: 'RetailHub India',
      logo: '/RetailHub.png',
      industry: 'E-commerce',
      category: 'web',
      problem: 'Slow website affecting sales',
      solution: 'Built high-performance Next.js e-commerce platform',
      metrics: [
        { label: 'Revenue Growth', value: '+89%' },
        { label: 'Load Time', value: '-65%' },
      ],
    },
    {
      client: 'FinanceGrow',
      logo: '/FinanceGrow.png',
      industry: 'Financial Services',
      category: 'marketing',
      problem: 'High CAC, low quality leads',
      solution: 'Implemented targeted SEO and Google Ads strategy',
      metrics: [
        { label: 'CAC Reduction', value: '-62%' },
        { label: 'Lead Quality', value: '+210%' },
      ],
    },
    {
      client: 'HealthPlus Clinics',
      logo: '/HealthPlus.png',
      industry: 'Healthcare',
      category: 'marketing',
      problem: 'Zero online visibility',
      solution: 'Local SEO + Google My Business optimization',
      metrics: [
        { label: 'Organic Traffic', value: '+320%' },
        { label: 'Appointments', value: '+156%' },
      ],
    },
    {
      client: 'LuxuryStay Hotels',
      logo: '/LuxuryStay.png',
      industry: 'Hospitality',
      category: 'branding',
      problem: 'Outdated brand identity',
      solution: 'Complete brand refresh with digital strategy',
      metrics: [
        { label: 'Direct Bookings', value: '+78%' },
        { label: 'Brand Recall', value: '+94%' },
      ],
    },
    {
      client: 'EduTech Academy',
      logo: '/EduTech.png',
      industry: 'Education',
      category: 'web',
      problem: 'Complex enrollment process',
      solution: 'Custom LMS with automated workflows',
      metrics: [
        { label: 'Enrollments', value: '+210%' },
        { label: 'Process Time', value: '-73%' },
      ],
    },
  ]

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'branding', label: 'Branding' },
    { id: 'performance', label: 'Performance' },
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter)

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
        id="portfolio" 
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
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-luxury-gold/5 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-display font-light text-luxury-off-white leading-tight tracking-luxury">
              Selected Work
            </h2>
            <div className="w-16 h-[1px] bg-luxury-gold/60 mt-10 mx-auto"></div>
            <p className="text-luxury-warm-gray/80 mt-10 text-base max-w-2xl mx-auto font-light leading-loose">
              Real projects. Measurable results. Sustainable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="relative py-32 px-8 sm:px-12 lg:px-16 bg-luxury-off-white overflow-hidden">
        {/* Subtle depth */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-luxury-gold/3 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Filter Buttons */}
          <div className={`flex flex-wrap justify-center gap-4 mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`relative px-8 py-3 font-light text-xs tracking-ultra-wide uppercase transition-all duration-500 ${
                  filter === cat.id
                    ? 'bg-luxury-charcoal text-luxury-off-white'
                    : 'bg-white/60 text-luxury-charcoal hover:bg-white border border-luxury-gold/10 hover:border-luxury-gold/30'
                }`}
              >
                {cat.label}
                {filter === cat.id && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-luxury-gold translate-y-2" />
                )}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-10">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className={`group relative bg-white/60 backdrop-blur-sm border border-luxury-gold/10 rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-luxury-gold/5 hover:border-luxury-gold/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Visual Preview */}
<div className="relative h-80 bg-gradient-to-br from-luxury-charcoal-light to-luxury-charcoal overflow-hidden">
                  {/* Logo Display */}
                  <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                    <img 
                      src={project.logo} 
                      alt={project.client}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  
                  {/* Grain texture */}
                  <div 
                    className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  
                  {/* Category badge */}
                  <div className="absolute top-6 right-6 bg-luxury-charcoal/80 backdrop-blur-sm text-luxury-gold text-xs px-4 py-2 border border-luxury-gold/20 font-light tracking-luxury uppercase">
                    {project.category}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-luxury-gold/0 group-hover:bg-luxury-gold/10 transition-all duration-700" />
                </div>

                {/* Content */}
                <div className="p-10">
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-3xl font-display font-light text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-500">
                      {project.client}
                    </h3>
                    <span className="text-xs text-luxury-mid-gray uppercase tracking-luxury font-light whitespace-nowrap ml-4">
                      {project.industry}
                    </span>
                  </div>

                  <div className="space-y-6 text-sm">
                    <div>
                      <p className="uppercase text-xs text-luxury-mid-gray tracking-ultra-wide mb-2 font-light">
                        Problem
                      </p>
                      <p className="text-luxury-charcoal/80 leading-relaxed font-light">
                        {project.problem}
                      </p>
                    </div>

                    <div>
                      <p className="uppercase text-xs text-luxury-mid-gray tracking-ultra-wide mb-2 font-light">
                        Solution
                      </p>
                      <p className="text-luxury-charcoal/80 leading-relaxed font-light">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="mt-10 pt-8 border-t border-luxury-gold/10">
                    <div className="grid grid-cols-2 gap-6">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx}>
                          <div className="text-3xl font-display font-light text-luxury-gold mb-1 group-hover:scale-105 transition-transform duration-500 origin-left">
                            {metric.value}
                          </div>
                          <div className="text-xs text-luxury-mid-gray uppercase tracking-luxury font-light">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
