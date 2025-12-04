import { useState, useEffect, useRef } from 'react';
import { Download, Eye, FileText, Award, Briefcase, GraduationCap, Sparkles, ExternalLink, Mail, MapPin, Terminal, ChevronRight, Code2 } from 'lucide-react';

// ✅ Import your PDF from src/assets
import resumePDF from '../assets/SaifResume.pdf';

const EnhancedResume = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
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

  const handleDownload = () => {
    setIsDownloading(true);
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'SaifResume.pdf';
    link.click();
    setTimeout(() => setIsDownloading(false), 2000);
  };

  const handlePreview = () => {
    window.open(resumePDF, '_blank');
  };

  const resumeHighlights = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Experience',
      value: 'Projects',
      description: 'Hands-on experience in Web Development, AI, and Database Systems',
      gradient: 'from-green-500 to-emerald-500',
      emoji: '💼'
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Education',
      value: 'BS Computer Science',
      description: 'Currently pursuing BSCS, strong foundation in programming & AI',
      gradient: 'from-emerald-500 to-teal-500',
      emoji: '🎓'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Certifications',
      value: 'MS Office Specialist',
      description: 'Certified in Microsoft Office tools and project management',
      gradient: 'from-teal-500 to-cyan-500',
      emoji: '🏆'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Skills',
      value: 'Programming & AI',
      description: 'Web apps, AI models, and database-driven projects',
      gradient: 'from-cyan-500 to-green-500',
      emoji: '⚡'
    }
  ];

  const resumeSections = [
    {
      title: 'Professional Summary',
      icon: <Terminal className="w-5 h-5" />,
      content:
        'A passionate and creative Computer Science student with strong expertise in programming (PF, OOP, Python), Web App Development, and AI applications. Skilled at problem-solving, leadership, and effective communication. Demonstrated success in managing academic projects and delivering innovative solutions.'
    },
    {
      title: 'Technical Skills',
      icon: <Code2 className="w-5 h-5" />,
      content: [
        { label: 'Programming', skills: 'Python, C++, JavaScript, TypeScript' },
        { label: 'Frontend', skills: 'HTML, CSS, Tailwind, React, Next.js' },
        { label: 'Backend', skills: 'Node.js, Python, PostgreSQL, MongoDB' },
        { label: 'Other', skills: 'Microsoft Office, Leadership, Project Management' }
      ]
    },
    {
      title: 'Key Achievements',
      icon: <Award className="w-5 h-5" />,
      content: [
        'Built AI-powered Handwritten Digit Recognition model',
        'Designed and developed University Database System',
        'Created multiple web applications using MERN stack',
        'Active participant in academic and project-based learning'
      ]
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="resume"
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
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Floating document icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['📄', '📋', '📝', '💾', '📁', '🗂️'].map((emoji, i) => (
            <div
              key={i}
              className="absolute text-2xl opacity-10 animate-float"
              style={{
                left: `${15 + (i * 15)}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.7}s`,
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
            <FileText className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium font-mono">{'<resume>'}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">My </span>
            <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-green-300 bg-clip-text text-transparent">
              Resume
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Download my complete resume or explore key highlights below
          </p>
        </div>

        {/* Resume Actions */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-black rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-green-500/25 hover:scale-105 disabled:opacity-70"
          >
            <span className="relative z-10 flex items-center gap-3">
              {isDownloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Download Resume (PDF)</span>
                </>
              )}
            </span>
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>

          <button
            onClick={handlePreview}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
          >
            {/* Animated border */}
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 p-[2px]">
              <span className="flex h-full w-full rounded-[10px] bg-[#0a0a0f]" />
            </span>
            <span className="relative z-10 text-green-400 group-hover:text-green-300 flex items-center gap-3">
              <Eye className="w-5 h-5" />
              <span>Preview Resume</span>
              <ExternalLink className="w-4 h-4" />
            </span>
          </button>
        </div>

        {/* Resume Highlights */}
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {resumeHighlights.map((highlight, index) => (
            <div
              key={index}
              className={`group relative p-6 rounded-2xl bg-black/40 backdrop-blur-sm border transition-all duration-500 hover:-translate-y-2 ${hoveredCard === index
                ? 'border-green-500/50 shadow-xl shadow-green-500/10'
                : 'border-green-500/10'
                }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${highlight.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10 rounded-2xl`} />

              {/* Top accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${highlight.gradient} rounded-t-2xl transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${highlight.gradient} p-[1px] group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center text-3xl">
                    {highlight.emoji}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-green-300 transition-colors duration-300">
                  {highlight.title}
                </h3>
                <div className="text-green-400 font-bold font-mono mb-2">{highlight.value}</div>
                <p className="text-gray-400 text-sm">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Resume Preview Card */}
        <div
          className={`relative rounded-2xl overflow-hidden transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {/* Glassmorphism container */}
          <div className="relative bg-black/40 backdrop-blur-sm border border-green-500/10 rounded-2xl overflow-hidden">

            {/* Header */}
            <div className="relative p-8 overflow-hidden">
              {/* Header background */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/10 to-teal-500/20" />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `linear-gradient(rgba(34,197,94,0.1) 1px, transparent 1px), 
                                    linear-gradient(90deg, rgba(34,197,94,0.1) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Scanline effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                }}
              />

              <div className="relative flex flex-col md:flex-row items-center gap-6">
                {/* Profile image */}
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-green-500/50">
                    <img
                      src="https://i.postimg.cc/g0bGDm2K/hero-imresizer.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Status indicator */}
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-bold text-white mb-1">Syed Saif Ali</h3>
                  <p className="text-green-400 text-lg font-medium mb-3">Creative Technologist</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4 text-green-500" />
                      saifalisyed5086@gmail.com
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-green-500" />
                      Lahore, Pakistan
                    </span>
                  </div>
                </div>

                {/* Decorative terminal */}
                <div className="hidden lg:block ml-auto">
                  <div className="p-4 bg-black/60 rounded-xl border border-green-500/20 font-mono text-xs">
                    <div className="flex gap-1.5 mb-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    </div>
                    <div className="text-green-400">
                      <span className="text-gray-500">$</span> cat resume.json<br />
                      <span className="text-gray-500">{'{'}</span><br />
                      <span className="text-gray-500 ml-2">"status":</span> <span className="text-emerald-400">"available"</span><br />
                      <span className="text-gray-500 ml-2">"passion":</span> <span className="text-emerald-400">"100%"</span><br />
                      <span className="text-gray-500">{'}'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Professional Summary */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-xl font-bold text-white">
                    <span className="p-2 bg-green-500/10 rounded-lg">
                      <Terminal className="w-5 h-5 text-green-400" />
                    </span>
                    Professional Summary
                  </h4>
                  <p className="text-gray-300 leading-relaxed pl-11">
                    {resumeSections[0].content as string}
                  </p>
                </div>

                {/* Technical Skills */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-xl font-bold text-white">
                    <span className="p-2 bg-green-500/10 rounded-lg">
                      <Code2 className="w-5 h-5 text-green-400" />
                    </span>
                    Technical Skills
                  </h4>
                  <div className="space-y-3 pl-11">
                    {(resumeSections[1].content as Array<{ label: string; skills: string }>).map((item, idx) => (
                      <div key={idx} className="flex flex-wrap gap-2">
                        <span className="text-green-400 font-mono text-sm min-w-[80px]">{item.label}:</span>
                        <span className="text-gray-300 text-sm">{item.skills}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Achievements - Full width */}
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="flex items-center gap-2 text-xl font-bold text-white">
                    <span className="p-2 bg-green-500/10 rounded-lg">
                      <Award className="w-5 h-5 text-green-400" />
                    </span>
                    Key Achievements
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3 pl-11">
                    {(resumeSections[2].content as string[]).map((achievement, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-3 rounded-xl bg-green-500/5 border border-green-500/10 hover:border-green-500/30 transition-colors duration-300"
                      >
                        <ChevronRight className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 pt-8 border-t border-green-500/10 text-center">
                <p className="text-gray-400 mb-6">
                  Want to see the full resume with detailed work history and projects?
                </p>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300 group"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  <span>Download Complete Resume</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Connect CTA */}
        <div
          className={`mt-12 relative rounded-2xl overflow-hidden transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="relative p-8 bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-green-500/10 border border-green-500/20 rounded-2xl">
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(34,197,94,0.15) 1px, transparent 0)`,
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-2xl mb-4">
                <Sparkles className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Let's Connect!</h3>
              <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                Interested in working together? I'd love to hear about your project and discuss how I can help bring your ideas to life.
              </p>
              <button
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
              >
                Get In Touch
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Closing tag */}
        <div
          className={`flex items-center justify-center gap-4 mt-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <Sparkles className="w-4 h-4 text-green-500/30" />
          <span className="text-green-500/30 font-mono text-sm">{'</resume>'}</span>
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
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default EnhancedResume;