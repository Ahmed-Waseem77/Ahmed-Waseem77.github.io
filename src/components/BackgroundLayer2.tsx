import React, { useMemo } from 'react';
import { generateStars } from '../utils';
import './BackgroundLayerCommon.css';

interface BackgroundLayerProps {
  isVisible: boolean; // Replaced scrollTop with boolean
}

const BackgroundLayer2: React.FC<BackgroundLayerProps> = ({ isVisible }) => {
    const layer1 = useMemo(() => generateStars(750), []);
    const layer2 = useMemo(() => generateStars(750), []);
    const layer3 = useMemo(() => generateStars(750), []);

    return (
        <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out"
            style={{ 
                opacity: isVisible ? 1 : 0, // Simple toggle
                top: -2400 
            }}
        >
            <div 
                className="animate-twinkle absolute top-0 left-0 w-[1px] h-[1px] rounded-full"
                style={{ boxShadow: layer1, animationDuration: '3s' }}
            />
            <div 
                className="animate-twinkle absolute top-0 left-0 w-[1px] h-[1px] rounded-full"
                style={{ boxShadow: layer2, animationDuration: '5s', animationDelay: '1s' }}
            />
            <div 
                className="animate-twinkle absolute top-0 left-0 w-[1px] h-[1px] rounded-full"
                style={{ boxShadow: layer3, animationDuration: '7s', animationDelay: '2s' }}
            />
        </div>
    );
}

export default BackgroundLayer2;
