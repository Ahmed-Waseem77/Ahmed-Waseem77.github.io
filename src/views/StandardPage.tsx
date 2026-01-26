import React from 'react';
import { useTheme } from '../ThemeContext';

const BIBLIOGRAPHY = [
  {
    text: "3D warehouse. (n.d.). 3D Warehouse. Djoser Pyramid Complex.",
    url: "https://3dwarehouse.sketchup.com/model/6d43bb00fb44eabf3686bf90918d7fc8/Djoser-pyramid-complex?hl=en"
  },
  {
    text: "3D warehouse. (n.d.). 3D Warehouse. Giza Plateau.",
    url: "https://3dwarehouse.sketchup.com/model/a0f1c6fd82310f023686bf90918d7fc8/Giza-Plateau?hl=en"
  },
  {
    text: "Reddit. (n.d.). Relief from the 2nd Century AD showing Anubis.",
    url: "https://www.reddit.com/r/ancientegypt/comments/1jiowom/relief_from_the_2nd_century_ad_showing_anubis_as/"
  },
  {
    text: "Abydos, Egypt. (2026, January 17). Wikipedia, the free encyclopedia.",
    url: "https://en.wikipedia.org/wiki/Abydos,_Egypt"
  },
  {
    text: "Alexandria - Ancient city, Mediterranean Port, cosmopolitan hub. (2025, October 1). Encyclopedia Britannica.",
    url: "https://www.britannica.com/place/Alexandria-Egypt/History"
  },
  {
    text: "Baines, J. (2009). Atlas of ancient Egypt.",
    url: ""
  },
  {
    text: "Bibliotheca Alexandrina. (n.d.). ice.org.uk.",
    url: "https://www.ice.org.uk/what-is-civil-engineering/infrastructure-projects/bibliotheca-alexandrina"
  },
  {
    text: "Egyptian gods family tree: Discover Ancient Egyptian gods and goddesses. (2024, August 9). History Cooperative.",
    url: "https://historycooperative.org/egyptian-gods-family-tree/"
  },
  {
    text: "The fall of ancient Egypt. (n.d.). ANCIENT EGYPT ONLINE.",
    url: "https://www.ancient-egypt-online.com/fall-of-ancient-egypt.html"
  },
  {
    text: "Franck Goddio: Iseum. (n.d.).",
    url: "https://www.franckgoddio.org/fileadmin/pics/3_5_finds/documents/Franck_Goddio_Iseum.pdf"
  },
  {
    text: "History of Persian Egypt. (2025, August 30). Wikipedia, the free encyclopedia.",
    url: "https://en.wikipedia.org/wiki/History_of_Persian_Egypt"
  },
  {
    text: "Middle Kingdom of Egypt. (2026, January 24). Wikipedia, the free encyclopedia.",
    url: "https://en.wikipedia.org/wiki/Middle_Kingdom_of_Egypt"
  },
  {
    text: "Old Kingdom of Egypt. (2026, January 15). Wikipedia, the free encyclopedia.",
    url: "https://en.wikipedia.org/wiki/Old_Kingdom_of_Egypt"
  },
  {
    text: "Pyramid of Djoser. (2025, August 19). Wikipedia, the free encyclopedia.",
    url: "https://en.wikipedia.org/wiki/Pyramid_of_Djoser"
  },
  {
    text: "Pyramidion. (2025, November 7). Wikipedia, the free encyclopedia.",
    url: "https://en.wikipedia.org/wiki/Pyramidion"
  },
  {
    text: "Sobek. (2026, January 8). Wikipedia, the free encyclopedia.",
    url: "https://en.wikipedia.org/wiki/Sobek"
  },
  {
    text: "Stater depicting Ptolemy I. (n.d.). Bibliotheca Alexandrina Antiquities Museum.",
    url: "https://antiquities.bibalex.org/Collection/Detail.aspx?lang=en&a=1037"
  }
];

const StandardPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`w-full h-screen ${theme.colors.bgMain} overflow-y-auto pt-20 pb-20`}>
      <div className="container mx-auto px-6 max-w-2xl">
        
        {/* Main Content */}
        <h1 className={`text-4xl font-bold ${theme.colors.textPrimary} mb-6`}>About Page</h1>
        <div className="prose prose-invert prose-lg">
          <p className={theme.colors.textSecondary}>
            This open source project intentionally employs a multimodal format by combining written
            interpretation, visual material, spatial organization, and chronological
            navigation. Images are used not merely for illustration but as primary evidence,
            supported by concise analytical text explaining form, symbolism, and function.
            The website structure allows non-linear navigation, enabling users to explore
            sites independently, similar to a real visit, while still maintaining historical and
            thematic coherence.
          </p>
          
          <hr className={`${theme.colors.borderSubtle} my-8`} />
          
          <div className={`mt-8 p-4 ${theme.colors.bgStandard} rounded-lg border ${theme.colors.borderSubtle}`}>
            <h3 className={`${theme.colors.textPrimary} font-medium mb-2`}>Limitations & Challenges</h3>
            <p className={`text-sm ${theme.colors.textSecondary}`}>
              A primary limitation of this project is that a digital platform cannot fully
              replicate the scale, atmosphere, and spatial experience of monumental
              architecture. Additionally, interpretations rely on existing archaeological and
              scholarly sources, which may reflect ongoing academic debates or incomplete
              evidence. These challenges were addressed by consulting multiple authoritative
              sources and focusing on widely supported interpretations rather than definitive
              or speculative claims.
            </p>
          </div>
        </div>

        {/* Bibliography Section */}
        <div className="mt-16">
          <h2 className={`text-2xl font-bold ${theme.colors.textPrimary} mb-6`}>Bibliography</h2>
          <div className="space-y-4">
            {BIBLIOGRAPHY.map((source, index) => (
              <div 
                key={index} 
                className={`text-sm pl-4 border-l-2 ${theme.colors.borderSubtle} ${theme.colors.textSecondary}`}
              >
                <p className="inline">
                  {source.text}
                </p>
                {source.url && (
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`block mt-1 hover:underline break-words ${theme.colors.accentPrimary || 'text-blue-400'}`}
                  >
                    {source.url}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default StandardPage;
