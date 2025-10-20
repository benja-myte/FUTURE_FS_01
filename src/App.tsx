import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronDown, Sun, Moon, Figma, Palette, Image, Code, Database, Server, GitBranch, Package, Cloud, Globe, Instagram, MessageCircle, FileText, Layers, Zap, Users, Headphones } from 'lucide-react';
import emailjs from '@emailjs/browser';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init('tqJZT7fnij2ugyieC');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

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
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'service_dj49twc',
        'template_u1zfh19',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Benjamin',
        }
      );
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-gray-200/20 dark:border-gray-700/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <img 
                src="https://i.postimg.cc/y8tVK1ND/minimal-logo-with-the-word-BEN-in-uppercase-no-background.jpg" 
                alt="BEN Logo" 
                className="h-12 w-12 rounded-full object-cover shadow-lg ring-2 ring-gray-300 hover:ring-gray-500 transition-all duration-300"
              />
              <div className="font-bold text-xl text-gray-900 dark:text-white">
                Benjamin
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="relative text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 font-medium text-sm uppercase tracking-wider group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-700/20">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left px-3 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-medium text-sm uppercase tracking-wider"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 relative overflow-hidden pt-32">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gray-300/20 dark:bg-gray-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gray-400/20 dark:bg-gray-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gray-200/30 dark:bg-gray-700/30 rounded-full blur-2xl"></div>
          
          {/* Floating particles */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-gray-400/40 rounded-full"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-gray-500/40 rounded-full"></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-gray-300/40 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-5 h-5 bg-gray-600/40 rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-12 animate-fade-in-up">
            <div className="w-56 h-56 mx-auto mb-8 rounded-full overflow-hidden shadow-2xl ring-4 ring-gray-300 dark:ring-gray-600 ring-offset-4 ring-offset-white dark:ring-offset-gray-900 transform hover:scale-110 transition-all duration-700 animate-float">
              <img 
                src="https://i.postimg.cc/BbTQrRpY/Udeh-Benjamin-Copy.png" 
                alt="Benjamin - Professional Photo" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Benjamin
            </h1>
            <h2 className="text-3xl md:text-4xl text-gray-700 dark:text-gray-300 font-semibold mb-8 tracking-wide animate-fade-in-up delay-300">
              Frontend Developer
            </h2>
            <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed font-light animate-fade-in-up delay-500">
              Turning ideas into pixel-perfect websites
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-16 animate-fade-in-up delay-700">
            {[
              { icon: Github, href: "https://github.com/benja-myte", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/benjamin-udeh-5a3601271", label: "LinkedIn" },
              { icon: Mail, href: "mailto:benjaminudeh236@gmail.com", label: "Email" }
            ].map((social, index) => (
              <a 
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transform hover:scale-125 hover:rotate-12 animate-bounce-slow"
                aria-label={social.label}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <social.icon size={28} />
              </a>
            ))}
          </div>

          <button
            onClick={() => scrollToSection('about')}
            className="animate-bounce text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group animate-pulse"
          >
            <ChevronDown size={48} className="group-hover:scale-125 transition-transform duration-300" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-50/50 dark:bg-gray-800/50"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 relative z-10">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">About Me</h2>
            <div className="w-32 h-1 bg-gray-900 dark:bg-white mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
              Passionate about creating digital experiences that make a difference
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I am a passionate and creative front-end developer with a strong foundation in web design and development. My journey in tech began with a curiosity for how websites work, which quickly grew into a dedication to building beautiful, user-friendly digital experiences.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I enjoy turning ideas into reality through code, and I am always eager to learn new technologies and improve my skills. Whether working on a personal project or collaborating with a team, I strive to deliver high-quality results that make a positive impact.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">What I Do</h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Web Development",
                    description: "Building responsive and modern websites",
                    color: "bg-gray-600 dark:bg-gray-300"
                  },
                  {
                    title: "User Interface Design",
                    description: "Creating beautiful and functional user interfaces",
                    color: "bg-gray-700 dark:bg-gray-400"
                  },
                  {
                    title: "Problem Solving",
                    description: "Finding creative solutions to technical challenges",
                    color: "bg-gray-800 dark:bg-gray-500"
                  }
                ].map((service, index) => (
                  <div key={index} className="flex items-start space-x-4 group hover:transform hover:translate-x-2 transition-all duration-300">
                    <div className={`w-4 h-4 rounded-full ${service.color} mt-2 group-hover:scale-150 transition-transform duration-300`}></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">{service.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-gray-100 dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-50/30 dark:bg-gray-700/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 relative z-10">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">Featured Projects</h2>
            <div className="w-32 h-1 bg-gray-900 dark:bg-white mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
              Here are some of my recent projects that showcase my skills in design and development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {[
              {
                title: "Catering Service Website",
                description: "A professional catering service website with modern design and responsive layout",
                image: "https://i.postimg.cc/6qPtHMs7/Screenshot-2025-08-12-141436.png",
                tags: ["HTML", "CSS", "JavaScript"],
                link: "https://catering-service-site.netlify.app/",
                featured: true
              },
              {
                title: "SwiftSites Studio",
                description: "A professional web development studio website with modern design and portfolio showcase",
                image: "https://i.postimg.cc/G34nJQgg/Screenshot-2025-08-31-192531.png",
                tags: ["HTML", "CSS", "JavaScript"],
                link: "https://swiftsites-studio.netlify.app/"
              },
              {
                title: "Herbal Shop Website",
                description: "An e-commerce website for herbal products with elegant design and user-friendly interface",
                image: "https://i.postimg.cc/ZqmZD9QL/Screenshot-2025-08-12-141624.png",
                tags: ["HTML", "CSS", "JavaScript"],
                link: "https://herbal-harmony-shop.netlify.app/"
              },
              {
                title: "Cake Shop Website",
                description: "A delightful cake shop website with attractive product showcase and ordering system",
                image: "https://i.postimg.cc/3xmYBjtR/Screenshot-2025-08-12-141807.png",
                tags: ["HTML", "CSS", "JavaScript"],
                link: "https://cakeshop-two.netlify.app/"
              },
              {
                title: "Restaurant Website",
                description: "An elegant restaurant website with menu showcase and reservation system",
                image: "https://i.postimg.cc/k5y9rJ3P/Screenshot-2025-08-12-141954.png",
                tags: ["HTML", "CSS", "JavaScript"],
                link: "https://pato-restaurant-clone.netlify.app/",
                featured: true
              },
              {
                title: "Login Page",
                description: "A clean and secure login page with modern design and smooth user experience",
                image: "https://i.postimg.cc/4dNGsDs7/Screenshot-2025-08-12-142052.png",
                tags: ["HTML", "CSS", "JavaScript"],
                link: "https://benjamin-login-page.netlify.app/"
              }
            ].map((project, index) => (
              <div key={index} className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden group transform hover:-translate-y-4 hover:rotate-1 ${project.featured ? 'lg:col-span-1 ring-2 ring-gray-300 dark:ring-gray-600' : ''}`}>
                <div className="h-56 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-lg font-bold opacity-90 transform group-hover:scale-105 transition-transform duration-300">{project.title}</h4>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-500">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm rounded-full font-medium hover:scale-110 transition-transform duration-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 font-medium group/btn hover:scale-105">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                        <span>View Project</span>
                      </a>
                      <ExternalLink size={16} className="group-hover/btn:translate-x-2 group-hover/btn:scale-110 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-50/30 dark:bg-gray-800/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 relative z-10">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">Skills & Technologies</h2>
            <div className="w-32 h-1 bg-gray-900 dark:bg-white mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
              Tools and technologies I use to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 relative z-10">
            {[
              { name: "HTML", category: "Language", color: "bg-gray-600", icon: FileText },
              { name: "CSS", category: "Language", color: "bg-gray-700", icon: Palette },
              { name: "JavaScript", category: "Language", color: "bg-gray-800", icon: Zap },
              { name: "TypeScript", category: "Language", color: "bg-gray-500", icon: Code },
              { name: "React", category: "Frontend", color: "bg-gray-600", icon: Layers },
              { name: "Bootstrap", category: "Framework", color: "bg-gray-700", icon: Palette },
              { name: "Webflow", category: "Tool", color: "bg-gray-800", icon: Globe },
              { name: "Bolt", category: "Tool", color: "bg-gray-500", icon: Package },
              { name: "Lovable", category: "Tool", color: "bg-gray-600", icon: Package },
              { name: "Git", category: "Tools", color: "bg-gray-700", icon: GitBranch },
              { name: "Communication", category: "Soft Skill", color: "bg-gray-800", icon: Headphones },
              { name: "Teamwork", category: "Soft Skill", color: "bg-gray-500", icon: Users }
            ].map((skill, index) => (
              <div key={index} className="group bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center hover:bg-white dark:hover:bg-gray-700 transition-all duration-500 shadow-sm hover:shadow-xl transform hover:-translate-y-3 hover:rotate-2 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`w-16 h-16 mx-auto mb-4 ${skill.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500`}>
                  <skill.icon size={28} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-500">
                  {skill.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{skill.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-100 dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-50/30 dark:bg-gray-700/30"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 relative z-10">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">Get In Touch</h2>
            <div className="w-32 h-1 bg-gray-900 dark:bg-white mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
              I'm always open to discussing new opportunities and interesting projects
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Let's Connect</h3>
              <div className="space-y-6">
                {[
                  { icon: Mail, text: "benjaminudeh236@gmail.com", href: "mailto:benjaminudeh236@gmail.com" },
                  { icon: Github, text: "@benja-myte", href: "https://github.com/benja-myte" },
                  { icon: Linkedin, text: "Udeh Benjamin", href: "https://www.linkedin.com/in/benjamin-udeh-5a3601271" }
                ].map((contact, index) => (
                  <a key={index} href={contact.href} className="flex items-center space-x-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-500 group hover:transform hover:translate-x-2">
                    <div className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                      <contact.icon size={20} />
                    </div>
                    <span className="text-lg font-medium">{contact.text}</span>
                  </a>
                ))}
              </div>
              
              <div className="pt-8">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Follow Me</h4>
                <div className="flex space-x-4">
                  {[
                    { icon: Github, href: "https://github.com/benja-myte" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/benjamin-udeh-5a3601271" },
                    { icon: Instagram, href: "https://www.instagram.com/benja_myte" },
                    { icon: MessageCircle, href: "https://t.me/benja_myte" },
                    { icon: Mail, href: "mailto:benjaminudeh236@gmail.com" }
                  ].map((social, index) => (
                    <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="group p-4 rounded-full bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transform hover:scale-125 hover:rotate-12" style={{ animationDelay: `${index * 200}ms` }}>
                      <social.icon size={24} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent outline-none transition-all duration-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 hover:shadow-lg focus:scale-105"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent outline-none transition-all duration-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 hover:shadow-lg focus:scale-105"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent outline-none transition-all duration-500 resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 hover:shadow-lg focus:scale-105"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                
                {submitStatus === 'success' && (
                  <div className="p-4 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl">
                    <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">
                      ✓ Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl">
                    <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">
                      ✗ Failed to send message. Please try again or contact me directly.
                    </p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 px-8 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 shadow-lg hover:shadow-2xl"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-white">
                Udeh Benjamin
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Frontend Developer turning ideas into pixel-perfect websites that make a difference.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
              <div className="space-y-3">
                {['About', 'Projects', 'Skills', 'Contact'].map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="block text-gray-400 hover:text-white transition-colors duration-300 text-lg"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-6">Connect</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Github, href: "https://github.com/benja-myte" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/benjamin-udeh-5a3601271" },
                  { icon: Instagram, href: "https://www.instagram.com/benja_myte" },
                  { icon: MessageCircle, href: "https://t.me/benja_myte" },
                  { icon: Mail, href: "mailto:benjaminudeh236@gmail.com" }
                ].map((social, index) => (
                  <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p className="text-lg">&copy; 2024 Udeh Benjamin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;