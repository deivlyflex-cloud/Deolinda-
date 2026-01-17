
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Ensure menu closes on route change just in case
  useEffect(() => setIsOpen(false), [location]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-white dark:bg-zinc-950 shadow-md border-b dark:border-zinc-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tighter brand dark:text-white">ZARA ONLINE</Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10 text-sm font-medium uppercase tracking-widest">
          <Link to="/" className="hover:text-gray-500 transition-colors dark:text-zinc-300 dark:hover:text-white">Início</Link>
          <Link to="/catalog" className="hover:text-gray-500 transition-colors dark:text-zinc-300 dark:hover:text-white">Catálogo</Link>
          <Link to="/about" className="hover:text-gray-500 transition-colors dark:text-zinc-300 dark:hover:text-white">Sobre</Link>
          <Link to="/contact" className="hover:text-gray-500 transition-colors dark:text-zinc-300 dark:hover:text-white">Contato</Link>
          
          <div className="flex items-center space-x-4 pl-6 border-l border-gray-200 dark:border-zinc-800">
             <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors dark:text-white"
              title="Mudar Tema"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <Link to="/admin" className="p-2 border border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
              <User size={18} />
            </Link>
          </div>
        </div>

        {/* Mobile Toggle & Theme */}
        <div className="flex items-center space-x-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full dark:text-white"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="dark:text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Slide & Fade Animation */}
      <div 
        className={`md:hidden fixed inset-0 top-20 bg-white dark:bg-zinc-950 z-40 px-8 py-10 transition-all duration-300 ease-in-out flex flex-col space-y-8 text-xl font-light ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <Link to="/" onClick={() => setIsOpen(false)} className="dark:text-white hover:text-gray-400 transition-colors">Início</Link>
        <Link to="/catalog" onClick={() => setIsOpen(false)} className="dark:text-white hover:text-gray-400 transition-colors">Catálogo</Link>
        <Link to="/about" onClick={() => setIsOpen(false)} className="dark:text-white hover:text-gray-400 transition-colors">Sobre Nós</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)} className="dark:text-white hover:text-gray-400 transition-colors">Contato</Link>
        <div className="pt-8 border-t border-gray-100 dark:border-zinc-800">
          <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-base font-medium dark:text-white hover:text-gray-400 transition-colors">
            <User size={20} /> Painel Administrativo
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
