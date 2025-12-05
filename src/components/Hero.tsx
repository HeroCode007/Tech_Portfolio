import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { ReactTyped } from "react-typed";
import { useEffect, useRef, useState, lazy, Suspense } from "react";

// Lazy load the 3D components for better performance
const Laptop3D = lazy(() => import('./Laptop3D'));

// Matrix Rain Component (lighter version for background)
const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resizeCanvas = () => {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = "01";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    const drops: number[] = Array(columns).fill(1).map(() => Math.random() * -100);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(34, 197, 94, 0.4)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 -z-10 opacity-30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/95 to-black" />
    </>
  );
};

// Laptop loading fallback
const LaptopLoader = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="relative">
      <div className="w-48 h-32 border-2 border-green-500/30 rounded-lg animate-pulse">
        <div className="absolute inset-2 border border-green-500/20 rounded bg-green-500/5" />
      </div>
      <div className="w-56 h-3 mt-1 border-2 border-green-500/30 rounded-b-lg mx-auto" />
      <p className="text-green-500/50 text-sm mt-4 text-center font-mono">Loading 3D...</p>
    </div>
  </div>
);

const HeroWithLaptop = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/HeroCode007", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/syed-saif-ali-4533b5323/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:saifalisyed5086@gmail.com", label: "Email" },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
    >
      <MatrixBackground />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-0">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-4 items-center min-h-[85vh]">

          {/* Left Side - Text Content */}
          <div
            className={`flex flex-col items-center lg:items-start space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
          >
            {/* Hiring Badge */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-full backdrop-blur-sm animate-pulse">
              <span className="relative flex h-2 sm:h-3 w-2 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 sm:h-3 w-2 sm:w-3 bg-green-500"></span>
              </span>
              <span className="text-green-400 text-xs sm:text-sm font-bold uppercase tracking-wider">Open to Work</span>
            </div>

            {/* Heading */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                <span className="text-white/90">I'm </span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-green-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                    Syed Saif Ali
                  </span>
                  {/* Glowing underline */}
                  {/* <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 rounded-full shadow-lg shadow-green-500/50"></span> */}
                </span>
              </h1>

              <div className="relative">
                {/* Terminal Window */}
                <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-3 sm:p-4 max-w-md">
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-green-500/20">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></span>
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></span>
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-500 font-mono ml-2">saif@portfolio:~</span>
                  </div>

                  {/* Terminal Content */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-mono">
                      <span className="text-green-500">$</span>
                      <span>whoami</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500 text-sm sm:text-base font-mono">→</span>
                      <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-green-300 font-mono">
                        <ReactTyped
                          strings={[
                            "Full-Stack Developer",
                            "AI/ML Engineer",
                            "React Specialist",
                            "Problem Solver",
                            "Your Next Hire 🚀",
                          ]}
                          typeSpeed={50}
                          backSpeed={30}
                          backDelay={2000}
                          loop
                          cursorChar="█"
                        />
                      </p>
                    </div>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-green-500/20 rounded-lg blur-xl -z-10"></div>
              </div>

              <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed px-4 sm:px-0">
                I transform <span className="text-green-400 font-semibold">complex problems</span> into
                <span className="text-green-400 font-semibold"> elegant solutions</span>.
                Ready to bring your vision to life.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 w-full sm:w-auto">
              <button
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-black rounded-xl font-bold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/40 hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  🚀 Hire Me Now
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </button>

              <button
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 p-[2px]">
                  <span className="flex h-full w-full rounded-[10px] bg-black" />
                </span>
                <span className="relative z-10 text-green-400 group-hover:text-green-300 flex items-center justify-center gap-2">
                  View Projects
                  <svg className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group relative p-2.5 sm:p-3 rounded-xl bg-black/50 border border-green-500/20 backdrop-blur-sm hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  <social.icon className="w-5 sm:w-6 h-5 sm:h-6 text-green-400 group-hover:text-green-300 transition-colors" />
                </a>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="flex gap-6 sm:gap-8 pt-2 sm:pt-4">
              {[
                { value: '5+', label: 'Years Exp' },
                { value: '50+', label: 'Projects' },
                { value: '100%', label: 'Dedication' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-green-400 font-mono">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - 3D Laptop */}
          <div
            className={`order-1 lg:order-2 relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
          >
            {/* Glow behind laptop */}
            <div className="absolute inset-0 bg-green-500/10 rounded-full blur-3xl scale-75 animate-pulse" />

            {/* 3D Laptop - Responsive sizing */}
            <div className="relative w-full mx-auto" style={{ maxWidth: 'min(600px, 90vw)' }}>
              {/* Mobile: smaller height, Desktop: square aspect */}
              <div className="aspect-[4/3] sm:aspect-square">
                <Suspense fallback={<LaptopLoader />}>
                  <Laptop3D />
                </Suspense>
              </div>
            </div>

            {/* Floating badges - Responsive positioning */}
            {/* Badge 1: Top right */}
            <div className="absolute -top-2 right-2 sm:top-5 sm:right-5 lg:top-10 lg:right-0 px-2 sm:px-3 py-1 sm:py-2 bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-lg animate-float">
              <span className="text-green-400 text-xs sm:text-sm font-mono flex items-center gap-1 sm:gap-2">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="hidden xs:inline">Ready to</span> Code
              </span>
            </div>

            {/* Badge 2: Bottom left */}
            <div className="absolute -bottom-2 left-2 sm:bottom-10 sm:left-0 lg:bottom-20 px-2 sm:px-3 py-1 sm:py-2 bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-lg animate-float" style={{ animationDelay: '1.5s' }}>
              <span className="text-green-400 text-xs sm:text-sm font-mono">💼 Available</span>
            </div>

            {/* Badge 3: Left side - Desktop only */}
            <div className="absolute top-1/2 -left-4 lg:left-0 px-3 py-2 bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-lg animate-float hidden lg:block" style={{ animationDelay: '0.8s' }}>
              <span className="text-green-400 text-sm font-mono">⚡ Fast Delivery</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToNext}
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-green-400/70 hover:text-green-400 transition-all duration-300 group ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <span className="text-xs font-medium tracking-wider uppercase">Explore More</span>
          <div className="p-2 rounded-full border border-green-500/30 group-hover:border-green-500/60 group-hover:bg-green-500/10 transition-all duration-300">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </button>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-24 left-8 text-green-500/20 font-mono text-sm hidden lg:block">
        {'<hero>'}
      </div>
      <div className="absolute bottom-8 right-8 text-green-500/20 font-mono text-sm hidden lg:block">
        {'</hero>'}
      </div>

      {/* Custom styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gradient {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient {
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroWithLaptop;