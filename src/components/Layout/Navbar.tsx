import { Building2, Home, Info, Menu, X, Search, Moon, Sun, Heart, GitCompare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useComparison } from '../../context/ComparisonContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const { favoritesCount } = useFavorites();
    const { comparisonCount } = useComparison();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Listings', path: '/listings', icon: Search },
        { name: 'Compare', path: '/compare', icon: GitCompare, badge: comparisonCount },
        { name: 'Favorites', path: '/favorites', icon: Heart, badge: favoritesCount },
        { name: 'About', path: '/about', icon: Info },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/80 dark:bg-slate-900/90 backdrop-blur-md shadow-sm py-4 border-b border-gray-100 dark:border-slate-800'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-blue-600 p-2 rounded-xl text-white transform group-hover:scale-110 transition-transform duration-300">
                            <Building2 size={24} />
                        </div>
                        <span className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-200 ${!scrolled && location.pathname === '/' ? 'text-white' : ''}`}>
                            EstateFlow
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex items-center gap-2 font-medium transition-colors duration-300 relative ${isActive(link.path)
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : scrolled || location.pathname !== '/'
                                        ? 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                                        : 'text-white/90 hover:text-white'
                                    }`}
                            >
                                <link.icon size={18} />
                                {link.name}
                                {link.badge !== undefined && link.badge > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {link.badge > 9 ? '9+' : link.badge}
                                    </span>
                                )}
                            </Link>
                        ))}

                        {/* Theme Toggle & Get Started */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-full transition-colors ${scrolled || location.pathname !== '/'
                                    ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                                    : 'text-white/90 hover:bg-white/10'
                                    }`}
                                aria-label="Toggle Theme"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            <Link to="/listings" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-blue-600/20">
                                Get Started
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden p-2 rounded-lg transition-colors ${scrolled || location.pathname !== '/'
                            ? 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800'
                            : 'text-white hover:bg-white/10'
                            }`}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 bg-white dark:bg-slate-900 z-40 md:hidden transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{ top: '0', paddingTop: '80px' }}
            >
                <div className="px-4 py-6 space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-4 p-4 rounded-xl text-lg font-medium transition-all relative ${isActive(link.path)
                                ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            <link.icon size={24} />
                            {link.name}
                            {link.badge !== undefined && link.badge > 0 && (
                                <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                    {link.badge > 9 ? '9+' : link.badge}
                                </span>
                            )}
                        </Link>
                    ))}

                    <div className="p-4">
                        <button
                            onClick={toggleTheme}
                            className="flex items-center gap-4 w-full text-lg font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 p-4 rounded-xl transition-all"
                        >
                            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                        </button>
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                        <Link to="/listings" onClick={() => setIsOpen(false)} className="block text-center w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
