import ParallaxLayer from '../components/ParallaxLayer';
import BackgroundLayer2 from '../components/BackgroundLayer2';
import BackgroundLayer3 from '../components/BackgroundLayer3';
import DynamicBackground from '../components/DynamicBackground';
import TimelineMagnifier from '../components/TimelineMagnifier';
import Carousel3D from '../components/3DCarousel';
import FanAlArd from '../assets/FanAlArd';

import React, { useState, useEffect, useRef } from 'react';
import { Zap, Scroll, ChevronDown, Hourglass, BadgeQuestionMark } from 'lucide-react';
import { getAssetUrl } from '../utils'

import { useTheme } from '../ThemeContext'; 
import FadingGrid from '../components/FadingGrid';

const ERA_DATA: Record<number, { title: string; description: string; slides: any[] }> = {
    0: {
        title: "Old Kingdom",
        description: "The age of the great pyramids and the establishment of pharaonic traditions. The capital was Memphis and the old Kingdom rule Lasted around 500 years.",
        slides: [
    		{ id: 'ok-1', src: getAssetUrl('Saqqara.jpg'), tip: "Saqqara Pyramid (FanAlArd, 2026)" },
		{ id: 'ok-2', src: getAssetUrl('GizaMenkawra.jpg'), tip: "Giza Menkawra Pyramid and Pyramids of the Queens (FanAlArd, 2026)" },
    		{ id: 'ok-3', src: getAssetUrl('GizaKhafrae.jpg'), tip: "Giza Khafrae Pyramid (FanAlArd, 2026)" },
        ]
    },
    1: {
	    title:"Middle Kingdom",
	    description: "The Second Golden Age of Ancient Egypt, with the capital being Thebes.",
	    slides: [
		{id: 'mk-1', src: getAssetUrl('tombsOfBeniHassan.jpg'), tip: "Exterior view of tombs of Khety and Baqet III, 28 km south of Minya, Egypt (Markh, English Wikipedia, 2005)"},
		{id: 'mk-2', src: getAssetUrl('AbydosFacade.jpg'), tip: "Façade, Temple of Seti I, Abydos, Egypt (Roland Unger, English Wikipedia, 2000)"}
	    ]
    },
    2: {
        title: "New Kingdom",
        description: "The golden age of empire, Tutankhamun, and Ramses the Great.",
        slides: [
    { id: 'nk-1', src: getAssetUrl('ValleyNobles.jpg'), tip: "Ancient Egypt" },
    { id: 'nk-2', src: getAssetUrl('ValleyNobles2.jpg'), tip: "The Golden Age" },
    { id: 'nk-3', src: getAssetUrl('ValleyNoblesRelief1.jpg'), tip: "Modern Era" },
        ]
    },
    3: {
	title: "Persian",
	description: "A short ~200 Years rule of the Persian empire over Egypt. There was not much of a cultural exchange that happened, and Egypt under Persian rule was more of a colony",
	slides: [
            { id: 'pr-1', src: getAssetUrl('PersianEgypt.jpg'), tip: "Egypt in the First Persian Empire, (Ancient Egypt Online, Retrieved Jan 2026)" },
	]
    },
    4: {
        title: "Greco-Roman",
        description: "The fusion of Egyptian traditions with Greek and Roman artistry.",
        slides: [
            { id: 'gr-1', src: getAssetUrl('PtolemaicKing.jpg'), tip: "A Ptolemaic King depicted as an Egyptian Pharaoh, Egyptian Museum of Antiquities (FanAlArd, 2026)" },
            { id: 'gr-2', src: getAssetUrl('KomAlDikka.jpg'), tip: "KomAlDikka, Alexandria (FanAlArd, 2026)" },
            { id: 'gr-3', src: getAssetUrl('QaitBayEntrance.jpg'), tip: "Entrance of Qaitbay, which was once the great lighthouse of Alexandria, (FanAlArd, 2026)" },
        ]
    },
};

const ParallaxView: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const [selectedEraIndex, setSelectedEraIndex] = useState<number>(0);
  const eras = ["Old Kingdom 2700 BCE - 2200 BCE", "Middle Kingdom 2000 BCE - 1700 BCE", "New Kingdom 1500 BCE - 1000 BCE", "Persian 525 BCE - 404 BCE" ,"Greco-Roman (Ptolemaic) 235 BCE - 642 BCE" ];
  const currentData = ERA_DATA[selectedEraIndex] || ERA_DATA[0]; 

  // 1. Scroll State
  const [scrollTop, setScrollTop] = useState<number>(0);
  
  // 2. Active Slide State
  const [activeSlide, setActiveSlide] = useState<number>(0);
useEffect(() => {
    // Assuming "3rd section" is the one with data-index="3" (Ancient Egyptian Religion)
    if (activeSlide === 3) {
      setTheme('tokyo-dark'); // Or 'tokyo-day' / 'gruvbox-light' based on preference
    } else {
      setTheme('gruvbox-dark'); // Revert to your default base theme when leaving that section
    }
  }, [activeSlide, setTheme]);


  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3. Section Refs
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // --- EFFECT 1: SCROLL LISTENER ---
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            setScrollTop(containerRef.current.scrollTop);
          }
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // --- EFFECT 2: INTERSECTION OBSERVER ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveSlide(index);
        }
      });
    }, {
      threshold: 0.5,
    });

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // FIXED: Changed 'z-100' (invalid) to 'z-30' (valid) to ensure content sits on top
  const slideClass = "h-[100dvh] w-full snap-center flex flex-col justify-center relative z-30 items-center p-6";

  return (
    <div className={`relative w-full h-[100dvh] ${theme.colors.bgMain} overflow-hidden`}>
      
      {/* --- BACKGROUND LAYERS (Z-0) --- */}
      {/* We keep these at z-0 or z-auto so they stay behind the content scroller */}
      <DynamicBackground scrollTop={scrollTop}/>

      <ParallaxLayer speed={0.2} offset={scrollTop} className="pointer-events-none z-0 top-20">
          <BackgroundLayer2 isVisible={activeSlide === 3}/>
      </ParallaxLayer>

      <ParallaxLayer speed={0.5} offset={scrollTop} className="pointer-events-none z-0 top-40">
          <BackgroundLayer3 isVisible={activeSlide === 3}/>
      </ParallaxLayer>

      <ParallaxLayer speed={1.2} offset={scrollTop} className="pointer-events-none z-0 top-60">
        {/* Foreground Layer Content */}
      </ParallaxLayer>

      {/* --- MAIN CONTENT SCROLLER (Z-10) --- */}
      <div 
        ref={containerRef}
        // FIXED: Added z-10 class explicitly. 
        // snap-mandatory ensures rigid "slideshow" feel.
        className="absolute inset-0 overflow-y-auto overflow-x-hidden z-10 scroll-smooth custom-scrollbar snap-y snap-mandatory"
      >
        
        <FadingGrid />
        {/* --- SLIDE 0: HERO / TITLE --- */}
        <section 
            className={slideClass}
            data-index="0"
            ref={el => {sectionRefs.current[0] = el}}
        >
            <div className="container mx-auto px-6 max-w-6xl text-center md:text-left">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6 border ${theme.badges.primary}`}>
                  <Zap className="w-4 h-4" />
                  <span>Digital Tourguide Experience</span>
                </div>
                <h1 className={`text-6xl md:text-8xl font-bold ${theme.colors.textPrimary} mb-6 leading-tight`}>
		<span className={`inline-flex items-end w-full items-end`}>
                  Ancient Egypt's
		  <div className={`ml-auto w-48 h-24`}>
		  <FanAlArd className="w-48 h-24"
		  syle={{
			color: `${theme.hex.accentPrimary}`
		  }}/>
		  </div>
		  </span>
		  <br />
                  <span className={theme.colors.textGradient}>
                    Art & Architecture
                  </span>
                </h1>
                <p className={`text-xl ${theme.colors.textSecondary} max-w-2xl leading-relaxed mb-12`}>
                  A journey through Ancient Egypt Art & Architecture across the ancient pharaonic and greco-roman eras.
                </p>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                    <ChevronDown className={`w-6 h-6 ${theme.colors.textMuted}`} />
                </div>
            </div>
            <div className="container mx-auto px-6 max-w-6xl">
              <div className={`w-full p-8 md:p-12 ${theme.colors.bgCard} ${theme.cards.base} ${theme.colors.borderSubtle} ${theme.cards.hoverPrimary}`}>
                <span className="inline-flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${theme.badges.iconContainerSecondary}`}>
                      <BadgeQuestionMark className="w-6 h-6" />
                    </div>
                    <h2 className={`text-3xl font-bold ${theme.colors.textPrimary} ml-4`}>Digital Tourguide?</h2>
                </span>
                <p className={`${theme.colors.textSecondary} text-lg leading-relaxed`}>
                    This digital tour guide is designed for a wide audience, including university
                    students, tourists without access to professional tour guides, and visitors who
                    participated in guided tours but found the pace or explanations overwhelming.
                </p>
              </div>
            </div>
        </section>


{/* --- SLIDE 2: HISTORICAL TIMELINE (MODIFIED) --- */}
        <section 
            className={slideClass}
            data-index="2"
            ref={el => {sectionRefs.current[2] = el}}
        >
            <div className="container mx-auto px-6 max-w-6xl">
              <div>
                
                {/* Header */}
                <span className="mt-24 items-center inline-flex mb-8"> 
                    <Hourglass className={`w-14 h-14 ${theme.colors.accentPrimary}`} />
                    <h2 className={`ml-4 text-6xl font-bold ${theme.colors.textGradientSecondary}`}>Historical Timeline</h2>
                </span>

                {/* Description */}
                <p className={`${theme.colors.textSecondary} text-lg leading-relaxed mb-4`}>
                   Drag the artifact scanner to explore different eras of Ancient Egypt.
                </p>

                {/* --- THE INTERACTIVE SLIDER --- */}
                <div className="px-4 mb-4">
                    <TimelineMagnifier 
                        eras={eras} 
                        onChange={(index) => setSelectedEraIndex(index)}
                    />
                </div>

                {/* Dynamic Content Display based on selection */}
		<span className='inline-flex w-full items-center'>
                <div className={`h-fit w-100 p-2 mb-10 md:p-8 ${theme.colors.bgCard} ${theme.cards.base} ${theme.colors.borderSubtle} ${theme.cards.hoverPrimary}`}>
                    <h3 className={`text-xl font-bold ${theme.colors.accentPrimary} mb-2`}>
                        {eras[selectedEraIndex]}
                    </h3>
                    <p className={`${theme.colors.textSecondary}`}>
		    {`${currentData.description}`}
                    </p>
                </div>
		<Carousel3D 
			key={selectedEraIndex} 
                        items={currentData.slides} 
                        height="340px"
		/>
		</span>

              </div>
            </div>
        </section>

        {/* --- SLIDE 3: PERFORMANCE FIRST --- */}
        <section 
            className={slideClass}
            data-index="3"
            ref={el => {sectionRefs.current[3] = el}}
        >
            <div className="container mx-auto px-6 max-w-6xl">
              <div className={`
                 backdrop-blur-md 
                 w-full p-8 md:p-12 
		 ${theme.colors.bgCard} ${theme.cards.base} ${theme.colors.borderSubtle} 
                 ${theme.cards.hoverPrimary}
              `}>
	      <span className="inline-flex items-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${theme.badges.iconContainerPrimary}`}>
                  <Scroll className="w-6 h-6" />
                </div>
                <h2 className={`text-3xl ml-4 font-bold ${theme.colors.textPrimary} mb-4`}>Ancient Egyptian Religion</h2>
	      </span>
                <p className={`${theme.colors.textSecondary} text-lg leading-relaxed`}>
		  Knowing about ancient Egyptian religion is key to understanding the complex dynamics that fuelled their culture, art & architecture, it is the first step to really understand the social dynamics at play in ancient Egypt.
                </p>
              </div>
            </div>
        </section>

        {/* --- SPACERS --- */}
        <section className={`${slideClass} h-[50vh]`} data-index="4" ref={el => {sectionRefs.current[4] = el}}>
           <p className={`${theme.colors.textMuted} text-sm`}>End of immersive scroll content</p>
        </section>

      </div>
    </div>
  );
};

export default ParallaxView;
