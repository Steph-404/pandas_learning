import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { STORYLINE } from '../../data/storyline';
import anime from 'animejs';

export const DialogueBox: React.FC = () => {
  const { currentStageId, isDialogueActive, setDialogueActive, setSequence } = useGameStore();
  const stage = STORYLINE.find(s => s.id === currentStageId);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentLineIndex, setCurrentLineIndex] = React.useState(0);

  useEffect(() => {
    if (isDialogueActive && containerRef.current) {
      anime({
        targets: containerRef.current,
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo'
      });
    }
  }, [isDialogueActive, currentStageId]);

  if (!stage || !isDialogueActive) return null;

  const handleNext = () => {
    if (currentLineIndex < stage.dialogue.length - 1) {
      setCurrentLineIndex(prev => prev + 1);
    } else {
      setDialogueActive(false);
      setSequence('TRANSITION_LAB');
      setCurrentLineIndex(0);
    }
  };

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        maxWidth: '800px',
        backgroundColor: 'rgba(20, 20, 30, 0.9)',
        border: '1px solid rgba(100, 200, 255, 0.3)',
        borderRadius: '8px',
        padding: '24px',
        color: '#fff',
        fontFamily: 'sans-serif',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        zIndex: 1000
      }}
    >
      <h3 style={{ margin: '0 0 12px 0', color: '#64c8ff', fontSize: '1.2rem' }}>{stage.title}</h3>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.5', minHeight: '60px' }}>
        {stage.dialogue[currentLineIndex]}
      </p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
        <button 
          onClick={handleNext}
          style={{
            background: '#64c8ff',
            color: '#000',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          {currentLineIndex < stage.dialogue.length - 1 ? 'Next' : 'Continue'}
        </button>
      </div>
    </div>
  );
};
