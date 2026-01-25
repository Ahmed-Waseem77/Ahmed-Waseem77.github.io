import ParallaxLayer from '../components/ParallaxLayer';
import BackgroundLayer2 from '../components/BackgroundLayer2';
import BackgroundLayer3 from '../components/BackgroundLayer3';
import DynamicBackground from '../components/DynamicBackground';
import TimelineMagnifier from '../components/TimelineMagnifier';
import ExpandableImage from '../components/ExpandableImage';
import Hover3DModel from '../components/Hover3DModel';
import Carousel3D from '../components/3DCarousel';
import FanAlArd from '../assets/FanAlArd';
import NuutStar from '../assets/NuutStar';
import Anubis from '../assets/BodyAnubis';
import AmunRa from '../assets/BodyAmunRa';
import Hathor from '../assets/BodyHathor';
import Sobek from '../assets/BodySobek';
import Nuut from '../assets/BodyNuut';
import Bastet from '../assets/BodyBastet';
import Horus from '../assets/BodyHorus';
import SVGCarousel from '../components/SVGCarousel'; 

import React, { useState, useEffect, useRef } from 'react';
import { Zap, Info, Scroll, ChevronDown, Hourglass, BadgeQuestionMark } from 'lucide-react';
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

const GODS_DATA = [
    { 
        name: "Nuut", 
        desc: "Nuut The Sky Goddess, often depicted as a 5 pointed starfish-like star, or a naked woman in the sky covering the earth.",
        component: <Nuut className="w-full h-full" />,
	extra:  <NuutStar className="w-full h-full mb-4 mx-4"
	/>,
	source: "Figures and Descriptions adapted from (Baines, 2009, p. 209-217)"
    },
    { 
        name: "Amun Ra", 
        desc: "The Sun God. Ra was considered the King of the Gods and the creator of everything. He traveled across the sky in his solar barque during the day and through the underworld at night.",
        component: <AmunRa className="w-full h-full" />,
	source: "Figures and Descriptions adapted from (Baines, 2009, p. 209-217)"
    },
    { 
        name: "Anubis", 
        desc: "God of Mummification and the Afterlife. Depicted with the head of a jackal, Anubis guided souls into the afterlife and oversaw the weighing of the heart ceremony.",
        component: <Anubis className="w-full h-full" />,
	source: "Figures and Descriptions adapted from (Baines, 2009, p. 209-217)"
    },
    { 
        name: "Horus", 
        desc: "God of Protection, can take many forms in art, but mostly is hawk headed. Sometimes with the double crown of Egypt. He is the earliest state god of Egypt",
        component: <Horus className="w-full h-full" />,
	source: "Figures and Descriptions adapted from (Baines, 2009, p. 209-217)"
    },
    { 
        name: "Sobek", 
        desc: "Deity Associate with the nile, military prowess, fertility and protection. Crocodile Headed, found in Faiyum, Esna and Kom Ombo",
        component: <Sobek className="w-full h-full" />, 
	source: "Figures and Descriptions adapted from (Baines, 2009, p. 209-217) and Wikipedia (Sobek, 2026)"
    },
    { 
        name: "Hathor", 
        desc: "God of Mothership & Women. She can have a sun disk with cow horns as depicted, and she can also be Cow headed. Found in Thebes, Memphis, Abu Simbel and Sinai at Serabit el-Khadim",
        component: <Hathor className="w-full h-full" />, 
	source: "Figures and Descriptions adapted from (Baines, 2009, p. 209-217)"
    },
    { 
        name: "Bastet", 
        desc: "A God of War, Lioness or cat-headed",
        component: <Bastet className="w-full h-full" />,
	source: "Figures and Descriptions adapted from (Baines, 2009, p. 209-217)"
    },
];

const ParallaxView: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const [activeGodIndex, setActiveGodIndex] = useState(0);

  const [selectedEraIndex, setSelectedEraIndex] = useState<number>(0);
  const eras = ["Old Kingdom 2700 BCE - 2200 BCE", "Middle Kingdom 2000 BCE - 1700 BCE", "New Kingdom 1500 BCE - 1000 BCE", "Persian 525 BCE - 404 BCE" ,"Greco-Roman (Ptolemaic) 235 BCE - 642 BCE" ];
  const currentData = ERA_DATA[selectedEraIndex] || ERA_DATA[0]; 

  // 1. Scroll State
  const [scrollTop, setScrollTop] = useState<number>(0);
  
  // 2. Active Slide State
  const [activeSlide, setActiveSlide] = useState<number>(0);
useEffect(() => {
    if (activeSlide === 3) {
      setTheme('tokyo-dark'); // Or 'tokyo-day' / 'gruvbox-light' based on preference
    }  
    if (activeSlide === 2 || activeSlide === 4) {
      setTheme('gruvbox-dark'); // Or 'tokyo-day' / 'gruvbox-light' based on preference
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
      {/* <DynamicBackground scrollTop={scrollTop}/> */}

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
		  style={{
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
                    students, tourists without access to professional tour guides, artists, and visitors who
                    participated in guided tours but found the pace or explanations overwhelming. It mainly focuses on the Art and Architecture, and the important historical context of the whys that drove their creation.
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
                <span className="mt-24 items-center inline-flex mb-2"> 
                    <Hourglass className={`w-14 h-14 ${theme.colors.accentPrimary}`} />
                    <h2 className={`ml-4 text-6xl font-bold ${theme.colors.textGradientSecondary}`}>Historical Timeline</h2>
                </span>

                {/* Description */}
                <p className={`${theme.colors.textSecondary} italic text-lg leading-relaxed mb-4`}>
                   Knowing about the Ruling Dynasties and Powers is important to understand art and culture. 
			  <br></br> Drag the artifact scanner to explore different eras of Ancient Egypt. 
                </p>

                {/* --- THE INTERACTIVE SLIDER --- */}
                <div className="px-4 mb-8">
                    <TimelineMagnifier 
                        eras={eras} 
                        onChange={(index) => setSelectedEraIndex(index)}
                    />
                </div>

                {/* Dynamic Content Display based on selection */}
		<span className='inline-flex w-full items-center'>
                <div className={`h-fit w-200 p-2 mb-10 md:p-8 ${theme.colors.bgCard} ${theme.cards.base} ${theme.colors.borderSubtle} ${theme.cards.hoverPrimary}`}>
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
            <div className="container mx-auto px-6 max-w-6xl mb-8">
              <div className={`
                 backdrop-blur-md 
                 w-full p-4 md:p-8
		 ${theme.colors.bgCard} ${theme.cards.base} ${theme.colors.borderSubtle} 
                 ${theme.cards.hoverPrimary}
              `}>
	      <span className="inline-flex items-center">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-6 ${theme.badges.iconContainerPrimary}`}>
                  <Scroll className="w-6 h-6" />
                </div>
                <h2 className={`text-2xl ml-4 font-bold ${theme.colors.textPrimary} mb-4`}>Ancient Egyptian Religion</h2>
	      </span>
                <p className={`${theme.colors.textSecondary} text-s leading-relaxed`}>
		  Knowing about ancient Egyptian religion is key to understanding the complex dynamics that fuelled their culture, art & architecture, it is the first step to really understand the social dynamics at play in ancient Egypt. <br></br>
		  Ancient Egyptian Religion underwent many changes from Old Kingdom to New Kingdom, but remained ultimately polytheistic. Ancient Egyptians worshipped many gods which you will find many depictions of in the art & architecture of ancient Egypt. Below are symbols and depictions of ubiquitous Ancient Egyptian Gods that you may see. <br></br> 
                </p>
              </div>
            </div>
	    <span className="inline-flex w-full">
	    {/*inline carousel here*/}
	    <div className="container mx-auto px-6 max-w-6xl w-full flex flex-col md:flex-row gap-6 items-center">
            
            {/* Left: The SVG Carousel */}
            <div className="w-full md:w-1/2">
                <SVGCarousel 
                    items={GODS_DATA.map(g => g.component)}
                    onIndexChange={setActiveGodIndex}
                    height="320px"
		    svgScale={3}
		    svgColor={theme.hex.accentSecondary}
		    cardBackgroundClass="bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-black/40 to-black/90"
                />
            </div>

            {/* Right: The Interactive Description */}
            <div className={`
                w-full md:w-1/2 p-8 rounded-xl
                flex flex-col justify-start min-h-[250px]
                transition-all duration-500
                backdrop-blur-md border
                ${theme.colors.bgCard} ${theme.colors.borderSubtle}
            `}>
                <div className="flex items-center gap-3 mb-4">
                    <Info className={`${theme.colors.accentSecondary} w-6 h-6`} />
                    <h3 className={`text-3xl font-bold ${theme.colors.accentSecondary}`}>
                        {GODS_DATA[activeGodIndex].name}
                    </h3>
                </div>
		<span className='inline-flex items-start'>
                <p className={`${theme.colors.textSecondary} text-lg leading-relaxed`}>
                    {GODS_DATA[activeGodIndex].desc}
                </p>
		<div className={`w-full h-full ${theme.colors.accentSecondary}`}>
		   {GODS_DATA[activeGodIndex].extra || undefined}
		</div>
		</span>
                <p className={`${theme.colors.textMuted} text-sm`}>
		    {`${GODS_DATA[activeGodIndex].source}`}
                </p>
            </div>
	    </div>
	    </span>
        </section>

<section className={`${slideClass} h-[50vh]`} data-index="4" ref={el => { sectionRefs.current[4] = el }}>
  <FadingGrid />
  <div className="container px-6 max-w-6xl mb-8">
    <h2 className={`ml-4 mt-18 pb-2 text-6xl font-bold ${theme.colors.textGradient}`}>Old Kingdom Architecture</h2>
    <h3 className={`ml-4 pb-2 text-4xl font-bold ${theme.colors.textPrimary}`}>Early Pyramids</h3>

    {/* CHANGE 1: Switched to 'div' and removed 'inline-' for better block layout behavior */}
    <div className={`flex w-full items-start mt-6`}>
      
      {/* CHANGE 2: Changed 'w-full' to 'flex-1'. This allows it to shrink to make room for the right column */}
      <div className={`flex flex-col flex-1 min-w-0 pr-6`}> 
        <span className={`inline-flex w-full`}>
          <Hover3DModel
            modelSrc={getAssetUrl('ZoserPyramid.stl')}
            imageSrc={getAssetUrl('Saqqara3DPreview.png')}
            width="w-full"
            height="h-[22em]"
            rotation={[-Math.PI / 2, 0, 0]} mt-4
          />
          <div className="container mx-auto max-w-6xl ml-4">
            <div className={`w-full p-8 md:p-6 mr-4 ${theme.colors.bgCard} ${theme.cards.base} ${theme.colors.borderSubtle} ${theme.cards.hoverPrimary}`}>
              <p className={`${theme.colors.textSecondary} text-md leading-relaxed`}>
              <text className={`text-2xl font-bold ${theme.colors.textPrimary}`}>Saqqara Complex </text>
	       houses the Saqqara Step Pyramid, Hep Sed court, a colonnaded entrance, a mortuary temple and multiple pavillions. The step pyramid is made by first building the Mastaba and adding inclined layered limestone brick. Some Early Pyramids around the complex are False pyramids (Like Pyramid of Titi on the right) which shows a was-on-going development of constructing true pyramids. <br></br>
	      The Saqqara step pyramid was the first pyramid to be built in ancient Egypt, made for and by King Djoser (Zoser) of the 3rd Dynasty
	      <p className={`${theme.colors.textMuted} text-xs italic`}>
 ("Pyramid of Djoser," 2025)
      </p>
              </p>
            </div>
          </div>
        </span>
        <p className={`text-xs italic mt-2 ${theme.colors.textMuted}`}>Saqqarra Pyramid Complex 3D Model, By L.VII.C on 3D Warehouse</p>

        <div className="container mx-auto max-w-6xl mt-4">
          <div className={`w-full p-8 md:p-6 mr-4 ${theme.colors.bgCard} ${theme.cards.base} ${theme.colors.borderSubtle} ${theme.cards.hoverPrimary}`}>
            <span className="inline-flex items-center mb-6">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${theme.badges.iconContainerSecondary}`}>
                <BadgeQuestionMark className="w-6 h-6" />
              </div>
              <h2 className={`text-2xl font-bold ${theme.colors.accentSecondary} ml-4`}>Why were Pyramids so Ubiquitous in Ancient Times?</h2>
            </span>
            <p className={`${theme.colors.textSecondary} text-md leading-relaxed`}>
	    	Ancient Native Americans built Pyramid like structures, like we see with the Aztecs and the Mayans. The question really provokes conspiracy theories but the answer might be rather simple. The Pyramid shape is really simple to construct in ancient time if you wanted to build a tall and grand structure <text className={`${theme.colors.textMuted} italic`}>(Dr John Swanson)</text>.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column (Scrollable Images) */}
      {/* Added 'shrink-0' to ensure this column never gets squished by the left column */}
      <div className="relative h-[530px] flex flex-col shrink-0">
      <div
        className="
          flex flex-col shrink-0
	  h-full
	  min-h-0
          overflow-y-auto           
          [&::-webkit-scrollbar]:hidden 
          [-ms-overflow-style:none] 
          [scrollbar-width:none]
        "
      >
        <ExpandableImage
          src={getAssetUrl('Saqqara.jpg')}
          alt="Ancient Artefact"
          className="w-60 h-60 mb-4 rounded-xl flex-shrink-0"
          caption="Saqqara Pyramid, Saqqara Complex (FanAlArd, 2026)"
        />
        <ExpandableImage
          src={getAssetUrl('SaqqaraEntrance.jpg')}
          alt="Saqqara Colonnade Entrance"
          className="w-60 h-60 mb-4 rounded-xl flex-shrink-0"
          caption="Saqqara Colonnade Entrance, Saqqara Complex (FanAlArd, 2026)"
        />
        <ExpandableImage
          src={getAssetUrl('SaqqaraComplexFacade.jpg')}
          alt="Ancient Artefact"
          className="w-60 h-60 mb-4 rounded-xl flex-shrink-0"
          caption="Saqqara Complex Entrance (FanAlArd, 2026)"
        />
        <ExpandableImage
          src={getAssetUrl('TitiPyramid.jpg')}
          alt="Ancient Artefact"
          className="w-60 h-60 mb-4 rounded-xl flex-shrink-0"
          caption="Titi Pyramid, Saqqara Complex (FanAlArd, 2026)"
        />
      </div>

    <div className="absolute bottom-0 left-0 w-full h-24 pointer-events-none flex items-end justify-center pb-4 rounded-b-xl z-20">
      <ChevronDown className="w-5 h-5 text-white" />
    </div>
    </div>

    </div>
  </div>
</section>
        <section className={`${slideClass} h-[50vh]`} data-index="5" ref={el => {sectionRefs.current[5] = el}}>
           <p className={`${theme.colors.textMuted} text-sm`}>End of immersive scroll content</p>
        </section>

      </div>
    </div>
  );
};

export default ParallaxView;
