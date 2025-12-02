import React from 'react';
import { CordState } from '../types';
import { COLORS } from '../constants';

interface CordProps {
  cord: CordState;
  onClick: (id: number) => void;
}

export const Cord: React.FC<CordProps> = ({ cord, onClick }) => {
  // Calculated style for position on the neck of the bag
  // The neck is roughly between 10% and 40% of the SVG height physically,
  // but we are positioning absolute on a container overlay.
  const style: React.CSSProperties = {
    top: `${cord.positionY}%`,
    left: '25%', // Centered on the neck
    width: '50%',
    position: 'absolute',
    cursor: cord.isBroken ? 'default' : 'pointer',
    zIndex: 20,
  };

  return (
    <div style={style} className="flex justify-center items-center h-12">
      {/* Hitbox area expanded for easier tapping */}
      <div 
        className="w-full h-full absolute top-0 left-0"
        onClick={() => !cord.isBroken && onClick(cord.id)}
      />

      {/* The Visual Cord */}
      {!cord.isBroken ? (
        // Intact Cord
        <div 
          className="w-full h-3 rounded-full shadow-md transition-transform active:scale-95"
          style={{ backgroundColor: COLORS.cordIntact }}
        />
      ) : (
        // Broken Cord
        <div className="w-full flex justify-between items-center opacity-80">
          <div 
            className="h-3 rounded-l-full w-[45%]" 
            style={{ backgroundColor: COLORS.cordBroken, transform: 'rotate(-5deg)' }} 
          />
          <div 
            className="h-3 rounded-r-full w-[45%]" 
            style={{ backgroundColor: COLORS.cordBroken, transform: 'rotate(5deg)' }} 
          />
        </div>
      )}

      {/* Venting Word Popup */}
      {cord.isBroken && cord.word && (
        <div 
          className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none animate-pop-in z-30"
        >
          <span className="bg-white/90 border-2 border-gray-800 text-gray-900 px-3 py-1 rounded-xl text-lg font-black shadow-lg">
            {cord.word}
          </span>
        </div>
      )}
    </div>
  );
};
