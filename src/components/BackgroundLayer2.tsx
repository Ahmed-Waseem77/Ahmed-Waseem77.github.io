import React, { useMemo } from 'react';
import { generateStars } from '../utils';
import './BackgroundLayerCommon.css';

interface BackgroundLayerProps {
  scrollTop: number; // Pass the current scroll position here
}

const BackgroundLayer2 = ({scrollTop}) => {
    const layer1 = useMemo(() => generateStars(750), []);
    const layer2 = useMemo(() => generateStars(750), []);
    const layer3 = useMemo(() => generateStars(750), []);

    // --- OPACITY CALCULATION ---
    // The stars will be fully visible at 0px.
    // They will be fully invisible (transparent) by 800px.
    // Adjust '800' to make them fade faster (lower number) or slower (higher number).
    const fadeDistance = 5000;
    const opacity = Math.max(0, 1 - scrollTop / fadeDistance);

    // Performance Optimization: If invisible, don't render anything
    if (opacity === 0) return null;

    return (
	<>
        <div className="absolute inset-0 pointer-events-none"
	     style={{ 
		     opacity: opacity,
		     top: -2300
	   	    }}
	>
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
	</>
    );
}

export default BackgroundLayer2;
