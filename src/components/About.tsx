
import { User, Award, Heart, Target } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Award className="w-6 h-6" />, label: 'Years Experience', value: '5+' },
    { icon: <Target className="w-6 h-6" />, label: 'Projects Completed', value: '50+' },
    { icon: <Heart className="w-6 h-6" />, label: 'Clients Managed', value: '10+' },
    { icon: <User className="w-6 h-6" />, label: 'Team Projects', value: '15+' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
"Passionate CS developer with a knack for creating innovative solutions."
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Innovating Through Code and Creativity
            </h3>
        <p className="text-gray-600 leading-relaxed">
  I build intelligent systems that transform data into meaningful solutions, combining Artificial Intelligence, Machine Learning, and modern web technologies. 
  From predictive models to full-stack applications, I enjoy creating tools that solve real-world challenges with precision and impact.
  <br /><br />
  With expertise in the MERN stack and a strong foundation in Computer Science, I craft responsive, scalable, and user-friendly applications. 
  My focus is always on clean code, seamless performance, and design that resonates with users.
  <br /><br />
  Beyond code, I’m constantly exploring emerging technologies and pushing myself to innovate through creative problem-solving. 
  For me, coding isn’t just a skill — it’s how I bring ideas to life.
  <p className="text-center text-xl font-bold bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent mt-8">
  IMPROVISE • ADAPT • OVERCOME
</p>

</p>



            {/* Key Points */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
  <div className="flex items-center space-x-3">
    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
    <span className="text-gray-700">Full-Stack Web Development</span>
  </div>
  <div className="flex items-center space-x-3">
    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
    <span className="text-gray-700">React & JavaScript Applications</span>
  </div>
  <div className="flex items-center space-x-3">
    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
    <span className="text-gray-700">Python Scripting & Automation</span>
  </div>
  <div className="flex items-center space-x-3">
    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
    <span className="text-gray-700">Database Design (SQL)</span>
  </div>
</div>

          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://i.postimg.cc/xCfnnx5h/about1.png"
                alt="Working"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl -z-10"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;