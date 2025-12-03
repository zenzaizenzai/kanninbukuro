import React, { useState, useEffect, useRef } from 'react';
import { GamePhase, CordState } from './types';
import { VENTING_WORDS, DIFFICULTY_OPTIONS, SOUND_SNAP_URL, SOUND_EXPLOSION_URL } from './constants';
import { BagSVG } from './components/BagSVG';
import { Cord } from './components/Cord';

const App: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.START);
  const [cords, setCords] = useState<CordState[]>([]);
  const [clickedCordId, setClickedCordId] = useState<number | null>(null);

  // Audio references
  const snapAudioRef = useRef<HTMLAudioElement | null>(null);
  const explosionAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    if (SOUND_SNAP_URL) snapAudioRef.current = new Audio(SOUND_SNAP_URL);
    if (SOUND_EXPLOSION_URL) explosionAudioRef.current = new Audio(SOUND_EXPLOSION_URL);
  }, []);

  const playSound = (type: 'snap' | 'explosion') => {
    // Simple placeholder sound generator if no file is provided
    if (type === 'snap') {
       if (snapAudioRef.current) {
         snapAudioRef.current.currentTime = 0;
         snapAudioRef.current.play().catch(() => {});
       }
    } else {
      if (explosionAudioRef.current) {
        explosionAudioRef.current.play().catch(() => {});
      }
    }
  };

  // --- Game Logic ---

  const startGame = (count: number) => {
    const newCords: CordState[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      isBroken: false,
      // Distribute cords along the neck (approx 15% to 45% of container height)
      positionY: 15 + (30 / (count - 1)) * i, 
    }));
    setCords(newCords);
    setPhase(GamePhase.PLAYING);
  };

  const handleCordClick = (id: number) => {
    const remainingCords = cords.filter(c => !c.isBroken).length;

    // Check if this is the VERY LAST cord
    if (remainingCords === 1) {
      setClickedCordId(id);
      setPhase(GamePhase.MERCY_CHECK);
      return;
    }

    // Normal Snap
    snapCord(id);
  };

  const snapCord = (id: number) => {
    playSound('snap');
    
    // Pick a random word
    const randomWord = VENTING_WORDS[Math.floor(Math.random() * VENTING_WORDS.length)];

    setCords(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, isBroken: true, word: randomWord };
      }
      return c;
    }));

    // Check if game over (only needed if we skipped mercy check logic, but logic handles it)
    const activeAfterSnap = cords.filter(c => !c.isBroken && c.id !== id).length;
    if (activeAfterSnap === 0) {
      triggerExplosion();
    }
  };

  const triggerExplosion = () => {
    setPhase(GamePhase.EXPLOSION);
    playSound('explosion');
    if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
  };

  const handleMercyResponse = (giveChance: boolean) => {
    if (giveChance) {
      // Reset Game completely
      setPhase(GamePhase.START);
    } else {
      // Break the last one!
      if (clickedCordId !== null) {
        // We temporarily go back to playing to show the snap, then explode immediately
        setPhase(GamePhase.PLAYING);
        snapCord(clickedCordId);
        setTimeout(() => {
          triggerExplosion();
        }, 600);
      }
    }
    setClickedCordId(null);
  };

  // --- Render Helpers ---

  return (
    <div className="app-container">
      
      {/* 1. START SCREEN */}
      {phase === GamePhase.START && (
        <div className="start-card">
          <h1 className="start-title">
            堪忍袋の緒
          </h1>
          <p className="start-description">
            イライラが溜まっていませんか？<br/>
            緒（ひも）の本数を選んでください。
          </p>
          <div className="difficulty-grid">
            {DIFFICULTY_OPTIONS.map(num => (
              <button
                key={num}
                onClick={() => startGame(num)}
                className="btn-difficulty"
              >
                {num}本
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. MAIN GAME AREA */}
      {(phase === GamePhase.PLAYING || phase === GamePhase.MERCY_CHECK || phase === GamePhase.EXPLOSION) && (
        <div className="game-wrapper">
          
          {/* The Bag Container */}
          <div className="bag-container">
            <BagSVG isExploding={phase === GamePhase.EXPLOSION} />

            {/* Play Again Button Overlay (appears after explosion) */}
            {phase === GamePhase.EXPLOSION && (
              <div className="play-again-overlay animate-fade-in-delay">
                 <div className="pointer-events-auto">
                   <button
                      onClick={() => setPhase(GamePhase.START)}
                      className="btn-play-again"
                   >
                     もう一度やる
                   </button>
                 </div>
              </div>
            )}

            {/* Cords Layer - Only render if not exploded */}
            {phase !== GamePhase.EXPLOSION && (
              <div className="cords-layer">
                <div className="cords-inner">
                   {cords.map(cord => (
                     <Cord key={cord.id} cord={cord} onClick={handleCordClick} />
                   ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. MERCY MODAL */}
      {phase === GamePhase.MERCY_CHECK && (
        <div className="mercy-overlay animate-fade-in">
          <div className="mercy-card animate-pop-in">
            <h3 className="mercy-title">最後の1本です…</h3>
            <p className="mercy-text">
              チャンスをあげる？
            </p>
            <div className="mercy-buttons">
              <button
                onClick={() => handleMercyResponse(true)}
                className="btn-mercy-a"
              >
                も一回初めから (A)
              </button>
              <button
                onClick={() => handleMercyResponse(false)}
                className="btn-mercy-b"
              >
                無理！！！ (B)
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default App;