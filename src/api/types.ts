
export interface Agent {
    name: string;
    phone: string;
    image: string;
}

export interface Property {
    id: string;
    title: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    yearBuilt: number;
    description: string;
    amenities: string[];
    type: 'Apartment' | 'Villa' | 'Cottage' | 'Penthouse' | 'Studio' | 'Townhouse';
    status: 'For Sale' | 'For Rent';
    imageUrl: string; // Main image
    images: string[]; // Gallery
    agent: Agent;
}
