import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Facebook, Instagram, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';

const EnhancedContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { name, email, subject, message } = formData;

      const whatsappUrl = `https://wa.me/923234653567?text=${encodeURIComponent(
        `Hello, my name is ${name}.
Email: ${email}
Subject: ${subject}

Message:
${message}`
      )}`;

      window.open(whatsappUrl, "_blank");
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Email',
      content: 'saifalisyed5086@gmail.com',
      link: 'mailto:saifalisyed5086@gmail.com',
      gradient: 'from-green-500 to-emerald-500',
      emoji: '📧'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: 'Phone',
      content: '0323-4653567',
      link: 'tel:+923234653567',
      gradient: 'from-emerald-500 to-teal-500',
      emoji: '📱'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Location',
      content: 'Lahore, Pakistan',
      link: 'https://maps.app.goo.gl/1F9xpcnnpn4AP6Qt8',
      gradient: 'from-teal-500 to-cyan-500',
      emoji: '📍'
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/syed-saif-ali-4533b5323/',
      color: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]'
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      name: 'Facebook',
      url: 'https://www.facebook.com/syed.saif.ali.206411',
      color: 'hover:bg-blue-600 hover:border-blue-600'
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      name: 'Instagram',
      url: 'https://www.instagram.com/saif_hero_007/',
      color: 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:border-pink-500'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(34,197,94,0.5) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(34,197,94,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Floating icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['💬', '✉️', '🚀', '💡', '🤝', '⚡'].map((emoji, i) => (
            <div
              key={i}
              className="absolute text-2xl opacity-10 animate-float"
              style={{
                left: `${10 + (i * 15)}%`,
                top: `${15 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <MessageCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium font-mono">{'<contact>'}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Send Me a </span>
            <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-green-300 bg-clip-text text-transparent">
              Message
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Information - Left Side */}
          <div
            className={`lg:col-span-2 space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
          >
            {/* Description */}
            <p className="text-gray-400 leading-relaxed">
              Whether you have a project in mind, want to discuss opportunities, or just
              want to say hello, I'm always open to interesting conversations and
              collaborations. Don't hesitate to reach out!
            </p>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target={info.title === 'Location' ? '_blank' : undefined}
                  rel={info.title === 'Location' ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-black/40 backdrop-blur-sm border border-green-500/10 hover:border-green-500/30 transition-all duration-300 hover:-translate-x-1"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.gradient} p-[1px] group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center text-xl">
                      {info.emoji}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm">{info.title}</h4>
                    <p className="text-gray-400 text-sm group-hover:text-green-400 transition-colors duration-300">
                      {info.content}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-green-500/30 group-hover:text-green-400 group-hover:translate-x-1 transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-gradient-to-r from-green-500 to-transparent"></span>
                Follow Me
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-3 rounded-xl bg-black/40 border border-green-500/10 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${social.color}`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Terminal decoration */}
            <div className="hidden lg:block mt-8 p-4 bg-black/60 rounded-xl border border-green-500/10 font-mono text-xs">
              <div className="flex gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <div className="text-green-400 space-y-1">
                <div><span className="text-gray-500">$</span> ./contact --status</div>
                <div className="text-emerald-400">✓ Available for freelance</div>
                <div className="text-emerald-400">✓ Open to collaborations</div>
                <div className="text-emerald-400">✓ Response time: &lt;24h</div>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div
            className={`lg:col-span-3 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
          >
            <div className="relative p-8 rounded-2xl bg-black/40 backdrop-blur-sm border border-green-500/10 overflow-hidden">
              {/* Form glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 via-transparent to-emerald-500/10 rounded-2xl blur-xl -z-10" />

              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-green-500/10 to-transparent transform rotate-45 translate-x-20 -translate-y-20" />
              </div>

              <form onSubmit={handleSubmit} className="relative space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      Your Name
                    </label>
                    <div className={`relative rounded-xl transition-all duration-300 ${focusedField === 'name' ? 'ring-2 ring-green-500/50' : ''
                      }`}>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-green-500/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      Email Address
                    </label>
                    <div className={`relative rounded-xl transition-all duration-300 ${focusedField === 'email' ? 'ring-2 ring-green-500/50' : ''
                      }`}>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-green-500/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject Field */}
                <div className="relative">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <div className={`relative rounded-xl transition-all duration-300 ${focusedField === 'subject' ? 'ring-2 ring-green-500/50' : ''
                    }`}>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-green-500/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 transition-all duration-300"
                      placeholder="Project Collaboration"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <div className={`relative rounded-xl transition-all duration-300 ${focusedField === 'message' ? 'ring-2 ring-green-500/50' : ''
                    }`}>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-black/50 border border-green-500/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project or idea..."
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold overflow-hidden transition-all duration-300 ${isSubmitting
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-xl hover:shadow-green-500/25 hover:scale-[1.02]'
                    } text-black`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      <span>Send Message</span>
                    </>
                  )}
                  {/* Shine effect */}
                  {!isSubmitting && (
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl animate-fade-in">
                    <p className="text-green-400 text-center flex items-center justify-center gap-2">
                      <span className="text-xl">✓</span>
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl animate-fade-in">
                    <p className="text-red-400 text-center flex items-center justify-center gap-2">
                      <span className="text-xl">✕</span>
                      Something went wrong. Please try again or contact me directly.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Closing tag */}
        <div
          className={`flex items-center justify-center gap-4 mt-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <Sparkles className="w-4 h-4 text-green-500/30" />
          <span className="text-green-500/30 font-mono text-sm">{'</contact>'}</span>
          <Sparkles className="w-4 h-4 text-green-500/30" />
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
          }
          50% { 
            transform: translateY(-15px) rotate(5deg); 
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default EnhancedContact;