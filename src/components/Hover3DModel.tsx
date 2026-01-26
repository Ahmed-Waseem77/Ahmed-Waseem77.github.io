import React, { useState, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage, Html } from '@react-three/drei';
// @ts-ignore
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { Loader2, Move3d } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface Hover3DModelProps {
  modelSrc: string;
  imageSrc: string;
  width?: string;
  height?: string;
  alt?: string;
  modelColor?: string;
  rotation?: [number, number, number]; // Prop to fix orientation (x, y, z)
}

const Model = ({ url, color, rotation }: { url: string; color: string; rotation: [number, number, number] }) => {
  const geometry = useLoader(STLLoader, url);

  return (
    <mesh 
      geometry={geometry} 
      rotation={rotation} 
      castShadow 
      receiveShadow
    >
       <meshStandardMaterial 
          color={color} 
          roughness={0.8} // High roughness = Matte/Clay look
          metalness={0.1}
       />
    </mesh>
  );
};

const CanvasLoader = () => {
  const { theme } = useTheme();
  return (
    <Html center>
      <div className={`flex flex-col items-center gap-2 ${theme.colors.accentPrimary}`}>
        <Loader2 className="animate-spin w-8 h-8" />
        <span className="text-xs font-bold uppercase tracking-wider">Loading...</span>
      </div>
    </Html>
  );
};

const Hover3DModel: React.FC<Hover3DModelProps> = ({ 
  modelSrc, 
  imageSrc, 
  width = "w-full", 
  height = "h-[300px]",
  alt = "3D Model",
  modelColor, 
  rotation = [0, 0, 0] // Default to no rotation
}) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Fallback color if prop not provided
  const baseColor = modelColor || theme.hex?.accentSecondary || "#cccccc";

  return (
    <div 
      className={`relative ${width} ${height} rounded-xl overflow-hidden shadow-2xl border ${theme.colors.borderSubtle} ${theme.colors.bgCard} group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(true)}
    >
      {/* --- 1. STATIC PREVIEW IMAGE --- */}
      <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <img 
          src={imageSrc} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
        
        <div className={`absolute top-4 right-4 ${theme.colors.bgNav} backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 flex items-center gap-2 shadow-lg`}>
            <Move3d size={16} className={theme.colors.accentPrimary} />
            <span className={`text-xs font-bold text-white tracking-wider`}>Interactive 3D Model, Hover to Display</span>
        </div>
      </div>

      {/* --- 2. 3D CANVAS --- */}
      {isHovered && (
        <div className={`absolute inset-0 z-20 animate-in fade-in duration-700`}
             style={{ background: `linear-gradient(to bottom, ${theme.hex.bgMain || '#111'}, ${theme.hex.bgStandard || '#222'})` }}>
          
          <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }}>
            <Suspense fallback={<CanvasLoader />}>
              
              <Stage environment="city" intensity={0.5} adjustCamera>
                <Model 
                    url={modelSrc} 
                    color={baseColor}
                    rotation={rotation}
                />
              </Stage>

              <OrbitControls 
                makeDefault 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
              />
            </Suspense>
          </Canvas>
          
          <div className="absolute bottom-3 w-full text-center pointer-events-none opacity-60">
             <p className={`p-2 text-md uppercase ${theme.colors.textSecondary}`}>
	     	Mouse + Shift to Pan <br></br> Mouse to Pivot <br></br> Scroll to Zoom
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hover3DModel;
