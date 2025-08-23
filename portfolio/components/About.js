const About = () => {
    return (
      <section id="about" className="section bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="section-title">About Me</h2>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <p className="mb-4">
                I'm a motivated and detail-oriented IT graduate with hands-on experience in developing responsive websites, 
                intelligent chatbots using Rasa, and user-friendly UI/UX designs in Figma.
              </p>
              <p className="mb-4">
                Proficient in React.js, HTML/CSS, Python and MySQL. Adept at solving real-world problems through modern 
                digital solutions. Currently seeking fully remote opportunities with European teams where I can contribute 
                technically and grow collaboratively.
              </p>
              <p className="mb-6">
                When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, 
                or learning about new technologies in the web development space.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-tertiary px-4 py-2 rounded-lg">
                  <span className="text-accent">Name:</span> Zainab Mushtaq
                </div>
                <div className="bg-tertiary px-4 py-2 rounded-lg">
                  <span className="text-accent">Email:</span> zainabzaini087@gmail.com
                </div>
                <div className="bg-tertiary px-4 py-2 rounded-lg">
                  <span className="text-accent">From:</span> Sargodha, Pakistan
                </div>
                <div className="bg-tertiary px-4 py-2 rounded-lg">
                  <span className="text-accent">Phone:</span> +92 325 3429272
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative group">
                <div className="w-full h-80 bg-gradient-to-br from-accent to-secondary rounded-lg overflow-hidden">
                  {/* Replace with your image */}
                  <div className="w-full h-full bg-primary flex items-center justify-center text-4xl font-bold">
                    About Photo
                  </div>
                </div>
                <div className="absolute -bottom-5 -right-5 w-20 h-20 rounded-full bg-primary border-2 border-accent flex items-center justify-center text-accent font-bold transform group-hover:rotate-12 transition-transform">
                  <span className="text-xs text-center">UI/UX Designer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;