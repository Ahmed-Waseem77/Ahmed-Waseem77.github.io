import React from 'react';
import './BackgroundLayerCommon.css';
import StarField from './StarField';

interface BackgroundLayerProps {
    isVisible: boolean;
}

const BackgroundLayer3: React.FC<BackgroundLayerProps> = ({ isVisible }) => {
    return (
        <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out"
            style={{ 
               opacity: isVisible ? 1 : 0,
               top: -2400 
            }}
        >
            <StarField className='h-[2200px]' style={{ animationDuration: '3s' }} />
            <StarField className='h-[2200px]' style={{ animationDuration: '5s', animationDelay: '1s' }} />
            <StarField className='h-[2200px]' style={{ animationDuration: '7s', animationDelay: '2s' }} />
        </div>
    );
}

export default BackgroundLayer3;
