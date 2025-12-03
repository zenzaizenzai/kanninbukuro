import React from 'react';
import { COLORS } from '../constants';

interface BagSVGProps {
  isExploding: boolean;
}

/**
 * A drawn "Kanninbukuro" (Patience Bag).
 * It switches to a jagged "burst" shape when exploding.
 */
export const BagSVG: React.FC<BagSVGProps> = ({ isExploding }) => {
  return (
    <svg
      viewBox="0 0 200 400"
      className={`bag-svg ${isExploding ? 'animate-explode' : ''}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {!isExploding ? (
        // --- NORMAL STATE ---
        <>
          <path
            d="M 60 20 
               Q 40 100 50 200 
               Q 10 250 10 320 
               Q 10 390 100 390 
               Q 190 390 190 320 
               Q 190 250 150 200 
               Q 160 100 140 20 
               Q 100 10 60 20"
            fill={COLORS.bag}
            stroke={COLORS.bagOutline}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Texture / Wrinkles */}
          <path
            d="M 60 250 Q 80 260 100 250"
            fill="none"
            stroke={COLORS.bagOutline}
            strokeWidth="2"
            opacity="0.5"
          />
          <path
            d="M 120 300 Q 140 310 160 300"
            fill="none"
            stroke={COLORS.bagOutline}
            strokeWidth="2"
            opacity="0.5"
          />
          {/* Kanji Label */}
          <text
            x="100"
            y="320"
            textAnchor="middle"
            fill="#b91c1c"
            fontSize="32"
            fontWeight="bold"
            fontFamily="Zen Maru Gothic, sans-serif"
            style={{ letterSpacing: '0.2em' }}
          >
            堪忍袋
          </text>
        </>
      ) : (
        // --- EXPLODED STATE ---
        <g transform="translate(10, 10)">
           {/* Jagged Burst Shape */}
           <path
            d="M 60 20 
               L 40 60 L 10 50 
               L 30 100 L 5 150 
               L 35 180 L 10 250 
               L 50 240 L 40 300 
               L 80 280 L 100 350 
               L 120 280 L 160 300 
               L 150 240 L 190 250 
               L 165 180 L 195 150 
               L 170 100 L 190 50 
               L 160 60 L 140 20 
               L 100 40 Z"
            fill="#ef4444" 
            stroke="#991b1b"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Debris / Shock lines */}
          <path d="M 0 100 L -20 80" stroke="#7f1d1d" strokeWidth="3" />
          <path d="M 200 100 L 220 80" stroke="#7f1d1d" strokeWidth="3" />
          <path d="M 100 360 L 100 390" stroke="#7f1d1d" strokeWidth="3" />
          <path d="M 20 0 L 0 -20" stroke="#7f1d1d" strokeWidth="3" />
          
          {/* "Boom" Text effect inside the burst */}
           <text
            x="100"
            y="200"
            textAnchor="middle"
            fill="#fff"
            fontSize="48"
            fontWeight="black"
            fontFamily="sans-serif"
            className="animate-pulse"
          >
            BOOM!
          </text>
        </g>
      )}
    </svg>
  );
};