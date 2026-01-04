import { useState, useEffect } from 'react';
import { fetchBayutProperties } from '../api/bayut';


export interface MarketStats {
    totalListings: number;
    lowestPrice: number;
    highestPrice: number;
    propertyTypes: string[];
    loading: boolean;
}

export const useMarketStats = () => {
    const [stats, setStats] = useState<MarketStats>({
        totalListings: 0,
        lowestPrice: 0,
        highestPrice: 0,
        propertyTypes: [],
        loading: true
    });

    useEffect(() => {
        const calculateStats = async () => {
            try {
                // Fetch a broader range of data for stats if possible, or usually just the main list
                const properties = await fetchBayutProperties('5002', 'for-sale');

                if (!properties.length) {
                    setStats(prev => ({ ...prev, loading: false }));
                    return;
                }

                const prices = properties.map(p => p.price);
                const types = [...new Set(properties.map(p => p.type))].sort();

                setStats({
                    totalListings: properties.length,
                    lowestPrice: Math.min(...prices),
                    highestPrice: Math.max(...prices),
                    propertyTypes: types,
                    loading: false
                });
            } catch (error) {
                console.error("Failed to calculate market stats:", error);
                setStats(prev => ({ ...prev, loading: false }));
            }
        };

        calculateStats();
    }, []);

    const formatPrice = (price: number) => {
        if (price >= 1000000) {
            return `AED ${(price / 1000000).toFixed(1)}M`;
        }
        return `AED ${(price / 1000).toFixed(0)}k`;
    };

    return { ...stats, formatPrice };
};
