import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Space Shooter',
      description: 'A classic 2D Space Shooter game developed in C++ using graphics.h library. Players control a spaceship to shoot incoming enemies while avoiding collisions.',
      image: 'https://i.postimg.cc/YqY6SZyX/space.webp',
      technologies: ['C++', 'graphics.h'],
      features: ['Spaceship Control', 'Enemy Shooting', 'Score Tracking', 'Increasing Difficulty', 'Sprite Animations'],
      category: 'Game-Dev'
    },
    {
      title: 'Brick Breaker',
      description: '2D Brick Breaker game built using C++ and SFML library with smooth paddle control and ball physics.',
      image: 'https://i.postimg.cc/LsXvhvPn/brick.png',
      technologies: ['C++', 'SFML'],
      features: ['Paddle Control', 'Ball Physics', 'Multiple Levels', 'Dynamic Brick Layouts', 'Collision Detection'],
      category: 'Game-Dev'
    },
    {
      title: 'Music Streaming Website',
      description: 'A full-featured music streaming web app with authentication, playlists, favourites, and song search.',
      image: 'https://i.postimg.cc/YCmYPVQN/music.avif',
      technologies: ['HTML', 'CSS', 'Tailwind CSS', 'React'],
      features: ['User Authentication', 'Play Songs', 'Song Search & Filter', 'Playlist Management', 'Recently Played'],
      category: 'Web-Dev'
    },
    {
      title: 'Flappy Bird Clone',
      description: 'Recreated the popular Flappy Bird game using Python and Pygame with smooth animations and responsive controls.',
      image: 'https://i.postimg.cc/rwJ07kKr/flappy.jpg',
      technologies: ['Python', 'Pygame'],
      features: ['Dynamic Obstacles', 'Collision Detection', 'Score Tracking', 'Customizable Assets'],
      category: 'Game-Dev'
    },
    {
      title: 'University Database Management System',
      description: 'A comprehensive MySQL database system for managing students, courses, professors, departments, and academic performance.',
      image: 'https://i.postimg.cc/fyCJ3G1d/udbms.png',
      technologies: ['SQL', 'MySQL'],
      features: ['Student Management', 'Course & Professor Records', 'Department Management', 'Academic Performance Tracking'],
      category: 'Database'
    },
    {
      title: 'Handwritten Digit Recognition AI Model',
      description: 'An AI model that classifies handwritten digits using supervised machine learning techniques and image preprocessing.',
      image: 'https://i.postimg.cc/L8cbG6V6/Ai.png',
      technologies: ['Python', 'Machine Learning'],
      features: ['Digit Classification', 'Image Preprocessing', 'Feature Extraction', 'High Accuracy Predictions'],
      category: 'AI/ML'
    }
  ];

  const categories = ['All', 'Game-Dev', 'Web-Dev', 'Database', 'AI/ML'];
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing My Practical Work and Creative Solutions Where Hand-on-Skills Demonstrated
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative group">
                {/* <img
  src={project.image}
  alt={project.title}
  className={`w-full ${project.category === 'Database' ? 'h-64' : 'h-48'} object-cover`}
 */}
 <img
  src={project.image}
  alt={project.title}
  className="w-full h-48 object-contain bg-gray-100"
/>

              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                    {project.category}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{project.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-2">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Technologies:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
