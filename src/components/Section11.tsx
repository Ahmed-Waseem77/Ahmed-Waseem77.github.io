import React, { useState, useRef } from 'react';
import { Quote, Palette, Scroll } from 'lucide-react';
import { useTheme } from '../ThemeContext'; 
// Assuming these are in your project structure
import Carousel3D from './3DCarousel'; 
import ExpandableImage from './ExpandableImage'; 
import { getAssetUrl } from '../utils'; // Or your asset helper

// Define the interface matches the parent's expectations (like Section9)
interface SectionProps {
    sectionRefs: React.MutableRefObject<any[]>;
    slideClass?: string;
}

const Section11: React.FC<SectionProps> = ({ sectionRefs, slideClass = "" }) => {
  const { theme } = useTheme();
  // Removed internal useRef, using the prop instead
  const [activeArtIndex, setActiveArtIndex] = useState(0);

  // Data for the Carousel and the dynamic description box
  const KOM_SHOQAFA_ART = [
    {
      id: 1,
      src: getAssetUrl('Hermanubis.jpg'),
      alt: 'Hermanubis Statue',
      tip: 'Hermanubis: A hybrid of Hermes (Greek) and Anubis (Egyptian).',
      desc: 'This relief depicts Hermanubis, a syncretic deity combining the Egyptian god Anubis with the Greek god Hermes. Both were guides of souls to the afterlife. Uniquely, he is depicted with a jackal head but dressed in the armor of a Roman legionary, holding a palm branch (victory) and a caduceus (Hermes staff). This is one of the clearest examples of Roman pragmatism adopting Egyptian spirituality.',
      citation: '(Venit, 2002)'
    },
    {
      id: 2,
      src: getAssetUrl('EgyptianSerpentAthenasShield.jpg'),
      alt: 'Agathodaemon Serpent',
      tip: 'The Agathodaemon Serpent guarding the tomb.',
      desc: 'A bearded serpent (the Agathodaemon, or good spirit) guards the burial chamber. The symbolism here is incredibly dense: the serpent wears the Double Crown (Pschent) of Upper and Lower Egypt, carries the Greek Caduceus of Hermes, and the thyrsus of Dionysus. Above it hangs a shield bearing the face of Medusa (the Gorgoneion), a symbol associated with the Greek goddess Athena, intended to ward off evil.',
      citation: '(Empereur, 1995)'
    },
    {
      id: 3,
      src: getAssetUrl('AnubisWithSerapisMixedGod.jpg'),
      alt: 'Mummification Scene',
      tip: 'Anubis tending to the mummy in Roman style.',
      desc: 'A traditional scene of Anubis tending to the deceased on a funerary bed. However, the artistic style is entirely non-Egyptian. The figures are carved with Roman anatomical realism and volume, rather than the rigid, flat profile perspective of the Pharaohs. The clothing and the draping of the fabrics are distinctly Roman, yet the ritual action remains purely Egyptian.',
      citation: '(Tkaczow, 2013)'
    }
  ];

return (
    <section 
        // 1. Added min-h-screen, flex, and justify-center to fix alignment/size
        // 2. Included slideClass from parent
        className={`${slideClass} snap-start relative w-full min-h-screen py-16 flex flex-col justify-center overflow-hidden`} 
        data-index="11" 
        // 3. Using the passed ref prop so the parent knows where this section is
        ref={el => { sectionRefs.current[11] = el }}
    >
      <div className="container px-6 max-w-6xl mb-8 mx-auto">
        
        {/* Header Section */}
        <h2 className={`mt-28 pb-2 text-6xl font-bold ${theme.colors.textGradient}`}>Greco-Roman Syncretism</h2>
        <span className="inline mb-6 block">
          <p className={`${theme.colors.textPrimary}`}> 
            <span className={`text-3xl font-bold ${theme.colors.textPrimary}`}>The Art of Kom Al Shoqafa </span> 
            is the ultimate physical manifestation of Alexandria's cosmopolitan nature. Unlike earlier eras where styles were kept separate, here they collide. You see Egyptian gods with Roman bodies, Greek symbols protecting Egyptian tombs, and a complete disregard for the rigid rules of Pharaonic art in favor of Classical realism 
            <span className={`text-sm ${theme.colors.textMuted} italic`}> (Venit, 2002) </span>.
          </p>
        </span>

        {/* Main Content Layout */}
        <div className="w-full relative mt-4 flex flex-col md:flex-row shrink-0 items-start">
            
            {/* Left Column: 3D Carousel */}
            <div className="mt-8 w-full md:w-3/5 mr-auto pr-8">
                <Carousel3D 
                    items={KOM_SHOQAFA_ART}
                    onIndexChange={setActiveArtIndex}
                    height="450px"
                    cardWidth="w-[230px] md:w-[280px]"
                    cardHeight="h-[350px]"
                    autoPlay={false}
                />
                <div className={`mt-4 text-center ${theme.colors.textMuted} text-xs italic`}>
                    Swipe or use arrow keys to explore the reliefs.
                </div>
            </div>

            {/* Right Column: Scrollable List & Dynamic Description */}
            <span className="w-full md:w-2/5 min-w-0 h-full flex flex-col mt-8 md:mt-0"> 
                
                {/* Scrollable Mini-Gallery (Reference Style) */}
                <div
                    className="
                    flex flex-row shrink-0
                    w-full
                    min-w-0
                    overflow-x-auto            
                    [&::-webkit-scrollbar]:hidden 
                    [-ms-overflow-style:none] 
                    [scrollbar-width:none]
                    mb-8
                    "
                >
                    {KOM_SHOQAFA_ART.map((art) => (
                        <ExpandableImage
                            key={art.id}
                            src={art.src}
                            alt={art.alt}
                            className="w-40 h-52 mr-4 rounded-xl flex-shrink-0 object-cover shadow-md hover:scale-105 transition-transform"
                            caption={`${art.alt} - Kom Al Shoqafa`}
                        />
                    ))}
                </div>

                {/* Floating Header Description Box */}
                <div 
                    className={`
                        relative                    
                        w-full p-8 md:p-6 
                        ${theme.colors.bgCard} 
                        ${theme.cards.base} 
                        ${theme.colors.borderSubtle} 
                        ${theme.cards.hoverPrimary}
                        transition-all duration-300
                    `}
                >
                    {/* Floating Badge */}
                    <span 
                        className={`
                            absolute                 
                            top-0 left-8
                            -translate-y-1/2        
                            inline-flex items-center
                            ${theme.colors.bgMobileMenu}
                            rounded-lg
                            pr-4                           
                        `}
                    >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-md ${theme.badges.iconContainerPrimary}`}>
                            <Palette className="w-6 h-6" />
                        </div>
                        <h2 className={`text-xl md:text-2xl font-bold ${theme.colors.textPrimary} ml-4`}>
                            Artistic Fusion
                        </h2>
                    </span>

                    {/* Dynamic Text Content */}
                    <div className={`mt-6 ${theme.colors.textPrimary} min-h-[120px]`}>
                        <p className="leading-relaxed">
                            {KOM_SHOQAFA_ART[activeArtIndex].desc} 
                            <span className={`text-xs ${theme.colors.textMuted} ml-2`}>
                                {KOM_SHOQAFA_ART[activeArtIndex].citation}
                            </span>
                        </p>
                    </div>

                    {/* Footer Highlight */}
                    <div className={`shadow-md italic inline-flex w-full p-4 md:p-4 mt-6 rounded-lg ${theme.colors.borderSubtle}`}
                        style={{
                            backgroundColor: `${theme.hex.accentSecondary}1A`,
                            color: theme.hex.accentSecondary
                        }}
                    >
                        <Scroll className="mr-4 w-5 h-5"/>
                        <span className="text-sm">
                            This blending of gods (Theocrasia) was a political tool to unify the Greek and Egyptian populations.
                        </span>
                    </div>
                </div>
            </span>
        </div>
      </div>
    </section>
  );
};

export default Section11;
