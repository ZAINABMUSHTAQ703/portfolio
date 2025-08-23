import Link from 'next/link';

const Projects = () => {
  const projects = [
    {
      title: 'University Admission Chatbot',
      description: 'AI-powered chatbot using Rasa to provide admission info automatically, enhancing user experience.',
      image: 'https://images.unsplash.com/photo-1581091870629-1b46e1d5b8b2?fit=crop&w=400&q=80',
      technologies: ['Rasa', 'Python', 'HTML', 'CSS', 'JS'],
      link: '#',
    },
    {
      title: 'QuickBite App',
      description: 'UI/UX design for a food delivery app with intuitive user interface.',
      image: 'https://images.unsplash.com/photo-1598514982966-9a2cfccf06de?fit=crop&w=400&q=80',
      technologies: ['Figma', 'UI/UX'],
      link: '#',
    },
    {
      title: 'Diabetes Analysis Model',
      description: 'Python model for predictive data analysis, extracting meaningful insights.',
      image: 'https://images.unsplash.com/photo-1581092580490-2db0b34a1f6f?fit=crop&w=400&q=80',
      technologies: ['Python', 'Pandas', 'Matplotlib'],
      link: '#',
    },
  ];

  return (
    <section id="projects" className="section bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-white">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-primary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="h-56 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-text-secondary mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="bg-tertiary px-3 py-1 rounded-full text-sm">{tech}</span>
                  ))}
                </div>
                <Link 
                  href={project.link} 
                  className="text-accent font-medium flex items-center hover:text-text-primary"
                >
                  View Project
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
