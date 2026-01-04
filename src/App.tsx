import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import ListingsDashboard from './pages/ListingsDashboard';
import Favorites from './pages/Favorites';
import ComparisonPage from './pages/ComparisonPage';
import AboutSection from './components/AboutSection';
import ChatWidget from './components/ChatWidget';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ComparisonProvider } from './context/ComparisonContext';
import { ChatProvider } from './context/ChatContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <ComparisonProvider>
          <ChatProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="listings" element={<ListingsDashboard />} />
                  <Route path="compare" element={<ComparisonPage />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="about" element={<AboutSection />} />
                </Route>
              </Routes>
              <ChatWidget />
            </BrowserRouter>
          </ChatProvider>
        </ComparisonProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;