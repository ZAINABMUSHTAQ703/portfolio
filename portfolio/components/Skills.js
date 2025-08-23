const Skills = () => {
    const skills = [
      { name: 'HTML/CSS', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'React.js', level: 80 },
      { name: 'Python', level: 75 },
      { name: 'MySQL', level: 70 },
      { name: 'UI/UX Design', level: 85 },
      { name: 'Rasa NLU', level: 75 },
      { name: 'Figma', level: 90 },
    ];
  
    return (
      <section id="skills" className="section">
        <div className="container mx-auto px-4">
          <h2 className="section-title">My Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-accent">Technical Skills</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-text-primary">{skill.name}</span>
                      <span className="text-text-secondary">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-tertiary rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-accent to-blue-500 h-2.5 rounded-full" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-accent">Professional Skills</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { name: 'Problem Solving', icon: '🧩' },
                  { name: 'Team Collaboration', icon: '👥' },
                  { name: 'Creativity', icon: '🎨' },
                  { name: 'Communication', icon: '💬' },
                  { name: 'Project Management', icon: '📊' },
                  { name: 'Attention to Detail', icon: '🔍' },
                ].map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-secondary p-6 rounded-lg hover:transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="text-3xl mb-3">{skill.icon}</div>
                    <h4 className="font-medium">{skill.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Skills;