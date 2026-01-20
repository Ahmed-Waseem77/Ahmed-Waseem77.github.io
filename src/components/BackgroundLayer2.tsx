import React, { useMemo } from 'react';
import { generateStars } from '../utils';
import './BackgroundLayerCommon.css';

const BackgroundLayer2 = () => {
    const layer1 = useMemo(() => generateStars(750), []);
    const layer2 = useMemo(() => generateStars(750), []);
    const layer3 = useMemo(() => generateStars(750), []);

    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* Layer 1: Fast twinkle */}
            <div 
                className="animate-twinkle absolute top-0 left-0 w-[1px] h-[1px] rounded-full"
                style={{ 
                    boxShadow: layer1,
                    animationDuration: '3s' 
                }}
            />

            {/* Layer 2: Medium twinkle, offset by 1 second */}
            <div 
                className="animate-twinkle absolute top-0 left-0 w-[1px] h-[1px] rounded-full"
                style={{ 
                    boxShadow: layer2,
                    animationDuration: '5s',
                    animationDelay: '1s'
                }}
            />

            {/* Layer 3: Slow twinkle, offset by 2 seconds */}
            <div 
                className="animate-twinkle absolute top-0 left-0 w-[1px] h-[1px] rounded-full"
                style={{ 
                    boxShadow: layer3,
                    animationDuration: '7s',
                    animationDelay: '2s'
                }}
            />
        </div>
    );
}

export default BackgroundLayer2;
