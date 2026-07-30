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
    setCurrentLineIndex(0);
  }, [currentStageId]);

  useEffect(() => {
    if (isDialogueActive && containerRef.current) {
      anime({
        targets: containerRef.current,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 700,
        easing: 'easeOutExpo',
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
    }
  };

  const isLast = currentLineIndex >= stage.dialogue.length - 1;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        bottom: '36px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '82%',
        maxWidth: '860px',
        background: 'linear-gradient(135deg, rgba(8,16,32,0.95) 0%, rgba(12,24,48,0.95) 100%)',
        border: '1px solid rgba(30,120,220,0.3)',
        borderRadius: '12px',
        padding: '28px 32px',
        color: '#e8f0ff',
        fontFamily: '"Segoe UI", system-ui, sans-serif',
        boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(30,120,220,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
        zIndex: 1000,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Speaker badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, #1a6aaa, #0a3a6a)',
          border: '2px solid rgba(100,200,255,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px',
        }}>👩‍🔬</div>
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64c8ff', letterSpacing: '0.04em' }}>
            DR. AMARA NWOSU
          </div>
          <div style={{ fontSize: '0.68rem', color: '#6090c0', letterSpacing: '0.08em', marginTop: 1 }}>
            SENIOR DATA SCIENTIST · REDROCK FIELD LAB
          </div>
        </div>
        {/* Line indicator */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {stage.dialogue.map((_, i) => (
            <div key={i} style={{
              width: i === currentLineIndex ? 20 : 6,
              height: 4, borderRadius: 2,
              background: i === currentLineIndex ? '#64c8ff' : 'rgba(100,200,255,0.25)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      </div>

      {/* Dialogue text */}
      <p style={{
        fontSize: '1.05rem',
        lineHeight: '1.7',
        minHeight: '54px',
        color: '#d8eaff',
        margin: '0 0 20px 0',
        letterSpacing: '0.01em',
      }}>
        "{stage.dialogue[currentLineIndex]}"
      </p>

      {/* Action button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleNext}
          style={{
            background: isLast
              ? 'linear-gradient(135deg, #1a6aaa, #0d4a88)'
              : 'linear-gradient(135deg, rgba(30,80,160,0.6), rgba(20,60,120,0.6))',
            color: '#e0f0ff',
            border: '1px solid rgba(100,180,255,0.4)',
            padding: '10px 28px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.88rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(100,200,255,0.8)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(100,180,255,0.4)')}
        >
          {isLast ? '→ Head to the Lab' : 'Continue'}
        </button>
      </div>
    </div>
  );
};
