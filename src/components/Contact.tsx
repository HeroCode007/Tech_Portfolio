import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { Facebook, Instagram } from 'lucide-react';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const { name, email, subject, message } = formData;

    // format WhatsApp link
    const whatsappUrl = `https://wa.me/923234653567?text=${encodeURIComponent(
      `Hello, my name is ${name}.
Email: ${email}
Subject: ${subject}

Message:
${message}`
    )}`;

    // open WhatsApp
    window.open(whatsappUrl, "_blank");

    // show success status
    setSubmitStatus("success");

    // reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  } catch (error) {
    setSubmitStatus("error");
  } finally {
    setIsSubmitting(false);

    // hide status after 5 sec
    setTimeout(() => setSubmitStatus("idle"), 5000);
  }
};


  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      content: 'herosaif000@gmail.com',
      link: 'mailto:herosaif000@gmail.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      content: '0323-4653567',
      link: 'tel:+923234653567'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      content: 'Lahore, PB',
      link: 'https://maps.app.goo.gl/1F9xpcnnpn4AP6Qt8'
    }
  ];

  const socialLinks = [
  {
    icon: <Linkedin className="w-6 h-6" />,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/syed-saif-ali-4533b5323/', // ✅ your LinkedIn
    color: 'hover:text-[#0A66C2]'
  },
  {
    icon: <Facebook className="w-6 h-6" />,
    name: 'Facebook',
    url: 'https://www.facebook.com/syed.saif.ali.206411?rdid=KG8lx0WKKpqzVvQ5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FkGqNoAVm%2F#', // update with your profile
    color: 'hover:text-blue-600'
  },
  {
    icon: <Instagram className="w-6 h-6" />,
    name: 'Instagram',
    url: 'https://www.instagram.com/saif_hero_007/?igsh=MTlpendzOWc2YWVlbg%3D%3D#', // update with your profile
    color: 'hover:text-pink-500'
  }
];


  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's Connect</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                
                Whether you have a project in mind, want to discuss opportunities, or just 
                want to say hello, I'm always open to interesting conversations and 
                collaborations. Don't hesitate to reach out!
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 group-hover:bg-indigo-200">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{info.title}</h4>
                    <p className="text-gray-600">{info.content}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Follow me on social media</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-100 rounded-full text-gray-600 ${social.color} transform hover:scale-110 transition-all duration-200`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Project Collaboration"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 resize-none"
                  placeholder="Tell me about your project or idea..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center space-x-3 px-8 py-4 rounded-lg font-semibold transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg transform hover:scale-105'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-emerald-800 text-center">
                    Thank you! Your message has been sent successfully. I'll get back to you soon.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-center">
                    Sorry, there was an error sending your message. Please try again or contact me directly.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;