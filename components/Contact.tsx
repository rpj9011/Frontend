'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Lock, Shield, Clock, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FormErrors {
  name?: string
  company?: string
  email?: string
  phone?: string
  budget?: string
  services?: string
  message?: string
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    budget: '',
    services: [] as string[],
    message: '',
  })
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [charCount, setCharCount] = useState(0)

  const serviceOptions = [
    'Web Development',
    'Digital Marketing',
    'Performance Marketing',
    'UI/UX Design',
    'Branding & Strategy',
    'SEO Optimization',
    'Brand Identity',
    'E-commerce',
    'SEO',
    'Social Media',
  ]

  const validateField = (name: string, value: any): string | undefined => {
    switch (name) {
      case 'name':
        if (!value || value.length < 2) return 'Name must be at least 2 characters'
        break
      case 'company':
        if (!value) return 'Company name is required'
        break
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value || !emailRegex.test(value)) return 'Valid email is required'
        break
      case 'phone':
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
        if (!value || !phoneRegex.test(value)) return 'Valid phone number is required (no spaces or special characters)'
        break
      case 'budget':
        if (!value) return 'Please select a budget range'
        break
      case 'services':
        if (!Array.isArray(value) || value.length === 0) return 'Select at least one service'
        break
      case 'message':
        if (!value || value.length < 10) return 'Message must be at least 10 characters'
        if (value.length > 1000) return 'Message must not exceed 1000 characters'
        break
    }
    return undefined
  }

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true })
    const error = validateField(field, formData[field as keyof typeof formData])
    setErrors({ ...errors, [field]: error })
  }

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
    if (touched[field]) {
      const error = validateField(field, value)
      setErrors({ ...errors, [field]: error })
    }
    if (field === 'message') {
      setCharCount(value.length)
    }
  }

  const handleServiceToggle = (service: string) => {
    const newServices = formData.services.includes(service)
      ? formData.services.filter(s => s !== service)
      : [...formData.services, service]
    
    handleChange('services', newServices)
  }

  const isFormValid = () => {
    const allErrors = Object.keys(formData).map(key => 
      validateField(key, formData[key as keyof typeof formData])
    )
    return allErrors.every(error => !error)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    setTouched(allTouched)
    
    // Validate all fields
    const allErrors: FormErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) allErrors[key as keyof FormErrors] = error
    })
    
    setErrors(allErrors)
    
    if (Object.keys(allErrors).length > 0) {
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          budget: '',
          services: [],
          message: '',
        })
        setCharCount(0)
        setTouched({})
        setErrors({})
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Something went wrong')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section id="contact" className="min-h-screen flex items-center px-8 sm:px-12 lg:px-16 bg-luxury-charcoal relative overflow-hidden py-32">
      {/* Grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Ambient gold glow */}
      <div className="absolute right-0 top-0 w-[800px] h-[800px] bg-luxury-gold/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left: Refined Messaging */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-5xl lg:text-6xl font-display font-light text-luxury-off-white leading-tight tracking-luxury mb-8">
                Begin the
                <br />
                <span className="text-luxury-gold italic">Conversation</span>
              </h2>
              <div className="w-12 h-[1px] bg-luxury-gold/60 mb-8"></div>
              <p className="text-luxury-warm-gray/70 max-w-md leading-loose text-sm font-light">
                30-minute strategy session to identify growth opportunities.
              </p>
            </div>

            <div className="space-y-6">
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-center gap-6 p-6 border border-luxury-gold/20 bg-luxury-charcoal-light/50 backdrop-blur-sm transition-all duration-500"
              >
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-luxury-gold" size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-light text-luxury-off-white text-xs uppercase tracking-ultra-wide mb-2">Email</div>
                  <a href="mailto:rpj9011@outlook.com" className="text-luxury-gold hover:text-luxury-gold-muted transition-colors duration-500 font-light text-sm">
                    rpj9011@outlook.com
                  </a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-center gap-6 p-6 border border-luxury-gold/20 bg-luxury-charcoal-light/50 backdrop-blur-sm transition-all duration-500"
              >
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-luxury-gold" size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-light text-luxury-off-white text-xs uppercase tracking-ultra-wide mb-2">Phone</div>
                  <a href="tel:+919876543210" className="text-luxury-gold hover:text-luxury-gold-muted transition-colors duration-500 font-light text-sm">
                    +91 9158853996
                  </a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-center gap-6 p-6 border border-luxury-gold/20 bg-luxury-charcoal-light/50 backdrop-blur-sm transition-all duration-500"
              >
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-luxury-gold" size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-light text-luxury-off-white text-xs uppercase tracking-ultra-wide mb-2">Location</div>
                  <p className="text-luxury-warm-gray/70 text-sm font-light leading-relaxed">
                    Pune, India
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Premium Form */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Layered shadow depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 via-luxury-off-white/5 to-luxury-gold/5 opacity-40 rounded-3xl blur-xl"></div>
            
            {/* Glass container */}
            <div className="relative bg-luxury-off-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-luxury-gold/20">
              {/* Noise texture overlay */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-3xl"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle size={72} className="text-luxury-gold mb-6" strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="text-3xl font-display font-light text-luxury-off-white mb-3">
                      Request Received
                    </h3>
                    <p className="text-luxury-warm-gray/80 mb-8 text-sm font-light leading-relaxed max-w-sm">
                      We'll respond within 24 hours with next steps for your project.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-luxury-gold hover:text-luxury-gold-muted transition-colors duration-300 font-light text-xs tracking-ultra-wide uppercase"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="relative space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div className="relative">
                        <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          formData.name || touched.name
                            ? '-top-2 text-xs bg-luxury-charcoal-light px-2 text-luxury-gold'
                            : 'top-4 text-sm text-luxury-warm-gray/60'
                        }`}>
                          Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          onBlur={() => handleBlur('name')}
                          className={`w-full h-14 px-4 pt-2 text-sm bg-luxury-charcoal-light/60 backdrop-blur-sm border ${
                            errors.name && touched.name
                              ? 'border-red-500 animate-shake'
                              : 'border-luxury-gold/20'
                          } rounded-lg text-luxury-off-white placeholder-transparent focus:outline-none focus:border-luxury-gold focus:shadow-[0_0_20px_rgba(198,164,92,0.2)] transition-all duration-300`}
                          placeholder="Name"
                        />
                        {errors.name && touched.name && (
                          <p className="text-red-400 text-xs mt-1 font-light">{errors.name}</p>
                        )}
                      </div>
                      
                      {/* Company Field */}
                      <div className="relative">
                        <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          formData.company || touched.company
                            ? '-top-2 text-xs bg-luxury-charcoal-light px-2 text-luxury-gold'
                            : 'top-4 text-sm text-luxury-warm-gray/60'
                        }`}>
                          Company *
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          onBlur={() => handleBlur('company')}
                          className={`w-full h-14 px-4 pt-2 text-sm bg-luxury-charcoal-light/60 backdrop-blur-sm border ${
                            errors.company && touched.company
                              ? 'border-red-500 animate-shake'
                              : 'border-luxury-gold/20'
                          } rounded-lg text-luxury-off-white placeholder-transparent focus:outline-none focus:border-luxury-gold focus:shadow-[0_0_20px_rgba(198,164,92,0.2)] transition-all duration-300`}
                          placeholder="Company"
                        />
                        {errors.company && touched.company && (
                          <p className="text-red-400 text-xs mt-1 font-light">{errors.company}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Email Field */}
                      <div className="relative">
                        <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          formData.email || touched.email
                            ? '-top-2 text-xs bg-luxury-charcoal-light px-2 text-luxury-gold'
                            : 'top-4 text-sm text-luxury-warm-gray/60'
                        }`}>
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                          className={`w-full h-14 px-4 pt-2 text-sm bg-luxury-charcoal-light/60 backdrop-blur-sm border ${
                            errors.email && touched.email
                              ? 'border-red-500 animate-shake'
                              : 'border-luxury-gold/20'
                          } rounded-lg text-luxury-off-white placeholder-transparent focus:outline-none focus:border-luxury-gold focus:shadow-[0_0_20px_rgba(198,164,92,0.2)] transition-all duration-300`}
                          placeholder="Email"
                        />
                        {errors.email && touched.email && (
                          <p className="text-red-400 text-xs mt-1 font-light">{errors.email}</p>
                        )}
                      </div>
                      
                      {/* Phone Field */}
                      <div className="relative">
                        <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          formData.phone || touched.phone
                            ? '-top-2 text-xs bg-luxury-charcoal-light px-2 text-luxury-gold'
                            : 'top-4 text-sm text-luxury-warm-gray/60'
                        }`}>
                          Phone *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          onBlur={() => handleBlur('phone')}
                          className={`w-full h-14 px-4 pt-2 text-sm bg-luxury-charcoal-light/60 backdrop-blur-sm border ${
                            errors.phone && touched.phone
                              ? 'border-red-500 animate-shake'
                              : 'border-luxury-gold/20'
                          } rounded-lg text-luxury-off-white placeholder-transparent focus:outline-none focus:border-luxury-gold focus:shadow-[0_0_20px_rgba(198,164,92,0.2)] transition-all duration-300`}
                          placeholder="Phone"
                        />
                        {errors.phone && touched.phone && (
                          <p className="text-red-400 text-xs mt-1 font-light">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Budget Field */}
                    <div className="relative">
                      <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        formData.budget
                          ? '-top-2 text-xs bg-luxury-charcoal-light px-2 text-luxury-gold'
                          : 'top-4 text-sm text-luxury-warm-gray/60'
                      }`}>
                        Budget Range *
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => handleChange('budget', e.target.value)}
                        onBlur={() => handleBlur('budget')}
                        className={`w-full h-14 px-4 pt-2 text-sm bg-luxury-charcoal-light/60 backdrop-blur-sm border ${
                          errors.budget && touched.budget
                            ? 'border-red-500 animate-shake'
                            : 'border-luxury-gold/20'
                        } rounded-lg text-luxury-off-white focus:outline-none focus:border-luxury-gold focus:shadow-[0_0_20px_rgba(198,164,92,0.2)] transition-all duration-300 appearance-none cursor-pointer`}
                      >
                        <option value="" className="bg-luxury-charcoal-light">Select Budget</option>
                        <option value="10k-25k" className="bg-luxury-charcoal-light">₹10k - ₹25k</option>
                        <option value="25k-50k" className="bg-luxury-charcoal-light">₹25k - ₹50k</option>
                        <option value="50k-1L" className="bg-luxury-charcoal-light">₹50k - ₹1L</option>
                        <option value="1L-5L" className="bg-luxury-charcoal-light">₹1L - ₹5L</option>
                        <option value="5L+" className="bg-luxury-charcoal-light">₹5L+</option>
                      </select>
                      {errors.budget && touched.budget && (
                        <p className="text-red-400 text-xs mt-1 font-light">{errors.budget}</p>
                      )}
                    </div>

                    {/* Services Field */}
                    <div>
                      <label className="block text-xs text-luxury-gold uppercase tracking-ultra-wide mb-4 font-light">
                        Services Needed *
                      </label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {serviceOptions.map((service) => (
                          <label
                            key={service}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={formData.services.includes(service)}
                                onChange={() => handleServiceToggle(service)}
                                className="sr-only"
                              />
                              <div className={`w-5 h-5 rounded border-2 transition-all duration-300 flex items-center justify-center ${
                                formData.services.includes(service)
                                  ? 'bg-luxury-gold border-luxury-gold'
                                  : 'border-luxury-gold/30 group-hover:border-luxury-gold/60'
                              }`}>
                                {formData.services.includes(service) && (
                                  <svg className="w-3 h-3 text-luxury-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <span className="text-xs text-luxury-warm-gray/80 group-hover:text-luxury-off-white transition-colors font-light">
                              {service}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.services && touched.services && (
                        <p className="text-red-400 text-xs mt-2 font-light">{errors.services}</p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div className="relative">
                      <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        formData.message || touched.message
                          ? '-top-2 text-xs bg-luxury-charcoal-light px-2 text-luxury-gold'
                          : 'top-4 text-sm text-luxury-warm-gray/60'
                      }`}>
                        Project Details *
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        maxLength={1000}
                        rows={4}
                        className={`w-full px-4 pt-6 pb-2 text-sm bg-luxury-charcoal-light/60 backdrop-blur-sm border ${
                          errors.message && touched.message
                            ? 'border-red-500 animate-shake'
                            : 'border-luxury-gold/20'
                        } rounded-lg text-luxury-off-white placeholder-transparent focus:outline-none focus:border-luxury-gold focus:shadow-[0_0_20px_rgba(198,164,92,0.2)] transition-all duration-300 resize-none`}
                        placeholder="Project Details"
                      ></textarea>
                      <div className="flex justify-between items-center mt-1">
                        {errors.message && touched.message ? (
                          <p className="text-red-400 text-xs font-light">{errors.message}</p>
                        ) : (
                          <div></div>
                        )}
                        <span className="text-xs text-luxury-mid-gray font-light">{charCount}/1000</span>
                      </div>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm"
                        >
                          <AlertCircle size={18} className="text-red-400 flex-shrink-0" strokeWidth={1.5} />
                          <p className="text-xs text-red-400 font-light">{errorMessage}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'loading' || !isFormValid()}
                      className="w-full bg-gradient-to-r from-luxury-gold to-luxury-gold-muted text-luxury-charcoal py-5 rounded-2xl font-light text-xs tracking-ultra-wide uppercase hover:shadow-[0_0_30px_rgba(198,164,92,0.4)] transition-all duration-500 flex items-center justify-center gap-3 group disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none relative overflow-hidden"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Start Your Project</span>
                          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </>
                      )}
                    </button>
                    
                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-luxury-gold/10">
                      <div className="flex items-center gap-2 text-xs text-luxury-warm-gray/70 font-light">
                        <Lock size={14} className="text-luxury-gold/60" strokeWidth={1.5} />
                        <span>100% Confidential</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-luxury-warm-gray/70 font-light">
                        <Shield size={14} className="text-luxury-gold/60" strokeWidth={1.5} />
                        <span>Secure Submission</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-luxury-warm-gray/70 font-light">
                        <Clock size={14} className="text-luxury-gold/60" strokeWidth={1.5} />
                        <span>24h Response Time</span>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
