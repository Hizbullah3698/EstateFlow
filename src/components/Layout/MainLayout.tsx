import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow pt-0">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
