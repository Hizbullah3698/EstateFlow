import React, { useEffect, useState } from 'react';
import { X, Heart, HeartOff } from 'lucide-react';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for fade out animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <Heart className="text-red-500" size={20} fill="currentColor" />;
            case 'error':
                return <HeartOff className="text-gray-500" size={20} />;
            default:
                return <Heart className="text-blue-500" size={20} />;
        }
    };

    const getBgColor = () => {
        switch (type) {
            case 'success':
                return 'bg-white dark:bg-slate-800 border-red-200 dark:border-red-900';
            case 'error':
                return 'bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700';
            default:
                return 'bg-white dark:bg-slate-800 border-blue-200 dark:border-blue-900';
        }
    };

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border-2 transition-all duration-300 ${getBgColor()} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
        >
            {getIcon()}
            <p className="text-sm font-medium text-gray-900 dark:text-white">{message}</p>
            <button
                onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 300);
                }}
                className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default Toast;
