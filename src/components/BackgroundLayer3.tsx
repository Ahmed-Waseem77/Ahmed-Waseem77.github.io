import React, { useMemo } from 'react';
import { generateStars } from '../utils';
import './BackgroundLayerCommon.css';

const BackgroundLayer3 = ({scrollTop}) => {
	const layer1 = useMemo(() => generateStars(200, 0.3, 2), []);
	const layer2 = useMemo(() => generateStars(200, 0.3, 2), []);
	const layer3 = useMemo(() => generateStars(200, 0.3, 2), []);

    	const fadeDistance = 3500;
    	const opacity = Math.max(0, 1 - scrollTop / fadeDistance);

    	// Performance Optimization: If invisible, don't render anything
    	if (opacity === 0) return null;

	return (
		<>
      	<div className="w-[100vw] h-[1000px]">
      	</div>
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
        	{/* Decorative Grid Lines */}
          	<div className="absolute top-0 right-1/4 w-px h-full bg-slate-800/50" />
          	<div className="absolute top-0 left-1/4 w-px h-full bg-slate-800/50" />
		</>
	);
}

export default BackgroundLayer3;
