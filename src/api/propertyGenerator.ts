
import { faker } from '@faker-js/faker';
import type { Property, Agent } from './types';

// Curated list of high-quality Unsplash real estate images
const PROPERTY_IMAGES = [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000', // Luxury Villa
    'https://images.unsplash.com/photo-1600596542815-e328701102b9?auto=format&fit=crop&q=80&w=1000', // Modern White Villa
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000', // Modern Interior
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1000', // Gold Accents
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000', // Modern Kitchen
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=1000', // Large Mansion
    'https://images.unsplash.com/photo-1600566752355-35792bedcfe1?auto=format&fit=crop&q=80&w=1000', // Marble Bathroom
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000', // Modern Facade
    'https://images.unsplash.com/photo-1512918760532-3ed0006faf67?auto=format&fit=crop&q=80&w=1000', // Twilight Exterior
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1000', // Apartment Interior
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000', // Modern Loft
    'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=1000', // Bright Bedroom
    'https://images.unsplash.com/photo-1484154218962-a1c00207099b?auto=format&fit=crop&q=80&w=1000', // Kitchen Island
    'https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&q=80&w=1000', // Skyline View
    'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=1000', // Luxury Bedroom
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?auto=format&fit=crop&q=80&w=1000', // Garden Walkway
    'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=1000', // Exterior Symmetrical
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1000', // Living Room
];

const DUBAI_LOCATIONS = [
    'Palm Jumeirah',
    'Dubai Marina',
    'Downtown Dubai',
    'Jumeirah Beach Residence',
    'Business Bay',
    'Dubai Hills Estate',
    'Arabian Ranches',
    'Emirates Hills',
    'Jumierah Lake Towers',
    'Meydan City',
    'Al Barari',
    'City Walk'
];

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Studio'];

const AMENITIES_LIST = [
    'Private Pool', 'Gym', 'Concierge', 'Valet Parking', 'Smart Home',
    'Sea View', 'Burj Khalifa View', 'Private Beach', 'Maids Room',
    'Study', 'Balcony', 'Central A/C', 'Kitchen Appliances', 'Pets Allowed',
    'Covered Parking', 'Spa', 'Cinema', 'BBQ Area'
];

export const generateAgents = (count: number): Agent[] => {
    return Array.from({ length: count }, () => ({
        name: faker.person.fullName(),
        phone: '+971 ' + faker.string.numeric(9),
        image: faker.image.avatar(),
    }));
};

export const generateProperties = (count: number): Property[] => {
    const agents = generateAgents(8); // Pool of agents

    return Array.from({ length: count }, (_, i) => {
        const type = faker.helpers.arrayElement(PROPERTY_TYPES) as Property['type'];
        const location = faker.helpers.arrayElement(DUBAI_LOCATIONS);
        const status = faker.helpers.weightedArrayElement([{ weight: 0.7, value: 'For Sale' }, { weight: 0.3, value: 'For Rent' }]) as Property['status'];

        // Price logic based on type
        let basePrice = 0;
        switch (type) {
            case 'Villa': basePrice = faker.number.int({ min: 5000000, max: 85000000 }); break;
            case 'Penthouse': basePrice = faker.number.int({ min: 8000000, max: 45000000 }); break;
            case 'Apartment': basePrice = faker.number.int({ min: 1200000, max: 9000000 }); break;
            case 'Townhouse': basePrice = faker.number.int({ min: 2500000, max: 6000000 }); break;
            case 'Studio': basePrice = faker.number.int({ min: 700000, max: 1500000 }); break;
        }

        // Adjust for Rent
        let price = status === 'For Rent' ? Math.round(basePrice * 0.08) : basePrice; // Rent is approx 8% of value

        const bedrooms = type === 'Studio' ? 0 : faker.number.int({ min: 1, max: type === 'Villa' ? 7 : 4 });
        const bathrooms = bedrooms === 0 ? 1 : bedrooms + faker.number.int({ min: 0, max: 2 });
        const sqft = bedrooms * 400 + faker.number.int({ min: 500, max: 2000 });

        return {
            id: `gen-${i + 1}`,
            title: `${type} in ${location} with ${faker.helpers.arrayElement(['Great View', 'Luxury Finishing', 'Modern Layout', 'Premium Amenities'])}`,
            price: Math.round(price / 1000) * 1000, // Round to nearest thousand
            location: `${location}, Dubai`,
            bedrooms,
            bathrooms,
            sqft,
            yearBuilt: faker.number.int({ min: 2010, max: 2024 }),
            description: faker.lorem.paragraph({ min: 3, max: 5 }),
            amenities: faker.helpers.arrayElements(AMENITIES_LIST, { min: 3, max: 8 }),
            type,
            status,
            imageUrl: faker.helpers.arrayElement(PROPERTY_IMAGES),
            images: faker.helpers.arrayElements(PROPERTY_IMAGES, 4),
            agent: faker.helpers.arrayElement(agents),
        };
    });
};
