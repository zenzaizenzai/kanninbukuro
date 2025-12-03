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
    <div style={style} className="cord-wrapper">
      {/* Hitbox area expanded for easier tapping */}
      <div 
        className="cord-hitbox"
        onClick={() => !cord.isBroken && onClick(cord.id)}
      />

      {/* The Visual Cord */}
      {!cord.isBroken ? (
        // Intact Cord
        <div 
          className="cord-intact"
          style={{ backgroundColor: COLORS.cordIntact }}
        />
      ) : (
        // Broken Cord
        <div className="cord-broken-container">
          <div 
            className="cord-half cord-half-left" 
            style={{ backgroundColor: COLORS.cordBroken }} 
          />
          <div 
            className="cord-half cord-half-right" 
            style={{ backgroundColor: COLORS.cordBroken }} 
          />
        </div>
      )}

      {/* Venting Word Popup */}
      {cord.isBroken && cord.word && (
        <div 
          className="word-popup animate-pop-in"
        >
          <span className="word-bubble">
            {cord.word}
          </span>
        </div>
      )}
    </div>
  );
};