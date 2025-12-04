import { useState, useEffect, useRef } from 'react';
import { User, Award, Heart, Target, Code, Cpu, Database, Globe } from 'lucide-react';

// Counter animation hook
const useCountUp = (end: number, duration: number = 2000, startOnView: boolean = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, startOnView]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return { count, ref };
};

// Animated stat card component
const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => {
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  const { count, ref } = useCountUp(numericValue, 2000);

  return (
    <div
      ref={ref}
      className="group relative p-6 rounded-2xl bg-black/40 backdrop-blur-sm border border-green-500/20 hover:border-green-500/40 transition-all duration-500 hover:transform hover:-translate-y-2"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />

      <div className="relative text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl mb-4 group-hover:scale-110 group-hover:bg-green-500/20 transition-all duration-300">
          {icon}
        </div>
        <div className="text-4xl font-bold text-white mb-2 font-mono">
          {count}{suffix}
        </div>
        <div className="text-gray-400 text-sm">{label}</div>
      </div>
    </div>
  );
};

const EnhancedAbout = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const stats = [
    { icon: <Award className="w-6 h-6" />, label: 'Years Experience', value: '5+' },
    { icon: <Target className="w-6 h-6" />, label: 'Projects Completed', value: '50+' },
    { icon: <Heart className="w-6 h-6" />, label: 'Clients Managed', value: '10+' },
    { icon: <User className="w-6 h-6" />, label: 'Team Projects', value: '15+' },
  ];

  const skills = [
    { icon: <Globe className="w-4 h-4" />, text: 'Full-Stack Web Development' },
    { icon: <Code className="w-4 h-4" />, text: 'React & JavaScript Applications' },
    { icon: <Cpu className="w-4 h-4" />, text: 'Python Scripting & Automation' },
    { icon: <Database className="w-4 h-4" />, text: 'Database Design (SQL)' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
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
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium font-mono">{'<about>'}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">About </span>
            <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-green-300 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            "Passionate CS developer with a knack for creating innovative solutions."
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
          >
            {/* Glassmorphism card for content */}
            <div className="relative p-8 rounded-2xl bg-black/40 backdrop-blur-sm border border-green-500/10">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 via-transparent to-emerald-500/10 rounded-2xl blur-xl -z-10" />

              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-green-500/10 rounded-lg">
                  <Code className="w-5 h-5 text-green-400" />
                </span>
                Innovating Through Code
              </h3>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I build intelligent systems that transform data into meaningful solutions,
                  combining <span className="text-green-400 font-medium">Artificial Intelligence</span>,
                  <span className="text-green-400 font-medium"> Machine Learning</span>, and modern web technologies.
                </p>
                <p>
                  With expertise in the <span className="text-green-400 font-medium">MERN stack</span> and
                  a strong foundation in Computer Science, I craft responsive, scalable, and user-friendly applications.
                </p>
                <p>
                  Beyond code, I'm constantly exploring emerging technologies and pushing myself to innovate
                  through creative problem-solving. For me, coding isn't just a skill — it's how I bring ideas to life.
                </p>
              </div>

              {/* Motto */}
              <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-green-500/10 border border-green-500/20">
                <p className="text-center text-lg font-bold font-mono tracking-widest">
                  <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-green-300 bg-clip-text text-transparent">
                    IMPROVISE • ADAPT • OVERCOME
                  </span>
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 p-3 rounded-xl bg-black/30 border border-green-500/10 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="p-2 bg-green-500/10 rounded-lg text-green-400 group-hover:bg-green-500/20 group-hover:scale-110 transition-all duration-300">
                    {skill.icon}
                  </div>
                  <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">
                    {skill.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            className={`relative transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
          >
            <div className="relative group">
              {/* Animated border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-2xl opacity-30 blur group-hover:opacity-50 transition-opacity duration-500" />

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 border border-green-500/30 rounded-2xl -z-10" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-green-500/30 rounded-2xl -z-10" />

              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-green-500 rounded-tl-lg" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-green-500 rounded-tr-lg" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-green-500 rounded-bl-lg" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-green-500 rounded-br-lg" />

              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://i.postimg.cc/xCfnnx5h/about1.png"
                  alt="Working"
                  className="w-full h-auto rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Scanline effect */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-10"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                  }}
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-full">
                <span className="text-green-400 font-mono text-sm">~/developer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Closing tag */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <span className="text-green-500/30 font-mono text-sm">{'</about>'}</span>
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default EnhancedAbout;