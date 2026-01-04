import type { Property } from '../api/mockData';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    properties?: Property[];
}

interface GeminiResponse {
    candidates: Array<{
        content: {
            parts: Array<{
                text: string;
            }>;
        };
    }>;
}

export class GeminiService {
    private apiKey: string;
    private properties: Property[];

    constructor(properties: Property[]) {
        this.apiKey = GEMINI_API_KEY || '';
        this.properties = properties;
    }

    async sendMessage(userMessage: string, conversationHistory: ChatMessage[]): Promise<ChatMessage> {
        if (!this.apiKey) {
            return this.createErrorMessage('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
        }

        try {
            // Build context for Gemini
            const systemContext = this.buildSystemContext();
            const conversationContext = this.buildConversationContext(conversationHistory);

            // Combine contexts
            const fullPrompt = `${systemContext}\n\n${conversationContext}\n\nUser: ${userMessage}\n\nAssistant:`;


            console.log('Calling Gemini API with key:', this.apiKey ? 'Key present' : 'No key');

            // Call Gemini API
            const response = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: fullPrompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 800,
                    }
                })
            });

            console.log('Gemini API Response Status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Gemini API Error:', errorText);
                throw new Error(`Gemini API error: ${response.status} - ${errorText.substring(0, 200)}`);
            }

            const data: GeminiResponse = await response.json();
            const aiResponse = data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not generate a response.';

            // Search for relevant properties based on the conversation
            const relevantProperties = this.searchProperties(userMessage, aiResponse);

            return {
                id: Date.now().toString(),
                role: 'assistant',
                content: aiResponse,
                timestamp: new Date(),
                properties: relevantProperties.length > 0 ? relevantProperties : undefined
            };

        } catch (error) {
            console.error('Gemini API Error:', error);
            return this.createErrorMessage('Sorry, I encountered an error. Please try again.');
        }
    }

    private buildSystemContext(): string {
        const propertyStats = this.getPropertyStats();

        return `You are an AI real estate assistant for EstateFlow, a premium Dubai property platform. 

AVAILABLE PROPERTIES OVERVIEW:
- Total Properties: ${propertyStats.total}
- Price Range: AED ${propertyStats.minPrice.toLocaleString()} - AED ${propertyStats.maxPrice.toLocaleString()}
- Property Types: ${propertyStats.types.join(', ')}
- Locations: ${propertyStats.locations.slice(0, 5).join(', ')}${propertyStats.locations.length > 5 ? '...' : ''}

YOUR ROLE:
- Help users find properties matching their criteria
- Answer questions about available listings
- Provide recommendations based on budget, location, and preferences
- Be friendly, professional, and concise
- When users ask about specific criteria (bedrooms, price, location, type), acknowledge what properties match
- Use AED currency for all prices
- Keep responses under 100 words unless providing detailed property information

IMPORTANT: When users ask to see properties or search for specific criteria, acknowledge their request and mention that matching properties will be shown below your message.`;
    }

    private buildConversationContext(history: ChatMessage[]): string {
        if (history.length === 0) return '';

        const recentHistory = history.slice(-4); // Last 4 messages for context
        return recentHistory.map(msg =>
            `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
        ).join('\n');
    }

    private getPropertyStats() {
        const prices = this.properties.map(p => p.price);
        const types = [...new Set(this.properties.map(p => p.type))];
        const locations = [...new Set(this.properties.map(p => p.location))];

        return {
            total: this.properties.length,
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices),
            types,
            locations
        };
    }

    private searchProperties(userMessage: string, aiResponse: string): Property[] {
        const message = (userMessage + ' ' + aiResponse).toLowerCase();
        let results = [...this.properties];

        // Extract criteria from message
        const bedroomMatch = message.match(/(\d+)[- ]?(bed|bedroom)/i);
        const priceMatch = message.match(/under|below|less than|max|maximum.*?(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:million|m|k|aed)?/i);
        const typeMatch = message.match(/\b(apartment|villa|penthouse|townhouse)\b/i);

        // Location matching - check for common Dubai areas
        const locations = ['dubai marina', 'downtown', 'palm jumeirah', 'business bay', 'jbr', 'jumeirah', 'deira', 'bur dubai'];
        const locationMatch = locations.find(loc => message.includes(loc));

        // Apply filters
        if (bedroomMatch) {
            const bedrooms = parseInt(bedroomMatch[1]);
            results = results.filter(p => p.bedrooms === bedrooms);
        }

        if (priceMatch && priceMatch[1]) {
            let maxPrice = parseFloat(priceMatch[1].replace(/,/g, ''));
            if (message.includes('million') || message.includes('m')) {
                maxPrice *= 1000000;
            } else if (message.includes('k')) {
                maxPrice *= 1000;
            }
            results = results.filter(p => p.price <= maxPrice);
        }

        if (typeMatch) {
            const type = typeMatch[1].charAt(0).toUpperCase() + typeMatch[1].slice(1);
            results = results.filter(p => p.type.toLowerCase() === type.toLowerCase());
        }

        if (locationMatch) {
            results = results.filter(p =>
                p.location.toLowerCase().includes(locationMatch)
            );
        }

        // If we have filters applied, return top 6 results
        // If no filters, only return properties if explicitly asked to show/find/search
        const isSearchQuery = /show|find|search|looking for|want|need|get me/i.test(message);

        if (bedroomMatch || priceMatch || typeMatch || locationMatch) {
            return results.slice(0, 6);
        } else if (isSearchQuery) {
            return results.slice(0, 6);
        }

        return [];
    }

    private createErrorMessage(content: string): ChatMessage {
        return {
            id: Date.now().toString(),
            role: 'assistant',
            content,
            timestamp: new Date()
        };
    }
}
