import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Layers, ChevronRight, Sparkles, Code2, Filter } from 'lucide-react';

const EnhancedProjects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
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

  const projects = [
    {
      title: 'The Trend Seller',
      description: 'A full-stack e-commerce platform with modern UI, secure authentication, product management, shopping cart, and payment integration for a seamless shopping experience.',
      image: 'https://i.postimg.cc/Kz8LxRkZ/ecommerce.jpg',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Stripe'],
      features: ['User Authentication', 'Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Order Management', 'Admin Dashboard'],
      category: 'Web-Dev',
      icon: '🛒',
      gradient: 'from-green-500 to-emerald-500',
      links: {
        demo: '#',
        github: '#'
      }
    },
    {
      title: 'Direct Line Engineering',
      description: 'A professional static website for calibration services company showcasing their services, certifications, and contact information with a clean corporate design.',
      image: 'https://i.postimg.cc/htcLbVfW/calibration.jpg',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Responsive Design'],
      features: ['Service Showcase', 'Company Profile', 'Contact Forms', 'Responsive Layout', 'SEO Optimized', 'Fast Loading'],
      category: 'Web-Dev',
      icon: '🔧',
      gradient: 'from-emerald-500 to-teal-500',
      links: {
        demo: 'https://www.dlec.com',
        github: '#'
      }
    },
    {
      title: 'Space Shooter',
      description: 'A classic 2D Space Shooter game developed in C++ using graphics.h library. Players control a spaceship to shoot incoming enemies while avoiding collisions.',
      image: 'https://i.postimg.cc/YqY6SZyX/space.webp',
      technologies: ['C++', 'graphics.h'],
      features: ['Spaceship Control', 'Enemy Shooting', 'Score Tracking', 'Increasing Difficulty', 'Sprite Animations'],
      category: 'Game-Dev',
      icon: '🚀',
      gradient: 'from-purple-500 to-pink-500',
      links: {
        github: '#'
      }
    },
    {
      title: 'Brick Breaker',
      description: '2D Brick Breaker game built using C++ and SFML library with smooth paddle control and ball physics.',
      image: 'https://i.postimg.cc/LsXvhvPn/brick.png',
      technologies: ['C++', 'SFML'],
      features: ['Paddle Control', 'Ball Physics', 'Multiple Levels', 'Dynamic Brick Layouts', 'Collision Detection'],
      category: 'Game-Dev',
      icon: '🧱',
      gradient: 'from-orange-500 to-red-500',
      links: {
        github: '#'
      }
    },
    {
      title: 'Music Streaming Website',
      description: 'A full-featured music streaming web app with authentication, playlists, favourites, and song search.',
      image: 'https://i.postimg.cc/YCmYPVQN/music.avif',
      technologies: ['HTML', 'CSS', 'Tailwind CSS', 'React'],
      features: ['User Authentication', 'Play Songs', 'Song Search & Filter', 'Playlist Management', 'Recently Played'],
      category: 'Web-Dev',
      icon: '🎵',
      gradient: 'from-green-500 to-cyan-500',
      links: {
        demo: '#',
        github: '#'
      }
    },
    {
      title: 'Flappy Bird Clone',
      description: 'Recreated the popular Flappy Bird game using Python and Pygame with smooth animations and responsive controls.',
      image: 'https://i.postimg.cc/rwJ07kKr/flappy.jpg',
      technologies: ['Python', 'Pygame'],
      features: ['Dynamic Obstacles', 'Collision Detection', 'Score Tracking', 'Customizable Assets'],
      category: 'Game-Dev',
      icon: '🐦',
      gradient: 'from-yellow-500 to-green-500',
      links: {
        github: '#'
      }
    },
    {
      title: 'University Database Management',
      description: 'A comprehensive MySQL database system for managing students, courses, professors, departments, and academic performance.',
      image: 'https://i.postimg.cc/fyCJ3G1d/udbms.png',
      technologies: ['SQL', 'MySQL'],
      features: ['Student Management', 'Course & Professor Records', 'Department Management', 'Academic Performance Tracking'],
      category: 'Database',
      icon: '🗄️',
      gradient: 'from-blue-500 to-indigo-500',
      links: {
        github: '#'
      }
    },
    {
      title: 'Handwritten Digit Recognition',
      description: 'An AI model that classifies handwritten digits using supervised machine learning techniques and image preprocessing.',
      image: 'https://i.postimg.cc/L8cbG6V6/Ai.png',
      technologies: ['Python', 'Machine Learning', 'TensorFlow', 'NumPy'],
      features: ['Digit Classification', 'Image Preprocessing', 'Feature Extraction', 'High Accuracy Predictions'],
      category: 'AI/ML',
      icon: '🤖',
      gradient: 'from-violet-500 to-purple-500',
      links: {
        github: '#'
      }
    }
  ];

  const categories = [
    { name: 'All', icon: '✨', count: projects.length },
    { name: 'Web-Dev', icon: '🌐', count: projects.filter(p => p.category === 'Web-Dev').length },
    { name: 'Game-Dev', icon: '🎮', count: projects.filter(p => p.category === 'Game-Dev').length },
    { name: 'Database', icon: '🗄️', count: projects.filter(p => p.category === 'Database').length },
    { name: 'AI/ML', icon: '🤖', count: projects.filter(p => p.category === 'AI/ML').length },
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="projects"
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <Layers className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium font-mono">{'<projects>'}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Featured </span>
            <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-green-300 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Showcasing practical work and creative solutions through hands-on development
          </p>
        </div>

        {/* Category Filter */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`group relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${activeCategory === category.name
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-black shadow-lg shadow-green-500/25'
                  : 'bg-black/40 text-gray-400 border border-green-500/10 hover:border-green-500/30 hover:text-white'
                }`}
            >
              <span className="flex items-center gap-2">
                <span>{category.icon}</span>
                <span>{category.name}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-md ${activeCategory === category.name
                    ? 'bg-black/20 text-black'
                    : 'bg-green-500/10 text-green-400'
                  }`}>
                  {category.count}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
              onMouseEnter={() => setHoveredProject(project.title)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className={`relative h-full rounded-2xl bg-black/40 backdrop-blur-sm border overflow-hidden transition-all duration-500 ${hoveredProject === project.title
                  ? 'border-green-500/50 shadow-xl shadow-green-500/10 transform -translate-y-2'
                  : 'border-green-500/10'
                }`}>

                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r ${project.gradient} text-black`}>
                      {project.category}
                    </span>
                  </div>

                  {/* Project icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-xl">
                    {project.icon}
                  </div>

                  {/* Hover overlay with links */}
                  <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center gap-4 transition-opacity duration-300 ${hoveredProject === project.title ? 'opacity-100' : 'opacity-0'
                    }`}>
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-green-500 text-black rounded-xl hover:bg-green-400 transition-colors duration-300 hover:scale-110"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition-colors duration-300 hover:scale-110"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  {/* Scanline effect */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-3 h-3 text-green-400" />
                      <span className="text-xs font-semibold text-gray-300">Key Features</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.features.slice(0, 4).map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-300 text-xs rounded-md"
                        >
                          {feature}
                        </span>
                      ))}
                      {project.features.length > 4 && (
                        <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-300 text-xs rounded-md">
                          +{project.features.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code2 className="w-3 h-3 text-green-400" />
                      <span className="text-xs font-semibold text-gray-300">Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-black/50 border border-green-500/10 text-gray-400 text-xs rounded-md font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom gradient line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <a
            href="https://github.com/HeroCode007"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-black/40 border border-green-500/20 rounded-xl text-green-400 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            <span>View More on GitHub</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Closing tag */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <span className="text-green-500/30 font-mono text-sm">{'</projects>'}</span>
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default EnhancedProjects;