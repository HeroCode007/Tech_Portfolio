import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { ReactTyped } from "react-typed";
import { useEffect, useRef } from "react";

// Matrix Rain Component
const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const letters = "01";
    const fontSize = 15;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(27, 25, 25, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(41, 100, 41, 1)"; 
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" />;
};

const Hero = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Matrix Rain Background */}
      <MatrixBackground />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center space-y-10 animate-fade-in-up">
          {/* Profile Image */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img
              src="https://i.postimg.cc/9XxHtSnJ/hero.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Heading + Subtitle */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg">
              I'm{" "}
              <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
                Syed Saif Ali
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-green-300 max-w-3xl mx-auto">
              <ReactTyped
                strings={[
                  "Full-Stack Developer",
                  "AI/ML Engineer",
                  "ReactJS Enthusiast",
                  "Next.JS Developer",
                  "JavaScript Specialist",
                  "Python Programmer",
                  "SQL & Database Designer",
                  "C++ Programmer",
                  "Open Source Contributor",
                  "Tech Geek 🚀",
                ]}
                typeSpeed={30}
                backSpeed={40}
                backDelay={1700}
                loop
              />
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              View My Work
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 border-2 border-green-500 text-green-400 rounded-full font-semibold hover:bg-green-600 hover:text-white transition-all duration-200"
            >
              Get In Touch
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/HeroCode007"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 bg-black/60 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-200"
            >
              <Github className="w-6 h-6 text-green-400 group-hover:text-green-200" />
            </a>
            <a
              href="https://www.linkedin.com/in/syed-saif-ali-4533b5323/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 bg-black/60 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-200"
            >
              <Linkedin className="w-6 h-6 text-green-400 group-hover:text-green-200" />
            </a>
            <a
              href="mailto:herosaif000@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 bg-black/60 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-200"
            >
              <Mail className="w-6 h-6 text-green-400 group-hover:text-green-200" />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToNext}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ArrowDown className="w-6 h-6 text-green-400" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
