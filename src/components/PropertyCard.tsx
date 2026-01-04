import React, { useState } from 'react';
import type { Property } from '../api/mockData';
import { useFavorites } from '../context/FavoritesContext';
import { useComparison } from '../context/ComparisonContext';
import Toast from './Toast';

interface PropertyCardProps {
    property: Property;
    onClick: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const { isInComparison, toggleComparison, maxComparison } = useComparison();
    const isPropertyFavorite = isFavorite(property.id);
    const isPropertyInComparison = isInComparison(property.id);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleFavorite(property);
    };

    const handleComparisonToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        const success = toggleComparison(property);

        if (!success && !isPropertyInComparison) {
            setToastMessage(`You can only compare up to ${maxComparison} properties`);
            setShowToast(true);
            e.target.checked = false;
        }
    };

    return (
        <div
            className="group bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden hover:shadow-2xl dark:shadow-slate-900/50 hover:scale-[1.02] transition-all duration-300 cursor-pointer relative"
            onClick={() => onClick(property)}
        >
            {/* Property Image */}
            <div className="h-48 w-full overflow-hidden relative">
                <img
                    src={property.imageUrl}
                    alt={property.title}
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000"; }}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* Badges */}
                <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm z-10 ${property.status === 'For Sale' ? 'bg-amber-500' : 'bg-blue-500'
                    }`}>
                    {property.status}
                </span>

                {/* Heart Button */}
                <button
                    className="absolute top-3 left-3 p-2 bg-white/70 hover:bg-white dark:bg-slate-900/70 dark:hover:bg-slate-900 rounded-full transition-all duration-300 z-10 hover:scale-110 group/heart"
                    onClick={handleFavorite}
                    aria-label={isPropertyFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <svg
                        className={`w-5 h-5 transition-all duration-300 ${isPropertyFavorite ? 'text-red-500 fill-current scale-110' : 'text-gray-700 dark:text-gray-200 group-hover/heart:text-red-400'}`}
                        fill={isPropertyFavorite ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>

            {/* Card Content */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate pr-2" title={property.title}>
                        {property.title}
                    </h3>
                    <p className="text-lg font-bold text-amber-600 dark:text-amber-500">
                        AED {property.price.toLocaleString()}
                    </p>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {property.location}
                </p>

                {/* Property Features */}
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-100 dark:border-slate-700 pt-3">
                    <div className="flex items-center mr-6">
                        <span className="font-semibold text-gray-900 dark:text-gray-200 mr-1">{property.bedrooms}</span> Beds
                    </div>
                    <div className="flex items-center mr-6">
                        <span className="font-semibold text-gray-900 dark:text-gray-200 mr-1">{property.bathrooms}</span> Baths
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold text-gray-900 dark:text-gray-200 mr-1">{property.sqft}</span> SqFt
                    </div>
                </div>

                {/* Comparison Checkbox */}
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
                    <label
                        className="flex items-center gap-2 cursor-pointer group/compare hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <input
                            type="checkbox"
                            checked={isPropertyInComparison}
                            onChange={handleComparisonToggle}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover/compare:text-blue-600 dark:group-hover/compare:text-blue-400">
                            Add to Compare {isPropertyInComparison && '✓'}
                        </span>
                    </label>
                </div>
            </div>

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

export default PropertyCard;
