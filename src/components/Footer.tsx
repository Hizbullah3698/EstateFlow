
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 pt-16 pb-8 border-t border-gray-800 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* COLUMN 1: Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center transform rotate-3">
                                <span className="text-white font-bold text-lg">O</span>
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                ORO Estates
                            </span>
                        </div>
                        <p className="text-amber-500 font-medium text-sm tracking-wide">
                            Your trusted partner in finding the perfect property
                        </p>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Connecting people with their dream homes across prime locations worldwide.
                            Experience luxury and comfort with our curated listings.
                        </p>
                    </div>

                    {/* COLUMN 2: Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-amber-500 rounded-full"></span>
                        </h3>
                        <ul className="space-y-3">
                            {['Home', 'Properties', 'About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-amber-500 transition-colors duration-300 flex items-center group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-amber-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 3: Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                            Get In Touch
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-amber-500 rounded-full"></span>
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="mailto:hizbullah3698@gmail.com"
                                    className="flex items-center text-gray-400 hover:text-white group transition-colors"
                                >
                                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3 group-hover:bg-amber-500 transition-colors duration-300">
                                        <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="group-hover:translate-x-1 transition-transform">hizbullah3698@gmail.com</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+923000943975"
                                    className="flex items-center text-gray-400 hover:text-white group transition-colors"
                                >
                                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3 group-hover:bg-amber-500 transition-colors duration-300">
                                        <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <span className="group-hover:translate-x-1 transition-transform">+92 300 0943975</span>
                                </a>
                            </li>
                        </ul>

                        <div className="flex space-x-4 mt-6">
                            <a
                                href="https://github.com/Hizbullah3698"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                                aria-label="GitHub"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com/in/hizbullahwazir"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Divider & Copyright */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p className="text-gray-500 mb-4 md:mb-0">
                        © 2024 ORO Estates. All rights reserved.
                    </p>
                    <p className="text-gray-600 flex items-center">
                        Developed by
                        <span className="text-gray-400 ml-1 hover:text-amber-500 transition-colors cursor-default">Hizbullah Wazir</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
