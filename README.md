EstateFlow – Premium Dubai Real Estate Dashboard

EstateFlow is a modern, AI-enabled real estate dashboard designed for the Dubai property market. The platform focuses on performance, usability, and a premium user experience, allowing users to explore, compare, and analyze real estate listings efficiently using real-time data and intelligent assistance.

Key Features

AI-Powered Property Assistant
Integrated with Google Gemini AI, enabling natural language property search, location-based queries, and personalized recommendations.

Real-Time Property Listings
Uses the Bayut API (via RapidAPI) to display live property data for Dubai, ensuring accurate and up-to-date listings.

Premium User Interface
Built with React 19, Tailwind CSS, and Framer Motion to deliver smooth animations, responsive layouts, and a polished, professional UI.

Property Comparison Tool
Allows users to compare multiple properties side by side based on price, size, amenities, and key features.

Generative Data Engine
Includes a custom data generator to create realistic demo properties, agent profiles, and metadata for development and presentation purposes.

Tech Stack

Frontend Framework: React 19 + Vite

Programming Language: TypeScript

Styling: Tailwind CSS

Animations: Framer Motion

AI Integration: Google Gemini API

External Data Source: Bayut Property API (RapidAPI)

Icons: Lucide React

Local Setup & Installation
Prerequisites

Node.js (v18 or higher)

npm (comes with Node.js)

Clone the Repository
git clone https://github.com/Hizbullah3698/EstateFlow.git
cd EstateFlow/real-estate-dashboard

Install Dependencies
npm install

Environment Configuration

Create a .env file in the real-estate-dashboard root directory and add the following:

VITE_RAPIDAPI_KEY=your_bayut_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key


API keys can be obtained from:

RapidAPI (Bayut API)

Google AI Studio (Gemini API)

Run the Development Server
npm run dev


The application will be available at http://localhost:5173.

Build for Production
npm run build

Project Structure

src/api – API integration and data generation logic

src/components – Reusable UI components

src/context – Global state management (Chat, Favorites, Comparison)

src/services – AI and external service integrations

src/pages – Application routes and main views

Developed by
Hizbullah
Frontend Engineer
GitHub: https://github.com/Hizbullah3698