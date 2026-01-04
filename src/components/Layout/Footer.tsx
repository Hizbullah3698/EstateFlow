import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-blue-600 p-2 rounded-xl text-white transform group-hover:scale-110 transition-transform duration-300">
                                <Building2 size={24} />
                            </div>
                            <span className="text-2xl font-bold text-white">EstateFlow</span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed">
                            Discover your dream home with EstateFlow. We provide the most accurate market insights and premium property listings across the globe.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            {['Home', 'Listings', 'About Us', 'Contact', 'Terms of Service', 'Privacy Policy'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to="/"
                                        className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4 text-slate-400">
                                <MapPin className="text-blue-500 shrink-0 mt-1" size={20} />
                                <span>123 Real Estate Blvd,<br />Innovation City, ST 12345</span>
                            </li>
                            <li className="flex items-center gap-4 text-slate-400">
                                <Phone className="text-blue-500 shrink-0" size={20} />
                                <span>(555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-4 text-slate-400">
                                <Mail className="text-blue-500 shrink-0" size={20} />
                                <span>contact@estateflow.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Newsletter</h3>
                        <p className="text-slate-400 mb-4">
                            Subscribe to get the latest property news and market updates.
                        </p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/20">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} EstateFlow. All rights reserved.
                    </div>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
