import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a192fcc] backdrop-blur-sm py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-accent">
          ZM.
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="#about" className="text-text-secondary hover:text-accent transition-colors">About</Link>
          <Link href="#skills" className="text-text-secondary hover:text-accent transition-colors">Skills</Link>
          <Link href="#projects" className="text-text-secondary hover:text-accent transition-colors">Projects</Link>
          <Link href="#education" className="text-text-secondary hover:text-accent transition-colors">Education</Link>
          <Link href="#contact" className="text-text-secondary hover:text-accent transition-colors">Contact</Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-text-primary focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary py-4 px-4">
          <nav className="flex flex-col space-y-4">
            <Link href="#about" onClick={() => setIsMenuOpen(false)} className="text-text-secondary hover:text-accent transition-colors">About</Link>
            <Link href="#skills" onClick={() => setIsMenuOpen(false)} className="text-text-secondary hover:text-accent transition-colors">Skills</Link>
            <Link href="#projects" onClick={() => setIsMenuOpen(false)} className="text-text-secondary hover:text-accent transition-colors">Projects</Link>
            <Link href="#education" onClick={() => setIsMenuOpen(false)} className="text-text-secondary hover:text-accent transition-colors">Education</Link>
            <Link href="#contact" onClick={() => setIsMenuOpen(false)} className="text-text-secondary hover:text-accent transition-colors">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;