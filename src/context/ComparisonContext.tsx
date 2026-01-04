import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Property } from '../api/mockData';

interface ComparisonContextType {
    comparisonList: Property[];
    addToComparison: (property: Property) => boolean;
    removeFromComparison: (propertyId: string) => void;
    isInComparison: (propertyId: string) => boolean;
    toggleComparison: (property: Property) => boolean;
    clearComparison: () => void;
    comparisonCount: number;
    maxComparison: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const STORAGE_KEY = 'estateflow_comparison';
const MAX_COMPARISON = 3;

export const ComparisonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [comparisonList, setComparisonList] = useState<Property[]>([]);

    // Load comparison from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Limit to MAX_COMPARISON in case it was changed
                setComparisonList(parsed.slice(0, MAX_COMPARISON));
            }
        } catch (error) {
            console.error('Failed to load comparison from localStorage:', error);
        }
    }, []);

    // Save comparison to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(comparisonList));
        } catch (error) {
            console.error('Failed to save comparison to localStorage:', error);
        }
    }, [comparisonList]);

    const addToComparison = (property: Property): boolean => {
        if (comparisonList.length >= MAX_COMPARISON) {
            return false; // Cannot add more
        }

        if (comparisonList.some(p => p.id === property.id)) {
            return true; // Already in comparison
        }

        setComparisonList(prev => [...prev, property]);
        return true;
    };

    const removeFromComparison = (propertyId: string) => {
        setComparisonList(prev => prev.filter(p => p.id !== propertyId));
    };

    const isInComparison = (propertyId: string): boolean => {
        return comparisonList.some(p => p.id === propertyId);
    };

    const toggleComparison = (property: Property): boolean => {
        if (isInComparison(property.id)) {
            removeFromComparison(property.id);
            return false;
        } else {
            return addToComparison(property);
        }
    };

    const clearComparison = () => {
        setComparisonList([]);
    };

    const value: ComparisonContextType = {
        comparisonList,
        addToComparison,
        removeFromComparison,
        isInComparison,
        toggleComparison,
        clearComparison,
        comparisonCount: comparisonList.length,
        maxComparison: MAX_COMPARISON
    };

    return (
        <ComparisonContext.Provider value={value}>
            {children}
        </ComparisonContext.Provider>
    );
};

export const useComparison = (): ComparisonContextType => {
    const context = useContext(ComparisonContext);
    if (!context) {
        throw new Error('useComparison must be used within a ComparisonProvider');
    }
    return context;
};
