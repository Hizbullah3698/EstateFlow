import { Search, ArrowRight, Home as HomeIcon, Wallet, Key } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-image.png';
import { useMarketStats } from '../hooks/useMarketStats';

const Home = () => {
    const { totalListings, lowestPrice, highestPrice, propertyTypes, loading, formatPrice } = useMarketStats();

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${heroImage})`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-slate-900/40" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up tracking-tight">
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Dream Home</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                        Discover a curated selection of {loading ? 'thousands of' : totalListings} premium properties.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/listings"
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-600/30 flex items-center gap-2"
                        >
                            <Search size={20} />
                            Browse Listings
                        </Link>
                        <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold text-lg transition-all border border-white/20 flex items-center gap-2">
                            Learn More
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose EstateFlow?</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">We make finding your next home simple and stress-free.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: HomeIcon,
                                title: 'Wide Range of Properties',
                                desc: loading
                                    ? 'From cozy apartments to luxury estates, find properties that match your lifestyle.'
                                    : `Searching for ${propertyTypes.slice(0, 3).join(', ')}${propertyTypes.length > 3 ? '...' : ''}? We have them all.`
                            },
                            {
                                icon: Wallet,
                                title: 'Best Market Prices',
                                desc: loading
                                    ? 'Get the most competitive prices and transparent valuation for your dream property.'
                                    : `Find properties catering to every budget, starting from ${formatPrice(lowestPrice)} to ${formatPrice(highestPrice)}.`
                            },
                            {
                                icon: Key,
                                title: `Trusted by ${loading ? 'Thousands' : totalListings}+ Buyers`,
                                desc: 'Join our community of satisfied homeowners who found their perfect match with us.'
                            }
                        ].map((feature, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-gray-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 border border-gray-100 dark:border-slate-700 hover:shadow-xl dark:shadow-slate-900/50 transition-all duration-300 group">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to Start Your Journey?</h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                        Your dream home is just a click away. Explore our latest listings and find the one that speaks to you.
                    </p>
                    <Link
                        to="/listings"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1 transition-all"
                    >
                        Get Started Now
                        <ArrowRight size={24} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
