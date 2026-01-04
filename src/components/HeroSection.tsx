
import React, { useState } from 'react';

// Types for filter state
export interface SearchFilters {
    location: string;
    propertyType: string;
    priceRange: string;
}

interface HeroSectionProps {
    onSearch: (filters: SearchFilters) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
    const [activeFilter, setActiveFilter] = useState('All Properties');
    const [filters, setFilters] = useState<SearchFilters>({
        location: '',
        propertyType: 'any',
        priceRange: 'any'
    });

    const propertyTypes = ['Apartment', 'Villa', 'Cottage', 'Penthouse', 'Studio'];
    const priceRanges = [
        { label: 'Price Range', value: 'any' },
        { label: 'Under $300K', value: '0-300000' },
        { label: '$300K - $500K', value: '300000-500000' },
        { label: '$500K - $1M', value: '500000-1000000' },
        { label: 'Over $1M', value: '1000000-plus' }
    ];

    const hasActiveFilters = filters.location !== '' || filters.propertyType !== 'any' || filters.priceRange !== 'any' || activeFilter !== 'All Properties';

    const handleSearch = () => {
        onSearch(filters);
    };

    const handleQuickFilter = (type: string) => {
        setActiveFilter(type);
        const newFilters = { ...filters, propertyType: type === 'All Properties' ? 'any' : type };
        setFilters(newFilters);
        onSearch(newFilters);
    };

    const clearFilters = () => {
        const resetFilters = { location: '', propertyType: 'any', priceRange: 'any' };
        setFilters(resetFilters);
        setActiveFilter('All Properties');
        onSearch(resetFilters);
    };

    return (
        <div className="relative h-[600px] flex items-center justify-center">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop"
                    alt="Luxury Real Estate"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/10"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-5xl px-4 animate-fade-in-up">

                {/* Headings */}
                <div className="text-center mb-12 text-white">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight drop-shadow-md">
                        Find Your Dream Home
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto">
                        Discover the finest properties in prime locations across the globe.
                    </p>
                </div>

                {/* Filter Chips */}
                <div className="flex justify-center flex-wrap gap-2 mb-8">
                    <button
                        onClick={() => handleQuickFilter('All Properties')}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeFilter === 'All Properties' ? 'bg-amber-500 text-white' : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                            }`}
                    >
                        All Properties
                    </button>
                    {propertyTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => handleQuickFilter(type)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeFilter === type ? 'bg-amber-500 text-white' : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {/* Search Box */}
                <div className="bg-white p-4 rounded-2xl shadow-2xl mx-auto max-w-4xl relative">
                    <div className="flex flex-col md:flex-row gap-4">

                        {/* Location Input */}
                        <div className="flex-1 relative border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 px-2">Location</label>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="City, Neighborhood, or Zip"
                                    className="w-full text-gray-900 placeholder-gray-400 outline-none font-medium"
                                    value={filters.location}
                                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Type Dropdown */}
                        <div className="flex-1 relative border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:px-4">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 px-2">Property Type</label>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <select
                                    className="w-full text-gray-900 outline-none font-medium bg-transparent appearance-none cursor-pointer"
                                    value={filters.propertyType}
                                    onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                                >
                                    <option value="any">Any Type</option>
                                    {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Price Dropdown */}
                        <div className="flex-1 relative pb-4 md:pb-0 md:px-4">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 px-2">Price Range</label>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <select
                                    className="w-full text-gray-900 outline-none font-medium bg-transparent appearance-none cursor-pointer"
                                    value={filters.priceRange}
                                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                                >
                                    {priceRanges.map(range => (
                                        <option key={range.value} value={range.value}>{range.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="md:w-32">
                            <button
                                onClick={handleSearch}
                                className="w-full h-full bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center p-3 md:p-0"
                            >
                                Search
                            </button>
                        </div>

                    </div>

                    {/* Clear Filters Button */}
                    {hasActiveFilters && (
                        <div className="absolute -bottom-10 right-0 left-0 text-center">
                            <button
                                onClick={clearFilters}
                                className="text-white hover:text-amber-400 font-medium text-sm flex items-center justify-center mx-auto transition-colors"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default HeroSection;


