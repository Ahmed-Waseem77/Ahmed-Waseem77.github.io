import React, { useState } from 'react';
import { Crown, Palette, Info } from 'lucide-react'; // Replaced emojis with icons
import Carousel3D from './3DCarousel';
import FadingGrid from './FadingGrid';
import { useTheme } from '../ThemeContext';
import { getAssetUrl } from '../utils'; // Adjust path to your utility

// --- DATA DEFINITION ---
const SECTION_9_DATA = [
  {
    id: 1,
    // Using getAssetUrl utility for images
    src: getAssetUrl('LuxorTempleDancing.jpg'),
    tip: "Festival Processions (Luxor Temple)",
    description: "A dynamic relief from the Luxor Temple walls. Unlike earlier static art, these figures, likely participants in the Opet Festival, are shown in rhythmic motion, bending and bowing. It highlights the grand, performative nature of royal religious ceremonies."
  },
  {
    id: 2,
    src: getAssetUrl('LuxorTempleCooking.jpg'),
    tip: "Offerings & Preparation",
    description: "A rare and detailed glimpse into the logistics of temple life. This relief depicts the preparation of food or offerings, showing the intricate care taken to serve the gods. The carving style is classic New Kingdom: raised relief with soft modeling."
  },
  {
    id: 3,
    src: getAssetUrl('WorkersVillage1.jpg'),
    tip: "The Artisan's Touch (Deir el-Medina)",
    description: "A vibrant scene from a tomb in the Workers' Village. In contrast to the monochrome stone of the temples, these private tombs are painted in brilliant ochres and golds. The style is freer, depicting the deceased and their families with a liveliness reserved for private art."
  },
  {
    id: 4,
    src: getAssetUrl('WorkersVillage2.jpg'),
    tip: "Symbolism in Daily Life",
    description: "A playful yet symbolic detail from a worker's tomb, featuring a monkey, often associated with humor or fertility eating fruit. This level of whimsy and intimate detail is almost never seen in the rigid, formal art of the Pharaohs' state temples."
  }
];

interface SectionProps {
    sectionRefs: React.MutableRefObject<any[]>;
    slideClass?: string; // <--- Added this
}

const Section9: React.FC<SectionProps> = ({ sectionRefs, slideClass = "" }) => {
    const { theme } = useTheme();
    const [activeSection9Index, setActiveSection9Index] = useState(0);

    return (
        <section 
            className={`${slideClass} min-h-screen py-20 flex flex-col justify-center relative overflow-hidden`}
            data-index="9" 
            ref={el => { sectionRefs.current[9] = el }}
        >
            <div className="container px-6 max-w-6xl mx-auto flex flex-col h-full relative z-10">
                
                {/* --- HEADER --- */}
                <h2 className={`text-5xl md:text-6xl font-bold mt-12 pb-2 ${theme.colors.textGradient}`}>
                    New Kingdom Art
                </h2>

                {/* --- MAIN CONTENT (Carousel + Text) --- */}
                <div className="flex flex-col md:flex-row items-center w-full ">
                    
                    {/* LEFT: THE CAROUSEL */}
                    <div className="w-full md:w-2/3 h-[400px] lg:h-[450px]">
                        <Carousel3D 
                            items={SECTION_9_DATA}
                            height="100%"
			  cardWidth = "w-[45%] md:w-[45%]"
			  cardHeight = "aspect-[1]"
                            // IMPORTANT: Ensures the text on the right updates when carousel slides
                            onIndexChange={setActiveSection9Index} 
                        />
                    </div>

                    {/* RIGHT: THE DYNAMIC TEXT */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <div className={`
                            p-8 rounded-xl transition-all duration-500 relative overflow-hidden
                            ${theme.colors.bgCard} 
                            border ${theme.colors.borderSubtle}
                            backdrop-blur-md shadow-2xl
                        `}>
                            {/* Decorative background accent */}
                            <div className={`absolute top-0 right-0 w-32 h-32 ${theme.colors.bgNav} opacity-20 rounded-bl-full -mr-8 -mt-8 pointer-events-none`} />

                            <div className="flex items-center gap-2 mb-4">
                                <Info size={20} className={theme.colors.accentPrimary} />
                                <h3 className={`text-3xl font-bold ${theme.colors.accentPrimary} relative z-10`}>
                                    {SECTION_9_DATA[activeSection9Index].tip}
                                </h3>
                            </div>
                            
                            <p className={`${theme.colors.textSecondary} text-lg leading-relaxed relative z-10`}>
                                {SECTION_9_DATA[activeSection9Index].description}
                            </p>

                            {/* Progress Indicator */}
                            <div className="mt-8 flex items-center gap-3 text-sm font-mono opacity-60">
                                <div className={`h-1 flex-1 ${theme.colors.bgNav} rounded-full overflow-hidden`}>
                                    <div 
                                        className={`h-full ${theme.colors.accentTertiary} transition-all duration-300`}
                                        style={{ width: `${((activeSection9Index + 1) / SECTION_9_DATA.length) * 100}%` }}
                                    />
                                </div>
                                <span className={theme.colors.textHighlight}>
                                    {activeSection9Index + 1} / {SECTION_9_DATA.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM: CONTRAST CARD (Royal vs Commoner) --- */}
                <div className={`
                    w-full p-8 rounded-2xl border 
                    ${theme.colors.bgCard} ${theme.colors.borderSubtle}
                    backdrop-blur-md shadow-lg
                `}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        
                        {/* Column 1: Royal Art */}
                        <div className={`border-r-0 md:border-r border-white/10 pr-0 md:pr-8`}>
                            <h4 className={`text-xl font-bold ${theme.colors.accentSecondary} mb-3 flex items-center gap-3`}>
                                <Crown size={24} className={`${theme.colors.accentSecondary}`} />
                                Royal State Art
                            </h4>
                            <p className={`${theme.colors.textSecondary} text-sm leading-relaxed`}>
                                Seen in the <strong>Luxor Temple reliefs</strong> (Items 1 & 2). The art is formal, rigid, and idealized. It focuses on the Pharaoh's relationship with the gods and maintaining <em>Ma'at</em> (order). Figures are often carved in relief on stone to last eternity.
                            </p>
                        </div>

                        {/* Column 2: Worker Art */}
                        <div className="pl-0 md:pl-8">
                            <h4 className={`text-xl font-bold ${theme.colors.accentTertiary} mb-3 flex items-center gap-3`}>
                                <Palette size={24} className={`${theme.colors.accentTertiary}`} />
                                The Workers' View
                            </h4>
                            <p className={`${theme.colors.textSecondary} text-sm leading-relaxed`}>
                                Seen in the <strong>Workers' Village paintings</strong> (Items 3 & 4). This art is personal, colorful, and intimate. Created by artisans for their own tombs, it features lively brushwork, scenes of family life, and whimsical details (like monkeys) rarely permitted in royal commissions.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            
            <FadingGrid />
        </section>
    );
};

export default Section9;
