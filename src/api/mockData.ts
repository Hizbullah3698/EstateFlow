
import type { Property, Agent } from './types';
import { generateProperties } from './propertyGenerator';

// Re-export types for backward compatibility with components
export type { Property, Agent };

// Generate 120 properties for the "infinite" feel
export const MOCK_PROPERTIES: Property[] = generateProperties(120);

/**
 * Simulates fetching properties from an API with a delay.
 * Returns a Promise that resolves with the mock data.
 */
export const fetchProperties = (): Promise<Property[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_PROPERTIES);
        }, 800); // Simulate network delay
    });
};
