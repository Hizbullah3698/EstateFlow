
import React, { useEffect, useState } from 'react';
import { fetchBayutProperties } from '../api/bayut';
import type { Property } from '../api/mockData';
import PropertyCard from '../components/PropertyCard';
import HeroSection from '../components/HeroSection';
import type { SearchFilters } from '../components/HeroSection';
import PropertyDetailModal from '../components/PropertyDetailModal';
import SkeletonCard from '../components/SkeletonCard';

const ListingsDashboard: React.FC = () => {
    // State management
    const [listings, setListings] = useState<Property[]>([]);
    const [filteredListings, setFilteredListings] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [isFiltering, setIsFiltering] = useState(false);

    // Fetch data on component mount
    useEffect(() => {
        const loadProperties = async () => {
            try {
                setLoading(true);
                // Fetch from Bayut API (or fallback to Mock)
                const data = await fetchBayutProperties();
                setListings(data);
                setFilteredListings(data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch properties:', err);
                setError('Failed to load properties. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadProperties();
    }, []);

    // Filter Logic
    const handleSearch = (filters: SearchFilters) => {
        setIsFiltering(true);
        setTimeout(() => { // Simulate filter processing time/animation
            let result = listings;

            // Location Filter (Partial match)
            if (filters.location) {
                const term = filters.location.toLowerCase();
                result = result.filter(p => p.location.toLowerCase().includes(term));
            }

            // Property Type Filter
            if (filters.propertyType !== 'any') {
                result = result.filter(p => p.type === filters.propertyType);
            }

            // Price Range Filter
            if (filters.priceRange !== 'any') {
                const [min, max] = filters.priceRange.split('-').map(val => val === 'plus' ? Infinity : Number(val));
                result = result.filter(p => {
                    if (max === Infinity) return p.price >= min;
                    return p.price >= min && p.price <= max;
                });
            }

            setFilteredListings(result);
            setIsFiltering(false);
        }, 300);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300">
            {/* Header removed as it's provided by MainLayout */}
            {/* <Header /> */}

            <HeroSection onSearch={handleSearch} />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">

                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Properties</h2>
                    <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full mb-4"></div>
                    {!loading && !error && (
                        <p className="text-gray-500 dark:text-gray-400 animate-fade-in-up">
                            Showing {filteredListings.length} properties
                        </p>
                    )}
                </div>

                {/* Loading State UI (Skeleton) */}
                {(loading || isFiltering) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(n => <SkeletonCard key={n} />)}
                    </div>
                )}

                {/* Error State UI */}
                {error && !loading && (
                    <div className="flex justify-center items-center py-20 text-red-600">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-2">Error</h2>
                            <p>{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                )}

                {/* Listings Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
                {!loading && !error && !isFiltering && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
                        {filteredListings.map((property) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                onClick={setSelectedProperty}
                            />
                        ))}
                    </div>
                )}

                {/* Empty State Handling */}
                {!loading && !error && !isFiltering && filteredListings.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No properties found matching your criteria.
                    </div>
                )}
            </main>

            {/* Footer removed as it's provided by MainLayout */}
            {/* <div id="contact">
                <Footer />
            </div> */}

            {/* Property Detail Modal */}
            {selectedProperty && (
                <PropertyDetailModal
                    property={selectedProperty}
                    onClose={() => setSelectedProperty(null)}
                />
            )}
        </div>
    );
};

export default ListingsDashboard;
