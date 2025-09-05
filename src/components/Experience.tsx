import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      title: 'AI/ML Intern',
      company: 'CloudPacer',
      companyUrl: 'https://cloudpacer.com/',
      location: 'Lahore, PB',
      period: '2025 - Present',
      type: 'Project-Based',
      description: 'Contributing to the development of AI/ML models and backend systems with a focus on real-world applications in predictive analytics and automation.',
      achievements: [
        'Implemented machine learning models for data classification and prediction tasks',
        'Optimized training pipelines, reducing model training time by 20%',
        'Collaborated with senior researchers on AI-driven solutions for client projects'
      ],
      technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas', 'NumPy', 'SQL']
    },
    {
      title: 'Front-End Developer',
      company: "Developer’s Hub Corp",
      companyUrl: 'https://www.developershub.com',
      location: 'Lahore, PB',
      period: 'May 2025 - Jun 2025',
      type: 'Full-time',
      description: 'Developed responsive and user-friendly web interfaces using HTML, CSS, and JavaScript. Collaborated with design and backend teams to implement seamless UI/UX features.',
      achievements: [
        'Built and optimized interactive UI components with React and Tailwind CSS',
        'Collaborated with backend team to integrate APIs and ensure smooth data flow',
        'Boosted mobile engagement by 50% through responsive design improvements'
      ],
      technologies: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Git/GitHub']
    },
    {
      title: 'IT Administrator',
      company: 'Direct Line Engineering Corp',
      companyUrl: 'https://www.dlec.com',
      location: 'Lahore, PB',
      period: 'Apr 2023 - Jan 2025',
      type: 'Full-time',
      description: 'Managed IT infrastructure, hardware, software, and network systems while providing technical support to staff.',
      achievements: [
        'Improved system uptime and reliability across the organization',
        'Enhanced staff productivity by resolving IT bottlenecks quickly',
        'Implemented network solutions ensuring better data security'
      ],
      technologies: ['Networking', 'Windows Server', 'Linux', 'MS Office', 'Technical Support']
    },
    {
      title: 'Freelancer (MS Office Specialist)',
      company: 'Fiverr / Upwork',
      companyUrl: 'https://www.fiverr.com',
      location: 'Remote',
      period: 'Feb 2021 - May 2023',
      type: 'Contract',
      description: 'Delivered Microsoft Office automation, document formatting, and data analysis projects for global clients.',
      achievements: [
        'Completed 50+ projects with 100% on-time delivery',
        'Automated Excel workflows saving clients 20+ hours per week',
        'Earned consistent 5-star client feedback for quality and timeliness'
      ],
      technologies: ['Excel VBA', 'MS Word', 'MS PowerPoint', 'Data Analysis']
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional journey and key accomplishments
          </p>
        </div>

        {/* Card-based layout with animations */}
        <div className="grid gap-8 md:grid-cols-2">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-indigo-600" aria-label="Job Icon" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-indigo-600 hover:underline"
                    >
                      {exp.company}
                    </a>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                  {exp.type}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" aria-label="Location Icon" />
                  <span>{exp.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" aria-label="Calendar Icon" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{exp.description}</p>

              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-3">Key Achievements:</h5>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Technologies Used:</h5>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
