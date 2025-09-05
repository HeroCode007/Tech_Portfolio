import React from 'react';
import { Download, Eye, FileText, Award, Briefcase, GraduationCap } from 'lucide-react';

// ✅ Import your PDF from src/assets
import resumePDF from '../assets/SaifResume.pdf';

const Resume = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'SaifResume.pdf';
    link.click();
  };

  const handlePreview = () => {
    window.open(resumePDF, '_blank');
  };

  // ✅ Quick highlights
  const resumeHighlights = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Experience',
      value: 'Projects',
      description: 'Hands-on experience in Web Development, AI, and Database Systems'
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Education',
      value: 'BS Computer Science',
      description: 'Currently pursuing BSCS, strong foundation in programming & AI'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Certifications',
      value: 'Microsoft Office Specialist',
      description: 'Certified in Microsoft Office tools and project management'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Skills',
      value: 'Programming & AI',
      description: 'Web apps, AI models, and database-driven projects'
    }
  ];

  // ✅ Resume main sections (pulled from your resume PDF)
  const resumeSections = [
    {
      title: 'Professional Summary',
      content:
        'A passionate and creative Computer Science student with strong expertise in programming (PF, OOP, Python), Web App Development, and AI applications. Skilled at problem-solving, leadership, and effective communication. Demonstrated success in managing academic projects and delivering innovative solutions.'
    },
    {
      title: 'Technical Skills',
      content:
        'Programming: Python, C++, JavaScript, TypeScript\nFrontend: HTML, CSS, Tailwind, React, Next.js\nBackend: Node.js, Python, PostgreSQL, MongoDB\nOther: Microsoft Office Specialist, Leadership, Project Management'
    },
    {
      title: 'Key Achievements',
      content:
        '• Built AI-powered Handwritten Digit Recognition model\n• Designed and developed University Database System\n• Created multiple web applications using MERN stack\n• Active participant in academic and project-based learning activities'
    }
  ];

  return (
    <section id="resume" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Resume</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download my complete resume or view key highlights below
          </p>
        </div>

        {/* Resume Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Download className="w-5 h-5" />
            <span>Download Resume (PDF)</span>
          </button>
          <button
            onClick={handlePreview}
            className="flex items-center justify-center space-x-3 px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-full font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-200"
          >
            <Eye className="w-5 h-5" />
            <span>Preview Resume</span>
          </button>
        </div>

        {/* Resume Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {resumeHighlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mx-auto mb-4">
                {highlight.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{highlight.title}</h3>
              <div className="text-2xl font-bold text-indigo-600 mb-2">{highlight.value}</div>
              <p className="text-gray-600 text-sm">{highlight.description}</p>
            </div>
          ))}
        </div>

        {/* Resume Preview */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                <img
                  src="https://i.postimg.cc/g0bGDm2K/hero-imresizer.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold">Syed Saif Ali</h3>
                <p className="text-xl opacity-90">Creative Technologist</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-sm">
                  <span>herosaif000@gmail.com</span>
                  <span>•</span>
                  <span>284-E Block PGECHS-2, College Road, Lahore</span>
                  <span>•</span>
                  <span>Pakistan</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {resumeSections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="text-xl font-bold text-gray-900 border-b-2 border-indigo-200 pb-2">
                    {section.title}
                  </h4>
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-600 mb-4">
                Want to see the full resume with detailed work history and projects?
              </p>
              <button
                onClick={handleDownload}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                <Download className="w-5 h-5" />
                <span>Download Complete Resume</span>
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-indigo-50 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Let's Connect!</h3>
            <p className="text-gray-600 mb-6">
              Interested in working together? I'd love to hear about your project and discuss how I can help bring your ideas to life.
            </p>
            <button
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-200"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
