import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-luxury-charcoal text-luxury-off-white pt-24 pb-12">
      {/* Subtle gold glow transition */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-luxury-gold/5 to-transparent pointer-events-none"></div>
      
      <div className="relative max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Centered Minimal Layout */}
        <div className="text-center mb-20">
          <h3 className="text-3xl font-display font-light mb-6 tracking-luxury">
            Agency<span className="text-luxury-gold italic">K</span>
          </h3>
          <div className="w-12 h-[1px] bg-luxury-gold/60 mx-auto mb-8"></div>
          <p className="text-luxury-warm-gray/70 max-w-md mx-auto leading-loose font-light text-sm">
            Strategic systems built for ambitious brands.
          </p>
        </div>

        {/* Contact Information - Minimal */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-20 pb-16 border-b border-luxury-gold/10">
          <a 
            href="mailto:rpj9011@outlook.com" 
            className="flex items-center gap-3 text-luxury-warm-gray hover:text-luxury-gold transition-colors duration-500 text-sm font-light"
          >
            <Mail size={16} className="text-luxury-gold" />
            rpj9011@outlook.com
          </a>
          <a 
            href="tel:+919876543210" 
            className="flex items-center gap-3 text-luxury-warm-gray hover:text-luxury-gold transition-colors duration-500 text-sm font-light"
          >
            <Phone size={16} className="text-luxury-gold" />
            +91 91588 53996
          </a>
          <div className="flex items-center gap-3 text-luxury-warm-gray text-sm font-light">
            <MapPin size={16} className="text-luxury-gold" />
            Pune, India
          </div>
        </div>

        {/* Refined Social Icons */}
        <div className="flex justify-center gap-8 mb-16">
          <a 
            href="https://www.linkedin.com/company/agencyk" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center border border-luxury-gold/20 hover:border-luxury-gold hover:bg-luxury-gold/10 transition-all duration-500"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} className="text-luxury-gold" />
          </a>
          <a 
            href="https://twitter.com/agencyk" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center border border-luxury-gold/20 hover:border-luxury-gold hover:bg-luxury-gold/10 transition-all duration-500"
            aria-label="Twitter"
          >
            <Twitter size={18} className="text-luxury-gold" />
          </a>
          <a 
            href="https://www.instagram.com/agencyk" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center border border-luxury-gold/20 hover:border-luxury-gold hover:bg-luxury-gold/10 transition-all duration-500"
            aria-label="Instagram"
          >
            <Instagram size={18} className="text-luxury-gold" />
          </a>
        </div>

        {/* Bottom Bar - Minimal */}
        <div className="pt-8 border-t border-luxury-gold/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-luxury-mid-gray font-light">
          <p className="uppercase tracking-ultra-wide">© {currentYear} AgencyK</p>
          <div className="flex gap-8 uppercase tracking-ultra-wide">
            <a href="#" className="hover:text-luxury-gold transition-colors duration-500">
              Privacy
            </a>
            <a href="#" className="hover:text-luxury-gold transition-colors duration-500">
              Terms
            </a>
            <a href="/admin" className="hover:text-luxury-gold transition-colors duration-500">
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
