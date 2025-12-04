import { useState, useEffect } from 'react';
import { Heart, ArrowUp, Github, Linkedin, Twitter, Mail, MapPin, Phone, Sparkles, Send } from 'lucide-react';

const EnhancedFooter = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub', color: 'hover:bg-gray-700' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Mail, href: 'mailto:saifalisyed5086@gmail.com', label: 'Email', color: 'hover:bg-red-500' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#0a0a0f] text-white overflow-hidden" role="contentinfo">
      {/* Animated gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>

      {/* Floating orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12">
        {/* Main content grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Section - Takes more space */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-xl">
                    S
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur opacity-40 -z-10"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                    Syed Saif Ali
                  </h3>
                  <p className="text-sm text-indigo-400 font-medium">AI/ML Engineer & Developer</p>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed max-w-md text-sm">
                Crafting intelligent solutions at the intersection of artificial intelligence
                and modern web development. Passionate about building scalable,
                impactful digital experiences that push boundaries.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  onMouseEnter={() => setIsHovered(social.label)}
                  onMouseLeave={() => setIsHovered(null)}
                  className={`relative p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 hover:scale-110 hover:border-white/20 ${social.color} group`}
                >
                  <social.icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                  {isHovered === social.label && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-gray-900 text-xs rounded font-medium whitespace-nowrap">
                      {social.label}
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* Built with love */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Crafted with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>&</span>
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span>in Lahore, Pakistan</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-indigo-500 to-transparent"></span>
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 text-left text-sm"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-indigo-500 to-transparent"></span>
              Get In Touch
            </h4>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-indigo-500/20 transition-colors duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm group-hover:text-white transition-colors duration-300">Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-indigo-500/20 transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:saifalisyed5086@gmail.com" className="text-sm group-hover:text-white transition-colors duration-300">
                  saifalisyed5086@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-indigo-500/20 transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm group-hover:text-white transition-colors duration-300">+92 323-4653567</span>
              </div>
            </div>

            {/* Newsletter signup */}
            <div className="pt-4">
              <p className="text-xs text-gray-500 mb-3">Subscribe for updates on new projects</p>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className="p-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>© {currentYear}</span>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <span>Syed Saif Ali</span>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <span>All rights reserved</span>
            </div>

            <div className="flex items-center gap-6">
              <button className="text-xs text-gray-500 hover:text-white transition-colors duration-300">
                Privacy Policy
              </button>
              <button className="text-xs text-gray-500 hover:text-white transition-colors duration-300">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating scroll to top button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className={`fixed bottom-8 right-8 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-indigo-500/40 group z-50 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-50 -z-10 group-hover:opacity-75 transition-opacity duration-300"></div>
      </button>
    </footer>
  );
};

export default EnhancedFooter;