
import type { Property } from './mockData';
import { MOCK_PROPERTIES } from './mockData';

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'bayut.p.rapidapi.com';

// Bayut API Response Interfaces
interface BayutLocation {
    name: string;
}

interface BayutCoverPhoto {
    url: string;
}

interface BayutProperty {
    id: number;
    externalID: string;
    title: string;
    price: number;
    rooms: number;
    baths: number;
    area: number;
    location: BayutLocation[];
    coverPhoto: BayutCoverPhoto;
    photos: BayutCoverPhoto[];
    phoneNumber?: string;
    contactName?: string;
    agency?: {
        name: string;
        logo?: {
            url: string;
        };
    };
    purpose: string;
    product: string;
    amenities?: string[];
}

interface BayutResponse {
    hits: BayutProperty[];
}

export const fetchBayutProperties = async (location: string = '5002', purpose: string = 'for-sale'): Promise<Property[]> => {
    // FALLBACK: If no API key, return mock data with a warning
    if (!RAPIDAPI_KEY) {
        console.warn('Bayut API Key not found. Using Mock Data.');
        return new Promise(resolve => setTimeout(() => resolve(MOCK_PROPERTIES), 800));
    }

    try {
        // Use the location parameter in the URL
        const url = `https://${RAPIDAPI_HOST}/properties/list?locationExternalIDs=${location}&purpose=${purpose}&hitsPerPage=25&page=0&lang=en&sort=city-level-score`;

        // Note: locationExternalIDs=5002 is typically Dubai Marina or similar. 
        // In a real app we'd search for location IDs first.

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data: BayutResponse = await response.json();
        return mapBayutToApp(data.hits);

    } catch (error) {
        console.error('Failed to fetch from Bayut API:', error);
        return MOCK_PROPERTIES; // Fallback on error
    }
};

const mapBayutToApp = (bayutProperties: BayutProperty[]): Property[] => {
    return bayutProperties.map(p => ({
        id: p.externalID || String(p.id),
        title: p.title,
        price: p.price,
        location: p.location.map(l => l.name).join(', '),
        bedrooms: p.rooms,
        bathrooms: p.baths,
        sqft: Math.round(p.area),
        yearBuilt: new Date().getFullYear(), // API doesn't always return this, defaulting
        description: p.title, // API has full description in detail endpoint, using title for list
        amenities: p.amenities || ['Luxury Amenities'],
        type: mapType(p.product),
        status: p.purpose === 'for-rent' ? 'For Rent' : 'For Sale',
        imageUrl: p.coverPhoto?.url,
        images: p.photos ? p.photos.map(ph => ph.url) : [p.coverPhoto?.url],
        agent: {
            name: p.contactName || p.agency?.name || 'Agent',
            phone: p.phoneNumber || 'Contact Agent',
            image: p.agency?.logo?.url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
        }
    }));
};

const mapType = (product: string): Property['type'] => {
    // Simple mapping logic
    const lower = product.toLowerCase();
    if (lower.includes('villa')) return 'Villa';
    if (lower.includes('apartment')) return 'Apartment';
    if (lower.includes('penthouse')) return 'Penthouse';
    return 'Apartment'; // Default
};
