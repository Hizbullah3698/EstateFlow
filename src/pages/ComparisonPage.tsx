import React from 'react';
import { useComparison } from '../context/ComparisonContext';
import { useNavigate } from 'react-router-dom';
import { X, Check, Bed, Bath, Maximize, Calendar, MapPin, DollarSign, Home as HomeIcon, Trash2, ArrowRight } from 'lucide-react';
import type { Property } from '../api/mockData';

const ComparisonPage: React.FC = () => {
    const { comparisonList, removeFromComparison, clearComparison, comparisonCount } = useComparison();
    const navigate = useNavigate();

    // Helper to determine if values are different
    const isDifferent = (values: (string | number)[]) => {
        return new Set(values).size > 1;
    };

    const formatPrice = (price: number) => `AED ${price.toLocaleString()}`;

    const comparisonAttributes = [
        {
            label: 'Price',
            icon: DollarSign,
            getValue: (p: Property) => p.price,
            format: (val: number) => formatPrice(val),
            highlight: true
        },
        {
            label: 'Location',
            icon: MapPin,
            getValue: (p: Property) => p.location,
            format: (val: string) => val
        },
        {
            label: 'Property Type',
            icon: HomeIcon,
            getValue: (p: Property) => p.type,
            format: (val: string) => val
        },
        {
            label: 'Bedrooms',
            icon: Bed,
            getValue: (p: Property) => p.bedrooms,
            format: (val: number) => `${val} Beds`
        },
        {
            label: 'Bathrooms',
            icon: Bath,
            getValue: (p: Property) => p.bathrooms,
            format: (val: number) => `${val} Baths`
        },
        {
            label: 'Square Feet',
            icon: Maximize,
            getValue: (p: Property) => p.sqft,
            format: (val: number) => `${val.toLocaleString()} sqft`,
            highlight: true
        },
        {
            label: 'Year Built',
            icon: Calendar,
            getValue: (p: Property) => p.yearBuilt,
            format: (val: number) => val.toString()
        },
        {
            label: 'Status',
            icon: Check,
            getValue: (p: Property) => p.status,
            format: (val: string) => val
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-purple-600 to-blue-600 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center mb-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">Property Comparison</h1>
                    </div>
                    <p className="text-center text-white/90 text-lg">
                        {comparisonCount === 0
                            ? 'Add properties to compare side-by-side'
                            : `Comparing ${comparisonCount} ${comparisonCount === 1 ? 'property' : 'properties'}`
                        }
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Empty State */}
                {comparisonCount === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full mb-6">
                            <HomeIcon className="text-gray-400 dark:text-gray-600" size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            No Properties to Compare
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            Browse our listings and check the "Add to Compare" box on properties you want to compare side-by-side.
                        </p>
                        <button
                            onClick={() => navigate('/listings')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
                        >
                            Browse Listings
                            <ArrowRight size={20} />
                        </button>
                    </div>
                )}

                {/* Comparison View */}
                {comparisonCount > 0 && (
                    <>
                        {/* Actions Bar */}
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Side-by-Side Comparison
                            </h2>
                            <button
                                onClick={clearComparison}
                                className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                                <Trash2 size={18} />
                                Clear All
                            </button>
                        </div>

                        {/* Desktop: Side-by-Side Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-slate-900">
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white w-48">
                                            Attribute
                                        </th>
                                        {comparisonList.map((property) => (
                                            <th key={property.id} className="px-6 py-4 text-left relative">
                                                <div className="space-y-2">
                                                    <img
                                                        src={property.imageUrl}
                                                        alt={property.title}
                                                        className="w-full h-32 object-cover rounded-lg"
                                                    />
                                                    <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2">
                                                        {property.title}
                                                    </h3>
                                                    <button
                                                        onClick={() => removeFromComparison(property.id)}
                                                        className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                                                        aria-label="Remove from comparison"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonAttributes.map((attr, index) => {
                                        const values = comparisonList.map(p => attr.getValue(p));
                                        const hasDifference = isDifferent(values);

                                        return (
                                            <tr
                                                key={attr.label}
                                                className={`border-t border-gray-100 dark:border-slate-700 ${index % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-gray-50 dark:bg-slate-900'
                                                    }`}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <attr.icon size={18} className="text-gray-400" />
                                                        <span className="font-medium text-gray-900 dark:text-white">
                                                            {attr.label}
                                                        </span>
                                                    </div>
                                                </td>
                                                {comparisonList.map((property) => {
                                                    const value = attr.getValue(property);
                                                    const formattedValue = attr.format(value as string & number);

                                                    return (
                                                        <td
                                                            key={property.id}
                                                            className={`px-6 py-4 ${hasDifference && attr.highlight
                                                                ? 'bg-blue-50 dark:bg-blue-900/20'
                                                                : ''
                                                                }`}
                                                        >
                                                            <span className={`${attr.highlight
                                                                ? 'font-bold text-blue-600 dark:text-blue-400'
                                                                : 'text-gray-700 dark:text-gray-300'
                                                                }`}>
                                                                {formattedValue}
                                                            </span>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}

                                    {/* Amenities Row */}
                                    <tr className="border-t border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                                        <td className="px-6 py-4">
                                            <span className="font-medium text-gray-900 dark:text-white">Amenities</span>
                                        </td>
                                        {comparisonList.map((property) => (
                                            <td key={property.id} className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {property.amenities.slice(0, 3).map((amenity, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                                                        >
                                                            {amenity}
                                                        </span>
                                                    ))}
                                                    {property.amenities.length > 3 && (
                                                        <span className="px-2 py-1 text-gray-500 text-xs">
                                                            +{property.amenities.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile: Stacked Cards */}
                        <div className="md:hidden space-y-6">
                            {comparisonList.map((property) => (
                                <div key={property.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
                                    <div className="relative">
                                        <img
                                            src={property.imageUrl}
                                            alt={property.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <button
                                            onClick={() => removeFromComparison(property.id)}
                                            className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                    <div className="p-6 space-y-3">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{property.title}</h3>
                                        {comparisonAttributes.map((attr) => (
                                            <div key={attr.label} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700">
                                                <div className="flex items-center gap-2">
                                                    <attr.icon size={16} className="text-gray-400" />
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">{attr.label}</span>
                                                </div>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {attr.format(attr.getValue(property) as string & number)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default ComparisonPage;
