import React, { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import PropertyCard from '../components/PropertyCard';
import PropertyDetailModal from '../components/PropertyDetailModal';
import Toast from '../components/Toast';
import type { Property } from '../api/mockData';
import { Heart, Trash2 } from 'lucide-react';

const Favorites: React.FC = () => {
    const { favorites, removeFavorite, favoritesCount } = useFavorites();
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleRemoveAll = () => {
        if (window.confirm(`Are you sure you want to remove all ${favoritesCount} properties from your favorites?`)) {
            favorites.forEach(property => removeFavorite(property.id));
            setToastMessage('All favorites cleared');
            setShowToast(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-emerald-500 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center mb-4">
                        <Heart className="text-white mr-3" size={40} fill="white" />
                        <h1 className="text-4xl md:text-5xl font-bold text-white">My Favorites</h1>
                    </div>
                    <p className="text-center text-white/90 text-lg">
                        {favoritesCount === 0
                            ? 'Start adding properties to your favorites to see them here'
                            : `You have ${favoritesCount} saved ${favoritesCount === 1 ? 'property' : 'properties'}`
                        }
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Empty State */}
                {favoritesCount === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full mb-6">
                            <Heart className="text-gray-400 dark:text-gray-600" size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            No Favorites Yet
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            Browse our listings and click the heart icon on properties you love to save them here for easy access.
                        </p>
                        <a
                            href="/listings"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
                        >
                            Browse Listings
                        </a>
                    </div>
                )}

                {/* Favorites Grid */}
                {favoritesCount > 0 && (
                    <>
                        {/* Actions Bar */}
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Saved Properties ({favoritesCount})
                            </h2>
                            <button
                                onClick={handleRemoveAll}
                                className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                                <Trash2 size={18} />
                                Clear All
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
                            {favorites.map((property) => (
                                <PropertyCard
                                    key={property.id}
                                    property={property}
                                    onClick={setSelectedProperty}
                                />
                            ))}
                        </div>
                    </>
                )}
            </main>

            {/* Property Detail Modal */}
            {selectedProperty && (
                <PropertyDetailModal
                    property={selectedProperty}
                    onClose={() => setSelectedProperty(null)}
                />
            )}

            {/* Toast Notification */}
            {showToast && (
                <Toast
                    message={toastMessage}
                    type="error"
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
};

export default Favorites;
