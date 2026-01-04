
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <div className="flex items-center cursor-pointer group">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2 transform group-hover:rotate-3 transition-transform">
                            O
                        </div>
                        <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-gray-900' : 'text-gray-900 lg:text-white'} transition-colors`}>
                            ORO <span className="text-amber-500">Estates</span>
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {['Home', 'Properties', 'About', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className={`text-sm font-medium hover:text-amber-500 transition-colors relative group ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                            >
                                {item}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </nav>

                    {/* Search Bar - Desktop */}
                    <div className="hidden lg:flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 hover:bg-white/30 transition-all shadow-sm">
                        <svg className={`w-5 h-5 mr-2 ${isScrolled ? 'text-gray-500' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search properties..."
                            className={`bg-transparent border-none outline-none text-sm w-48 placeholder-gray-400 ${isScrolled ? 'text-gray-800' : 'text-white placeholder-white/70'}`}
                        />
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className={`text-sm font-medium hover:text-amber-500 transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
                            Sign In
                        </button>
                        <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
                            List Property
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`p-2 rounded-md ${isScrolled ? 'text-gray-800' : 'text-white lg:text-gray-800'}`} // Fix text color logic for transparency
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Backdrop & Panel */}
            {isMobileMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>
                    <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col p-6">
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-xl font-bold text-gray-900">ORO <span className="text-amber-500">Estates</span></span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-900">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <nav className="flex flex-col space-y-4">
                            {['Home', 'Properties', 'About', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-gray-700 hover:text-amber-500 font-medium text-lg border-b border-gray-100 pb-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                            <div className="pt-4 flex flex-col space-y-3">
                                <button className="w-full text-center text-gray-700 font-medium hover:text-amber-500 py-2 border border-gray-200 rounded-lg">
                                    Sign In
                                </button>
                                <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-lg font-bold shadow-md">
                                    List Property
                                </button>
                            </div>
                        </nav>
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;
