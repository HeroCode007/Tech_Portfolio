import { useState, useEffect } from "react";
import { Menu, X, Terminal, ChevronRight } from "lucide-react";

const EnhancedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "👤" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "resume", label: "Resume", icon: "📄" },
    { id: "contact", label: "Contact", icon: "📧" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.id);
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[110] bg-black/80 backdrop-blur-xl border-b border-green-500/10 shadow-lg shadow-black/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("home")}
              className="group flex items-center gap-2 z-[110]"
            >
              {/* Logo icon */}
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 p-[1px] group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-green-400" />
                </div>
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10" />
              </div>
              {/* Logo text */}
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-green-300 via-emerald-400 to-green-300 bg-clip-text text-transparent">
                  TECH
                </span>
                <span className="text-xl font-bold text-white">_SCULPT</span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeSection === item.id
                    ? "text-green-400"
                    : "text-gray-400 hover:text-white"
                    }`}
                >
                  {/* Active/Hover background */}
                  <span
                    className={`absolute inset-0 rounded-lg transition-all duration-300 ${activeSection === item.id
                      ? "bg-green-500/10 border border-green-500/30"
                      : hoveredItem === item.id
                        ? "bg-white/5"
                        : ""
                      }`}
                  />

                  {/* Label */}
                  <span className="relative z-10">{item.label}</span>

                  {/* Active indicator dot */}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <button
                onClick={() => scrollToSection("contact")}
                className="group relative px-5 py-2.5 rounded-xl font-medium text-sm overflow-hidden transition-all duration-300 hover:scale-105"
              >
                {/* Gradient border */}
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-[1px]">
                  <span className="flex h-full w-full rounded-[11px] bg-black/90" />
                </span>
                <span className="relative z-10 text-green-400 group-hover:text-green-300 flex items-center gap-2">
                  Hire Me
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-[110] p-2 rounded-xl bg-black/50 border border-green-500/20 text-green-400 hover:bg-green-500/10 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                    }`}
                  size={24}
                />
                <X
                  className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                    }`}
                  size={24}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay - Outside nav for proper z-index stacking */}
      <div
        className={`lg:hidden fixed inset-0 z-[100] transition-all duration-500 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity duration-500 ${isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute inset-x-0 top-16 md:top-20 bottom-0 overflow-y-auto transition-all duration-500 ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
            }`}
        >
          {/* Grid pattern background */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(34,197,94,0.5) 1px, transparent 1px), 
                                  linear-gradient(90deg, rgba(34,197,94,0.5) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative px-4 py-6 space-y-2">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 ${activeSection === item.id
                  ? "bg-green-500/10 border border-green-500/30"
                  : "hover:bg-white/5 border border-transparent"
                  }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                  transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: isMenuOpen ? 1 : 0,
                }}
              >
                {/* Icon */}
                <span className="text-2xl">{item.icon}</span>

                {/* Label */}
                <span className={`flex-1 text-left text-lg font-medium ${activeSection === item.id ? "text-green-400" : "text-gray-300"
                  }`}>
                  {item.label}
                </span>

                {/* Arrow */}
                <ChevronRight className={`w-5 h-5 transition-all duration-300 ${activeSection === item.id
                  ? "text-green-400 translate-x-0"
                  : "text-gray-600 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`} />

                {/* Active indicator */}
                {activeSection === item.id && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-green-500 rounded-r-full" />
                )}
              </button>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4 mt-4 border-t border-green-500/10">
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold text-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  transitionDelay: isMenuOpen ? `${navItems.length * 50}ms` : '0ms',
                  transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isMenuOpen ? 1 : 0,
                }}
              >
                <span>Let's Work Together</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Social/Status in mobile */}
            <div
              className="pt-6 text-center"
              style={{
                transitionDelay: isMenuOpen ? `${(navItems.length + 1) * 50}ms` : '0ms',
                opacity: isMenuOpen ? 1 : 0,
              }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-green-400 text-sm font-medium">Available for work</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default EnhancedNavbar;