import { useState, useEffect, useRef } from 'react';
import { Code, Globe, Brain, Users, FileText, Database, Server, Wrench, Cpu, Terminal, Sparkles } from 'lucide-react';

// Animated skill bar with glow effect
const SkillBar = ({
  skill,
  index,
  isVisible
}: {
  skill: { name: string; level: number };
  index: number;
  isVisible: boolean;
}) => {
  const [width, setWidth] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const delay = 300 + index * 100;
    const timer = setTimeout(() => {
      setWidth(skill.level);

      // Animate counter
      let start = 0;
      const end = skill.level;
      const duration = 1000;
      const increment = end / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, skill.level, index]);

  const getSkillLevel = (level: number) => {
    if (level >= 90) return { label: 'Expert', color: 'text-green-400' };
    if (level >= 75) return { label: 'Advanced', color: 'text-emerald-400' };
    if (level >= 60) return { label: 'Intermediate', color: 'text-teal-400' };
    return { label: 'Learning', color: 'text-cyan-400' };
  };

  const skillLevel = getSkillLevel(skill.level);

  return (
    <div className="group mb-5 last:mb-0">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors duration-300">
          {skill.name}
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${skillLevel.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
            {skillLevel.label}
          </span>
          <span className="text-green-400 font-bold font-mono text-sm min-w-[3ch]">
            {count}%
          </span>
        </div>
      </div>

      {/* Progress bar container */}
      <div className="relative h-2 bg-green-500/10 rounded-full overflow-hidden">
        {/* Animated background pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(34,197,94,0.1) 10px, rgba(34,197,94,0.1) 20px)',
          }}
        />

        {/* Progress fill */}
        <div
          className="relative h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            background: 'linear-gradient(90deg, #22c55e 0%, #10b981 50%, #14b8a6 100%)',
          }}
        >
          {/* Glow effect */}
          <div
            className="absolute inset-0 rounded-full blur-sm"
            style={{
              background: 'linear-gradient(90deg, #22c55e 0%, #10b981 50%, #14b8a6 100%)',
              opacity: 0.5,
            }}
          />

          {/* Shine animation */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div
              className="absolute inset-0 -translate-x-full animate-shine"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              }}
            />
          </div>

          {/* End dot */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg shadow-green-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  );
};

// Hexagon skill visualization
const HexagonSkill = ({
  skill,
  index,
  isVisible
}: {
  skill: { name: string; level: number };
  index: number;
  isVisible: boolean;
}) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setAnimated(true), 200 + index * 100);
    return () => clearTimeout(timer);
  }, [isVisible, index]);

  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

  return (
    <div className="group flex flex-col items-center">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
          {/* Background circle */}
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="rgba(34,197,94,0.1)"
            strokeWidth="6"
          />
          {/* Progress circle */}
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animated ? strokeDashoffset : circumference}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(34,197,94,0.5))',
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>
        </svg>
        {/* Percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold font-mono text-sm">{skill.level}%</span>
        </div>
      </div>
      <span className="mt-2 text-gray-400 text-xs text-center group-hover:text-white transition-colors duration-300">
        {skill.name}
      </span>
    </div>
  );
};

const EnhancedSkills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [viewMode, setViewMode] = useState<'bars' | 'circles'>('bars');
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

  const skillCategories = [
    {
      icon: <Cpu className="w-5 h-5" />,
      title: 'Core Programming',
      color: 'from-green-500 to-emerald-500',
      emoji: '💻',
      skills: [
        { name: 'Programming Fundamentals (PF)', level: 90 },
        { name: 'Object Oriented Programming (OOP)', level: 85 },
        { name: 'Data Structures & Algorithms', level: 70 },
        { name: 'Operating Systems', level: 80 },
        { name: 'SQL & Databases', level: 90 }
      ]
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: 'Frontend Development',
      color: 'from-emerald-500 to-teal-500',
      emoji: '🎨',
      skills: [
        { name: 'HTML', level: 90 },
        { name: 'CSS / Tailwind CSS', level: 95 },
        { name: 'JavaScript', level: 85 },
        { name: 'React / Next.js', level: 95 },
        { name: 'TypeScript', level: 90 }
      ]
    },
    {
      icon: <Server className="w-5 h-5" />,
      title: 'Backend Development',
      color: 'from-teal-500 to-cyan-500',
      emoji: '⚙️',
      skills: [
        { name: 'Node.js', level: 95 },
        { name: 'Python', level: 90 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 90 }
      ]
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: 'Problem Solving',
      color: 'from-cyan-500 to-blue-500',
      emoji: '🧠',
      skills: [
        { name: 'Analytical Thinking', level: 85 },
        { name: 'Debugging & Optimization', level: 80 },
        { name: 'Time & Space Complexity', level: 75 },
        { name: 'Strategic Planning', level: 80 }
      ]
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Soft Skills',
      color: 'from-blue-500 to-indigo-500',
      emoji: '🤝',
      skills: [
        { name: 'Leadership & Teamwork', level: 90 },
        { name: 'Communication Skills', level: 85 },
        { name: 'Project Management', level: 80 },
        { name: 'Adaptability & Flexibility', level: 85 },
        { name: 'Emotional Intelligence', level: 80 }
      ]
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      title: 'Tools & Technologies',
      color: 'from-indigo-500 to-purple-500',
      emoji: '🛠️',
      skills: [
        { name: 'Visual Studio Code', level: 95 },
        { name: 'Git & GitHub', level: 85 },
        { name: 'Microsoft Office', level: 95 },
        { name: 'Postman (API Testing)', level: 85 },
        { name: 'Command Line / Terminal', level: 85 }
      ]
    }
  ];

  // Calculate total skills and average
  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  const avgLevel = Math.round(
    skillCategories.reduce((acc, cat) =>
      acc + cat.skills.reduce((a, s) => a + s.level, 0), 0
    ) / totalSkills
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
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
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Floating code symbols */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['<>', '/>', '{}', '[]', '()', '&&', '||', '=>'].map((symbol, i) => (
            <div
              key={i}
              className="absolute text-green-500/10 font-mono text-2xl animate-float"
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${20 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            >
              {symbol}
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium font-mono">{'<skills>'}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Technical </span>
            <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-green-300 bg-clip-text text-transparent">
              Arsenal
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive toolkit of technologies and abilities
          </p>
        </div>

        {/* Stats Bar */}
        <div
          className={`flex flex-wrap justify-center gap-6 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {[
            { label: 'Skill Categories', value: skillCategories.length, icon: '📁' },
            { label: 'Total Skills', value: totalSkills, icon: '⚡' },
            { label: 'Average Proficiency', value: `${avgLevel}%`, icon: '📊' },
          ].map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-5 py-3 bg-black/40 border border-green-500/10 rounded-xl"
            >
              <span className="text-xl">{stat.icon}</span>
              <div>
                <div className="text-white font-bold font-mono">{stat.value}</div>
                <div className="text-gray-500 text-xs">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div
          className={`flex justify-center mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="inline-flex p-1 bg-black/40 border border-green-500/10 rounded-xl">
            <button
              onClick={() => setViewMode('bars')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${viewMode === 'bars'
                  ? 'bg-green-500 text-black'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              Progress Bars
            </button>
            <button
              onClick={() => setViewMode('circles')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${viewMode === 'circles'
                  ? 'bg-green-500 text-black'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              Circular View
            </button>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`group relative rounded-2xl bg-black/40 backdrop-blur-sm border border-green-500/10 overflow-hidden transition-all duration-700 hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${400 + categoryIndex * 100}ms` }}
              onMouseEnter={() => setActiveCategory(categoryIndex)}
            >
              {/* Header gradient line */}
              <div className={`h-1 bg-gradient-to-r ${category.color}`} />

              {/* Glow effect on hover */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`} />

              <div className="p-6">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} p-[1px]`}>
                    <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center text-2xl">
                      {category.emoji}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-green-300 transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-xs text-gray-500">{category.skills.length} skills</p>
                  </div>
                </div>

                {/* Skills */}
                {viewMode === 'bars' ? (
                  <div>
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBar
                        key={skillIndex}
                        skill={skill}
                        index={skillIndex}
                        isVisible={isVisible}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {category.skills.map((skill, skillIndex) => (
                      <HexagonSkill
                        key={skillIndex}
                        skill={skill}
                        index={skillIndex}
                        isVisible={isVisible}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Corner decoration */}
              <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden opacity-10">
                <div className={`absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl ${category.color} transform rotate-45 translate-x-14 translate-y-14`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div
          className={`flex items-center justify-center gap-4 mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <Sparkles className="w-4 h-4 text-green-500/30" />
          <span className="text-green-500/30 font-mono text-sm">{'</skills>'}</span>
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
            transform: translateY(-20px) rotate(5deg); 
          }
        }
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-shine {
          animation: shine 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default EnhancedSkills;