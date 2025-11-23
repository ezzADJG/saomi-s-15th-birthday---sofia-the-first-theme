import React from 'react';
import { PageData } from '../types';
import { PageContent } from './PageContent';
import { MagicParticles } from './Visuals';

interface BookProps {
  pages: PageData[];
  currentPage: number;
  onPageClick: (index: number) => void; // Manual override if needed
}

export const Book: React.FC<BookProps> = ({ pages, currentPage, onPageClick }) => {
  // We need to reverse the mapping for the Z-index stack to work correctly for pages underneath
  // However, for the 3D flip to work, we render all pages absolutely positioned on top of each other.
  
  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-2000">
      {/* The Book Container */}
      <div className="relative w-[90%] max-w-[400px] aspect-[9/16] transform-style-preserve-3d">
        
        {/* Background Shadow for the whole book */}
        <div className="absolute inset-0 bg-black/20 rounded-lg blur-xl translate-y-8 scale-95 -z-10"></div>

        {pages.map((page, index) => {
          // Determine state of this specific page
          const isFlipped = index < currentPage;
          // Z-Index logic:
          // If NOT flipped: Higher index = lower z-index (Stack order: 0, 1, 2...)
          // If FLIPPED: Lower index = higher z-index (Stack order: ...2, 1, 0 on the left stack)
          // Since we are doing a single stack flip (Right to Left, or Face Up to Face Down),
          // let's assume a standard "Open Pile" logic.
          // Current Page (if not flipped) should be on top.
          
          let zIndex = 0;
          if (isFlipped) {
             zIndex = index; // 0 is bottom of left stack, 1 is above it...
          } else {
             zIndex = pages.length - index; // 0 is top of right stack...
          }

          // Rotation
          const rotation = isFlipped ? 'rotate-y-180' : 'rotate-y-0';

          return (
            <div
              key={page.id}
              className={`absolute inset-0 w-full h-full transition-transform duration-[1500ms] ease-in-out transform-style-preserve-3d origin-left ${rotation}`}
              style={{ zIndex }}
              onClick={() => onPageClick(index)}
            >
              {/* Front of the Page (Visible when NOT flipped) */}
              <div className="absolute inset-0 w-full h-full backface-hidden rounded-r-lg overflow-hidden bg-white shadow-md border-l border-gray-200">
                 {/* Only render content animations if this is the current top page */}
                 <div className="w-full h-full relative">
                    {index === currentPage && <MagicParticles />}
                    <PageContent type={page.type} isActive={index === currentPage} />
                 </div>
                 
                 {/* Book Fold Gradient */}
                 <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-20"></div>
              </div>

              {/* Back of the Page (Visible when FLIPPED) */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-l-lg overflow-hidden bg-purple-100 shadow-md border-r border-gray-200">
                 {/* The back of a page is usually blank or just a texture in this "Single Stack" flip mode, 
                     UNLESS we treat the back of Page 1 as the Left side of Spread 2.
                     However, to simplify for 9:16 video, we are doing a "Stack" flip. 
                     So the back of the page is just the back of the paper. 
                 */}
                 <div className="w-full h-full bg-[#FFF8E7] flex items-center justify-center opacity-50">
                    <div className="bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] w-full h-full absolute inset-0"></div>
                    {/* Optional: Cute pattern on back of pages */}
                    <div className="opacity-10 text-4xl">⚜️</div>
                 </div>
                 <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-20"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
