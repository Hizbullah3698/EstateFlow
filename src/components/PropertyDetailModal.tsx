
import React from 'react';
import type { Property } from '../api/mockData';

interface PropertyDetailModalProps {
    property: Property;
    onClose: () => void;
}

const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({ property, onClose }) => {
    return (
        <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Panel */}
            <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-4xl animate-fade-in-up">

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full text-gray-800 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="bg-white">
                        {/* Image Gallery */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 h-[400px] md:h-[500px]">
                            {/* Main Image (First 2/3 on desktop) */}
                            <div className="md:col-span-2 relative h-full">
                                <img
                                    src={property.imageUrl}
                                    alt={property.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-4 left-4">
                                    <span className={`px-4 py-2 rounded-lg text-sm font-bold text-white shadow-sm ${property.status === 'For Sale' ? 'bg-amber-500' : 'bg-blue-500'
                                        }`}>
                                        {property.status}
                                    </span>
                                </div>
                            </div>

                            {/* Secondary Images Column */}
                            <div className="hidden md:flex flex-col gap-1 h-full">
                                {property.images.slice(1, 3).map((img, idx) => (
                                    <div key={idx} className="flex-1 overflow-hidden relative group">
                                        <img
                                            src={img}
                                            alt={`Detail ${idx}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                ))}
                                {/* View All overlay placeholder on last image could go here */}
                                {property.images[3] && (
                                    <div className="flex-1 overflow-hidden relative group">
                                        <img
                                            src={property.images[3]}
                                            alt="More"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                            <span className="text-white font-medium text-sm">+ View Gallery</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 md:p-8">
                            <div className="flex flex-col lg:flex-row gap-8">

                                {/* Main Details */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{property.title}</h2>
                                            <p className="text-gray-500 flex items-center mt-1">
                                                <svg className="w-5 h-5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {property.location}
                                            </p>
                                        </div>
                                        <p className="text-3xl font-bold text-amber-600">${property.price.toLocaleString()}</p>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-4 gap-4 py-6 border-y border-gray-100 mb-6">
                                        <div className="text-center">
                                            <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Bedrooms</p>
                                            <p className="text-xl font-bold text-gray-900">{property.bedrooms}</p>
                                        </div>
                                        <div className="text-center border-l border-gray-100">
                                            <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Bathrooms</p>
                                            <p className="text-xl font-bold text-gray-900">{property.bathrooms}</p>
                                        </div>
                                        <div className="text-center border-l border-gray-100">
                                            <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Sq Ft</p>
                                            <p className="text-xl font-bold text-gray-900">{property.sqft}</p>
                                        </div>
                                        <div className="text-center border-l border-gray-100">
                                            <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Year</p>
                                            <p className="text-xl font-bold text-gray-900">{property.yearBuilt}</p>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-3">About this property</h3>
                                    <p className="text-gray-600 leading-relaxed mb-8">{property.description}</p>

                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Amenities</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                                        {property.amenities.map(amenity => (
                                            <div key={amenity} className="flex items-center text-gray-600 text-sm bg-gray-50 p-2 rounded-lg">
                                                <svg className="w-4 h-4 mr-2 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {amenity}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Agent Card Sidebar */}
                                <div className="lg:w-80 flex-shrink-0">
                                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-8">
                                        <div className="flex items-center mb-6">
                                            <img
                                                src={property.agent.image}
                                                alt={property.agent.name}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-amber-100"
                                            />
                                            <div className="ml-4">
                                                <p className="font-bold text-gray-900">{property.agent.name}</p>
                                                <p className="text-amber-600 text-sm font-medium">Listing Agent</p>
                                            </div>
                                        </div>

                                        <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all mb-3 flex justify-center items-center">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Schedule Viewing
                                        </button>

                                        <button className="w-full border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors flex justify-center items-center mb-2">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            Call Agent
                                        </button>

                                        <p className="text-xs text-gray-400 text-center mt-4">
                                            Reference ID: {property.id}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailModal;
