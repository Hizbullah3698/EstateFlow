import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Property } from '../api/mockData';

interface FavoritesContextType {
    favorites: Property[];
    addFavorite: (property: Property) => void;
    removeFavorite: (propertyId: string) => void;
    isFavorite: (propertyId: string) => boolean;
    toggleFavorite: (property: Property) => void;
    favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'estateflow_favorites';

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Property[]>([]);

    // Load favorites from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setFavorites(parsed);
            }
        } catch (error) {
            console.error('Failed to load favorites from localStorage:', error);
        }
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        } catch (error) {
            console.error('Failed to save favorites to localStorage:', error);
        }
    }, [favorites]);

    const addFavorite = (property: Property) => {
        setFavorites(prev => {
            // Avoid duplicates
            if (prev.some(p => p.id === property.id)) {
                return prev;
            }
            return [...prev, property];
        });
    };

    const removeFavorite = (propertyId: string) => {
        setFavorites(prev => prev.filter(p => p.id !== propertyId));
    };

    const isFavorite = (propertyId: string): boolean => {
        return favorites.some(p => p.id === propertyId);
    };

    const toggleFavorite = (property: Property) => {
        if (isFavorite(property.id)) {
            removeFavorite(property.id);
        } else {
            addFavorite(property);
        }
    };

    const value: FavoritesContextType = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        favoritesCount: favorites.length
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = (): FavoritesContextType => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
