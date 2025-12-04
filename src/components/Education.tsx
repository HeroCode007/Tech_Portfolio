import { useState, useEffect, useRef } from 'react';
import { GraduationCap, Calendar, MapPin, Award, BadgeCheck, ChevronRight, Sparkles } from 'lucide-react';

const EnhancedEducation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
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

  const education = [
    {
      degree: 'Bachelors of Science in Computer Science',
      school: 'FAST NUCES',
      location: 'Lahore, PB',
      period: '2022 - 2025',
      description: 'Specialized in Machine Learning and Artificial Intelligence. FYP on AI Powered Calibration Data Analyzer.',
      scoreType: 'CGPA',
      score: '3.5/4.0',
      achievements: ["Dean's List"],
      icon: '🎓',
      color: 'from-green-500 to-emerald-500',
    },
    {
      degree: 'Intermediate',
      school: 'Punjab Group Of Colleges',
      location: 'Lahore, PB',
      period: '2020 - 2022',
      description: 'Comprehensive study of Computer, Physics, and Mathematics. Active in Coding Competitions and Events.',
      scoreType: 'Marks',
      score: '950/1100',
      achievements: ['Microsoft Office Competitive Exam Topper', 'Model Section Achiever', '100% Scholarship'],
      icon: '📚',
      color: 'from-emerald-500 to-teal-500',
    }
  ];

  const certifications = [
    { name: 'MS OFFICE Specialist', issuer: 'MICROSOFT', year: '2020', icon: '📊' },
    { name: 'Google IT Automation with Python', issuer: 'Coursera', year: '2021', icon: '🐍' },
    { name: 'IBM Data Analyst Professional Certificate', issuer: 'IBM', year: '2022', icon: '📈' },
    { name: 'PITMAN English Communication', issuer: 'PITMAN', year: '2023', icon: '💬' },
  ];

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-24 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(34,197,94,0.5) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(34,197,94,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Floating binary */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-500/10 font-mono text-sm animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <GraduationCap className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium font-mono">{'<education>'}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Academic </span>
            <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-green-300 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Building a strong foundation through continuous learning
          </p>
        </div>

        {/* Formal Education - Timeline Style */}
        <div
          className={`mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              Formal Education
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-green-500 via-green-500/50 to-transparent hidden md:block" />

            <div className="space-y-8">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                    }`}
                  style={{ transitionDelay: `${300 + index * 200}ms` }}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-8 w-5 h-5 rounded-full bg-black border-2 border-green-500 z-10 hidden md:flex items-center justify-center">
                    <div className={`w-2 h-2 rounded-full bg-green-500 ${activeCard === index ? 'animate-ping' : ''}`} />
                  </div>

                  {/* Card */}
                  <div className={`md:ml-20 group relative rounded-2xl bg-black/40 backdrop-blur-sm border transition-all duration-500 ${activeCard === index ? 'border-green-500/50 shadow-lg shadow-green-500/10' : 'border-green-500/10'
                    }`}>
                    {/* Glow effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${edu.color} rounded-2xl blur-xl transition-opacity duration-500 -z-10 ${activeCard === index ? 'opacity-20' : 'opacity-0'
                      }`} />

                    <div className="p-6 md:p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                        {/* Icon */}
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${edu.color} p-[1px] flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <div className="w-full h-full rounded-2xl bg-black/80 flex items-center justify-center text-3xl">
                            {edu.icon}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                            <div>
                              <h4 className="text-xl font-bold text-white mb-1 group-hover:text-green-300 transition-colors duration-300">
                                {edu.degree}
                              </h4>
                              <h5 className="text-lg font-semibold text-green-400">{edu.school}</h5>
                            </div>

                            {/* Score badge */}
                            <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-xl">
                              <div className="text-xs text-gray-400 uppercase tracking-wider">{edu.scoreType}</div>
                              <div className="text-lg font-bold text-green-400 font-mono">{edu.score}</div>
                            </div>
                          </div>

                          {/* Meta info */}
                          <div className="flex flex-wrap gap-4 mb-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                              <MapPin className="w-4 h-4 text-green-500" />
                              <span>{edu.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <Calendar className="w-4 h-4 text-green-500" />
                              <span>{edu.period}</span>
                            </div>
                          </div>

                          <p className="text-gray-300 mb-4 leading-relaxed">{edu.description}</p>

                          {/* Achievements */}
                          <div className="flex flex-wrap gap-2">
                            {edu.achievements.map((achievement, achievementIndex) => (
                              <span
                                key={achievementIndex}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500/10 border border-green-500/20 text-green-300 rounded-lg text-sm hover:bg-green-500/20 transition-colors duration-300"
                              >
                                <Award className="w-3 h-3" />
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                      <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${edu.color} opacity-10 transform rotate-45 translate-x-14 -translate-y-14`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div
          className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BadgeCheck className="w-6 h-6 text-green-400" />
              Professional Certifications
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={`group relative p-5 rounded-xl bg-black/40 backdrop-blur-sm border border-green-500/10 hover:border-green-500/30 transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                {/* Hover glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/20 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {cert.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white mb-1 truncate group-hover:text-green-300 transition-colors duration-300">
                      {cert.name}
                    </h4>
                    <p className="text-green-400 text-sm mb-1">{cert.issuer}</p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded text-xs text-gray-400 font-mono">
                      <Calendar className="w-3 h-3" />
                      {cert.year}
                    </span>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-5 h-5 text-green-500/30 group-hover:text-green-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                {/* Progress bar decoration */}
                <div className="mt-4 h-1 bg-green-500/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div
          className={`flex items-center justify-center gap-4 mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <Sparkles className="w-4 h-4 text-green-500/30" />
          <span className="text-green-500/30 font-mono text-sm">{'</education>'}</span>
          <Sparkles className="w-4 h-4 text-green-500/30" />
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.1;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.3;
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default EnhancedEducation;