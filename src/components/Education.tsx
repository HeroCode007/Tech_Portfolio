import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const Education = () => {
  const education = [
    {
      degree: 'Bachelors of Science in Computer Science',
      school: 'FAST NUCES',
      location: 'Lahore,PB',
      period: '2022 - 2025',
      description: 'Specialized in Machine Learning and Artificial Intelligence. FYP on AI Powered Calibration Data Analyzer.',
      scoreType: 'CGPA',   // ✅ Added field
      score: '3.5/4.0',
      achievements: ["Dean's List"]
    },
    {
      degree: 'Intermediate',
      school: 'Punjab Group Of Colleges',
      location: 'Lahore,PB',
      period: '2020 - 2022',
      description: 'Comprehensive study of Computer,Physics, and Mathematics. Active in Coding Competitions and Events.',
      scoreType: 'Marks',  // ✅ Added field
      score: '950/1100',
      achievements: ['Microsoft Office Competitive Exam Topper','Model Section Achiever','100% Scholarship']
    }
  ];

  const certifications = [
    { name: 'MS OFFICE Specialist', issuer: 'MICROSOFT', year: '2020' },
    { name: 'Google IT Automation with Python', issuer: 'Coursera', year: '2021' },
    { name: 'IBM Data Analyst Professional Certificate', issuer: 'IBM', year: '2022' },
    { name: 'PITMAN English Communication', issuer: 'PITMAN', year: '2023' },
  ];

  return (
    <section id="education" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Academic foundation and continuous learning journey
          </p>
        </div>

        {/* Formal Education */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Formal Education</h3>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{edu.degree}</h4>
                        <h5 className="text-lg font-semibold text-indigo-600 mb-2">{edu.school}</h5>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-600 mb-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{edu.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{edu.period}</span>
                          </div>
                          {/* ✅ Updated Score Display */}
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                            {edu.scoreType}: {edu.score}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{edu.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {edu.achievements.map((achievement, achievementIndex) => (
                            <span
                              key={achievementIndex}
                              className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Professional Certifications</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{cert.name}</h4>
                    <p className="text-indigo-600 mb-2">{cert.issuer}</p>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold">
                      {cert.year}
                    </span>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
