
import React from 'react';

const SkeletonCard: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
            {/* Image Placeholder */}
            <div className="h-48 w-full bg-gray-200"></div>

            {/* Content Placeholder */}
            <div className="p-5 space-y-4">
                {/* Title and Price */}
                <div className="flex justify-between items-start">
                    <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                </div>

                {/* Location */}
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>

                {/* Features (Beds/Baths) */}
                <div className="flex items-center pt-3 border-t border-gray-100">
                    <div className="h-4 bg-gray-200 rounded w-16 mr-6"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
