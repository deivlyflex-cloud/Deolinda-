
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Sun, Moon, ShoppingBag } from 'lucide-react';

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

  useEffect(() => setIsOpen(false), [location]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || isOpen ? 'bg-white dark:bg-midnight shadow-2xl border-b dark:border-slate-800 h-20' : 'bg-transparent h-24'}`}>
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold tracking-tighter brand dark:text-white flex items-center gap-2">
          ZARA <span className="text-gold font-light">ONLINE</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-12 text-[10px] font-black uppercase tracking-[0.25em]">
          <Link to="/" className="hover:text-gold transition-colors dark:text-slate-300 dark:hover:text-white">Home</Link>
          <Link to="/catalog" className="hover:text-gold transition-colors dark:text-slate-300 dark:hover:text-white">Shop</Link>
          <Link to="/about" className="hover:text-gold transition-colors dark:text-slate-300 dark:hover:text-white">Heritage</Link>
          <Link to="/contact" className="hover:text-gold transition-colors dark:text-slate-300 dark:hover:text-white">Contact</Link>
          
          <div className="flex items-center space-x-6 pl-8 border-l border-slate-200 dark:border-slate-800">
             <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all dark:text-white"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <Link to="/admin" className="p-3 bg-midnight dark:bg-gold text-white dark:text-midnight rounded-full hover:scale-110 transition-all">
              <User size={18} />
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-6 md:hidden">
          <button onClick={toggleTheme} className="dark:text-white">
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="dark:text-white">
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 top-20 bg-white dark:bg-midnight z-40 px-10 py-16 transition-all duration-500 flex flex-col space-y-12 text-4xl font-bold brand ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <Link to="/" className="dark:text-white hover:text-gold transition-colors">Home</Link>
        <Link to="/catalog" className="dark:text-white hover:text-gold transition-colors">The Boutique</Link>
        <Link to="/about" className="dark:text-white hover:text-gold transition-colors">Our Heritage</Link>
        <Link to="/contact" className="dark:text-white hover:text-gold transition-colors">Contact Concierge</Link>
        <div className="pt-12 border-t border-slate-100 dark:border-slate-800">
          <Link to="/admin" className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-gold">
            <User size={24} /> Admin Vault
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
