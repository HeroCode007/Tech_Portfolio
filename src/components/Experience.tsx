import { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink, ChevronRight, Zap, Terminal } from 'lucide-react';

const EnhancedExperience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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

  const experiences = [
    {
      title: 'AI/ML Intern',
      company: 'CloudPacer',
      companyUrl: 'https://cloudpacer.com/',
      location: 'Lahore, PB',
      period: '2025 - Present',
      type: 'Project-Based',
      typeColor: 'from-green-500 to-emerald-500',
      description: 'Contributing to the development of AI/ML models and backend systems with a focus on real-world applications in predictive analytics and automation.',
      achievements: [
        'Implemented machine learning models for data classification and prediction tasks',
        'Optimized training pipelines, reducing model training time by 20%',
        'Collaborated with senior researchers on AI-driven solutions for client projects'
      ],
      technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas', 'NumPy', 'SQL'],
      icon: '🤖',
      status: 'current',
    },
    {
      title: 'Front-End Developer',
      company: "Developer's Hub Corp",
      companyUrl: 'https://www.developershub.com',
      location: 'Lahore, PB',
      period: 'May 2025 - Jun 2025',
      type: 'Full-time',
      typeColor: 'from-emerald-500 to-teal-500',
      description: 'Developed responsive and user-friendly web interfaces using HTML, CSS, and JavaScript. Collaborated with design and backend teams to implement seamless UI/UX features.',
      achievements: [
        'Built and optimized interactive UI components with React and Tailwind CSS',
        'Collaborated with backend team to integrate APIs and ensure smooth data flow',
        'Boosted mobile engagement by 50% through responsive design improvements'
      ],
      technologies: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Git/GitHub'],
      icon: '💻',
      status: 'completed',
    },
    {
      title: 'IT Administrator',
      company: 'Direct Line Engineering Corp',
      companyUrl: 'https://www.dlec.com',
      location: 'Lahore, PB',
      period: 'Apr 2023 - Jan 2025',
      type: 'Full-time',
      typeColor: 'from-teal-500 to-cyan-500',
      description: 'Managed IT infrastructure, hardware, software, and network systems while providing technical support to staff.',
      achievements: [
        'Improved system uptime and reliability across the organization',
        'Enhanced staff productivity by resolving IT bottlenecks quickly',
        'Implemented network solutions ensuring better data security'
      ],
      technologies: ['Networking', 'Windows Server', 'Linux', 'MS Office', 'Technical Support'],
      icon: '🖥️',
      status: 'completed',
    },
    {
      title: 'Freelancer (MS Office Specialist)',
      company: 'Fiverr / Upwork',
      companyUrl: 'https://www.fiverr.com',
      location: 'Remote',
      period: 'Feb 2021 - May 2023',
      type: 'Contract',
      typeColor: 'from-cyan-500 to-green-500',
      description: 'Delivered Microsoft Office automation, document formatting, and data analysis projects for global clients.',
      achievements: [
        'Completed 50+ projects with 100% on-time delivery',
        'Automated Excel workflows saving clients 20+ hours per week',
        'Earned consistent 5-star client feedback for quality and timeliness'
      ],
      technologies: ['Excel VBA', 'MS Word', 'MS PowerPoint', 'Data Analysis'],
      icon: '📊',
      status: 'completed',
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
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
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

        {/* Code rain effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 text-green-500/30 font-mono text-xs animate-code-rain"
              style={{
                left: `${10 + i * 12}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            >
              {Array(20).fill(0).map((_, j) => (
                <div key={j} className="my-2">
                  {Math.random() > 0.5 ? '1' : '0'}
                </div>
              ))}
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
            <Briefcase className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium font-mono">{'<experience>'}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Professional </span>
            <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-green-300 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Building expertise through diverse roles and challenges
          </p>
        </div>

        {/* Experience Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card */}
              <div className={`relative h-full rounded-2xl bg-black/40 backdrop-blur-sm border transition-all duration-500 overflow-hidden ${hoveredCard === index
                  ? 'border-green-500/50 shadow-xl shadow-green-500/10 transform -translate-y-2'
                  : 'border-green-500/10'
                }`}>

                {/* Animated gradient border on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${exp.typeColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${exp.typeColor} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

                <div className="relative p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${exp.typeColor} p-[1px] flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center text-2xl">
                          {exp.icon}
                        </div>
                        {/* Pulse for current job */}
                        {exp.status === 'current' && (
                          <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                          </span>
                        )}
                      </div>

                      {/* Title & Company */}
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors duration-300">
                          {exp.title}
                        </h3>
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors duration-300"
                        >
                          {exp.company}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Type badge */}
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r ${exp.typeColor} text-black`}>
                      {exp.type}
                    </span>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-4 mb-5 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4 text-green-500" />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <span className="font-mono">{exp.period}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h5 className="flex items-center gap-2 font-semibold text-white mb-3">
                      <Zap className="w-4 h-4 text-green-400" />
                      Key Achievements
                    </h5>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <li
                          key={achievementIndex}
                          className="flex items-start gap-3 text-gray-300 text-sm group/item"
                        >
                          <ChevronRight className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5 group-hover/item:translate-x-1 transition-transform duration-300" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h5 className="flex items-center gap-2 font-semibold text-white mb-3">
                      <Terminal className="w-4 h-4 text-green-400" />
                      Tech Stack
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 text-green-300 rounded-lg text-xs font-mono hover:bg-green-500/20 hover:border-green-500/40 transition-all duration-300 cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden">
                  <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${exp.typeColor} opacity-5 transform rotate-45 translate-x-16 translate-y-16`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {[
            { label: 'Years Active', value: '4+' },
            { label: 'Companies', value: '4' },
            { label: 'Projects', value: '50+' },
            { label: 'Technologies', value: '15+' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-xl bg-black/30 border border-green-500/10 hover:border-green-500/30 transition-all duration-300"
            >
              <div className="text-2xl font-bold text-green-400 font-mono">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Closing tag */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <span className="text-green-500/30 font-mono text-sm">{'</experience>'}</span>
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        @keyframes code-rain {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        .animate-code-rain {
          animation: code-rain 15s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default EnhancedExperience;