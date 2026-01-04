
import React from 'react';

const AboutSection: React.FC = () => {
    return (
        <section id="about" className="bg-gray-50 dark:bg-slate-900 py-16 px-6 font-sans transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* LEFT COLUMN: Content */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">About EstateFlow</h2>
                        <h3 className="text-xl text-blue-600 dark:text-blue-400 font-semibold">Your Partner in Finding Dream Properties</h3>

                        <div className="text-gray-700 dark:text-gray-300 space-y-4 leading-relaxed">
                            <p>
                                EstateFlow is a leading real estate platform connecting buyers, sellers, and renters with their perfect properties. With years of expertise in the PropTech industry, we leverage cutting-edge technology to make property search seamless and efficient.
                            </p>
                            <p>
                                Our mission is to transform the real estate experience through innovation, transparency, and exceptional customer service. Whether you're looking for your first home, investment property, or luxury villa, we're here to guide you every step of the way.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 pt-6">
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow dark:shadow-slate-900/50 text-center transform hover:scale-105 transition-transform duration-300">
                                <span className="block text-3xl font-bold text-blue-500 dark:text-blue-400 mb-1">500+</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Properties Listed</span>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow dark:shadow-slate-900/50 text-center transform hover:scale-105 transition-transform duration-300">
                                <span className="block text-3xl font-bold text-blue-500 dark:text-blue-400 mb-1">10k+</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Happy Clients</span>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow dark:shadow-slate-900/50 text-center transform hover:scale-105 transition-transform duration-300">
                                <span className="block text-3xl font-bold text-blue-500 dark:text-blue-400 mb-1">50+</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Cities Covered</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Image */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-amber-500/20 rounded-2xl transform rotate-3"></div>
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
                            alt="ORO Estates Office"
                            className="relative rounded-xl shadow-2xl w-full h-[500px] object-cover"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;
