import Link from 'next/link';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 bg-gradient-to-b from-[#0a192f] to-[#172a45]">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <p className="text-accent mb-2 text-lg animate-pulse">Hi, my name is</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white animate-fade-in">
            Zainab Mushtaq
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-text-secondary mb-6 animate-fade-in delay-200">
            I build beautiful web experiences.
          </h2>
          <p className="text-text-secondary mb-8 max-w-lg animate-fade-in delay-400">
            I'm a frontend developer and UI/UX designer passionate about crafting modern, responsive, and interactive web applications. Currently seeking remote opportunities in Europe.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 animate-fade-in delay-600">
            <Link href="#projects" className="btn hover:scale-105 transition-transform">
              View My Work
            </Link>
            <Link href="#contact" className="btn hover:scale-105 transition-transform">
              Contact Me
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 relative flex justify-center items-center">
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl animate-bounce">
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?fit=crop&w=400&q=80" 
              alt="Hero" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-accent rounded-full flex items-center justify-center font-bold text-primary animate-pulse">
            Hire Me
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
