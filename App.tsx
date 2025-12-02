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
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#fdf6e3]">
      
      {/* 1. START SCREEN */}
      {phase === GamePhase.START && (
        <div className="z-50 flex flex-col items-center space-y-8 p-6 bg-white/90 rounded-2xl shadow-xl backdrop-blur-sm max-w-sm w-full mx-4 border-4 border-[#d4c5b0]">
          <h1 className="text-3xl font-black text-[#431407] tracking-widest text-center">
            堪忍袋の緒
          </h1>
          <p className="text-gray-600 text-center">
            イライラが溜まっていませんか？<br/>
            緒（ひも）の本数を選んでください。
          </p>
          <div className="grid grid-cols-3 gap-4 w-full">
            {DIFFICULTY_OPTIONS.map(num => (
              <button
                key={num}
                onClick={() => startGame(num)}
                className="py-4 text-xl font-bold rounded-lg bg-[#b91c1c] text-white shadow-lg hover:bg-red-800 hover:scale-105 transition-all active:scale-95"
              >
                {num}本
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. MAIN GAME AREA */}
      {(phase === GamePhase.PLAYING || phase === GamePhase.MERCY_CHECK || phase === GamePhase.EXPLOSION) && (
        <div className="relative w-full max-w-md h-[80vh] flex flex-col items-center justify-center">
          
          {/* The Bag Container */}
          <div className="relative w-full h-full max-h-[600px] p-4 flex items-center justify-center">
            <BagSVG isExploding={phase === GamePhase.EXPLOSION} />

            {/* Play Again Button Overlay (appears after explosion) */}
            {phase === GamePhase.EXPLOSION && (
              <div className="absolute inset-0 flex items-center justify-center z-50 animate-fade-in-delay pointer-events-none">
                 <div className="pointer-events-auto">
                   <button
                      onClick={() => setPhase(GamePhase.START)}
                      className="px-10 py-4 bg-white text-red-600 text-xl font-bold rounded-full shadow-2xl border-4 border-red-600 hover:bg-red-50 hover:scale-105 transition-transform"
                   >
                     もう一度やる
                   </button>
                 </div>
              </div>
            )}

            {/* Cords Layer - Only render if not exploded */}
            {phase !== GamePhase.EXPLOSION && (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="relative w-full h-full pointer-events-auto">
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
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-xs w-full shadow-2xl text-center space-y-6 animate-pop-in">
            <h3 className="text-2xl font-bold text-red-600">最後の1本です…</h3>
            <p className="text-gray-700 font-medium text-lg">
              チャンスをあげる？
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleMercyResponse(true)}
                className="w-full py-3 bg-green-500 text-white font-bold rounded-lg shadow hover:bg-green-600 active:scale-95 transition-transform"
              >
                も一回初めから (A)
              </button>
              <button
                onClick={() => handleMercyResponse(false)}
                className="w-full py-3 bg-gray-800 text-white font-bold rounded-lg shadow hover:bg-gray-900 active:scale-95 transition-transform"
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