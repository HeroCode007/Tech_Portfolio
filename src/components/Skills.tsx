import React from 'react';
import { Code, Globe, Brain, Users, FileText, Database } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Core Programming',
      skills: [
        { name: 'Programming Fundamentals (PF)', level: 90 },
        { name: 'Object Oriented Programming (OOP)', level: 85 },
        { name: 'Data Structures And Algorithms', level: 70 },
        { name: 'Operating Systems', level: 80 },
        { name: 'SQL & Databases', level: 90 }
      ]
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Frontend Development',
      skills: [
        { name: 'HTML', level: 90 },
        { name: 'CSS/Tailwind-CSS', level: 95 },
        { name: 'JavaScript', level: 85 },
        { name: 'React/Next.js', level: 95 },
        { name: 'TypeScript', level: 90 }
      ]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', level: 95 },
        { name: 'Python', level: 90 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 90 }
      ]
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Problem Solving',
      skills: [
        { name: 'Analytical Thinking', level: 85 },
        { name: 'Debugging & Optimization', level: 80 },
        { name: 'Time Complexity and Space Opt', level: 75 },
        { name: 'Strategic Planning', level: 80 }
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Soft Skills',
      skills: [
        { name: 'Leadership & Teamwork', level: 90 },
        { name: 'Communication Skills', level: 85 },
        { name: 'Project Management', level: 80 },
        { name: 'Adaptability & Flexibility', level: 85 },
    { name: 'Emotional Intelligence', level: 80 },
      ]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Tools',
      skills: [
        { name: 'Visual Studio Code', level: 95 },
        { name: 'Git & GitHub', level: 85 },
        { name: 'Microsoft Office Specialist', level: 95 },
        { name: 'Postman (API Testing)', level: 85 },
        { name: 'Command Line / Terminal', level: 85 },
      ]
    }
  ];

  const SkillBar = ({ skill }: { skill: { name: string; level: number } }) => {
    const [width, setWidth] = React.useState(0);

    React.useEffect(() => {
      const timer = setTimeout(() => setWidth(skill.level), 500);
      return () => clearTimeout(timer);
    }, [skill.level]);

    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 font-medium">{skill.name}</span>
          <span className="text-indigo-600 font-semibold">{skill.level}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${width}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Skills
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Technical expertise and soft skills I bring to every project
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar key={skillIndex} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
