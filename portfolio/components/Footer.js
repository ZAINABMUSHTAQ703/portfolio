const Footer = () => {
    return (
      <footer className="bg-primary border-t border-tertiary py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-text-secondary">
                &copy; {new Date().getFullYear()} Zainab Mushtaq. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="https://linkedin.com/in/zainab-mushtaq-068043324" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors">
                LinkedIn
              </a>
              <a href="mailto:zainabzaini087@gmail.com" className="text-text-secondary hover:text-accent transition-colors">
                Email
              </a>
              <a href="#hero" className="text-text-secondary hover:text-accent transition-colors">
                Back to Top
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;