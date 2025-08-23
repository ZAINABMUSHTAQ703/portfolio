const Education = () => {
    const education = [
      {
        degree: 'Bachelor of Science in Information Technology',
        institution: 'University of Sargodha, Pakistan',
        duration: 'Nov 2021 - May 2025',
        details: 'CGPA: 3.45/4 (86.3%)',
      },
      {
        degree: 'Pre Engineering, FSc',
        institution: 'Army Public School and College System, Sargodha Cantt',
        duration: 'Apr 2019 - Mar 2021',
        details: 'Marks: 978/1100 (88.9%)',
      },
      {
        degree: 'Science, Matriculation',
        institution: 'Army Public School and College System, Sargodha Cantt',
        duration: 'Apr 2018 - Mar 2019',
        details: 'Marks: 1025/1100 (93.2%)',
      },
    ];
  
    const certifications = [
      {
        title: 'Introduction to the Fundamentals of Databases',
        issuer: 'Simplilearn',
      },
      {
        title: 'Programming Essentials in Python',
        issuer: 'Coursera',
      },
      {
        title: 'UX/UI Design',
        issuer: 'Hiskytech',
      },
    ];
  
    return (
      <section id="education" className="section">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Education & Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-accent">Education</h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="bg-secondary p-6 rounded-lg relative">
                    <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-accent"></div>
                    <h4 className="text-lg font-medium mb-1">{edu.degree}</h4>
                    <p className="text-text-secondary mb-2">{edu.institution}</p>
                    <p className="text-sm text-accent mb-2">{edu.duration}</p>
                    <p className="text-text-secondary">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-accent">Certifications</h3>
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-secondary p-6 rounded-lg hover:transform hover:translate-x-2 transition-all duration-300">
                    <h4 className="text-lg font-medium mb-1">{cert.title}</h4>
                    <p className="text-text-secondary">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Education;