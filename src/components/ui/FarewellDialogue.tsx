import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import anime from 'animejs';

const FAREWELL_LINES = [
  "Outstanding work today! You've handled every challenge the team threw at you.",
  "The junior researcher now understands why pandas is the right tool — and how to use it properly.",
  "You navigated data inspection, type conversions, and vectorised operations. That's a full data cleaning pipeline right there.",
  "Before you head off — safe travels. The next field assignment will be even more demanding.",
  "Take care. And remember: always check your dtypes before you analyse. 👋",
];

export const FarewellDialogue: React.FC = () => {
  const { sequence, setSequence, score } = useGameStore();
  const isDialogueActive = useGameStore(s => s.isDialogueActive);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineIndex, setLineIndex] = useState(0);

  const isActive = sequence === 'FAREWELL' && isDialogueActive;

  useEffect(() => {
    if (sequence === 'FAREWELL') setLineIndex(0);
  }, [sequence]);

  useEffect(() => {
    if (isActive && containerRef.current) {
      anime({
        targets: containerRef.current,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 700,
        easing: 'easeOutExpo',
      });
    }
  }, [isActive]);

  if (!isActive) return null;

  const handleNext = () => {
    if (lineIndex < FAREWELL_LINES.length - 1) {
      setLineIndex(l => l + 1);
    } else {
      setSequence('COMPLETED');
    }
  };

  const isLast = lineIndex >= FAREWELL_LINES.length - 1;

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
        background: 'linear-gradient(135deg, rgba(8,16,32,0.93) 0%, rgba(12,24,48,0.93) 100%)',
        border: '1px solid rgba(30,120,220,0.3)',
        borderRadius: '12px',
        padding: '28px 32px',
        color: '#e8f0ff',
        fontFamily: '"Segoe UI", system-ui, sans-serif',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
        zIndex: 1000,
        backdropFilter: 'blur(14px)',
      }}
    >
      {/* Speaker */}
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
            FAREWELL · REDROCK FIELD LAB
          </div>
        </div>
        {/* Score */}
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: '0.68rem', color: '#4080a0', letterSpacing: '0.1em' }}>FINAL SCORE</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#64c8ff' }}>{score}</div>
        </div>
      </div>

      {/* Line progress dots */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {FAREWELL_LINES.map((_, i) => (
          <div key={i} style={{
            width: i === lineIndex ? 20 : 6,
            height: 4, borderRadius: 2,
            background: i === lineIndex ? '#64c8ff' : 'rgba(100,200,255,0.25)',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      {/* Dialogue */}
      <p style={{
        fontSize: '1.05rem', lineHeight: '1.7',
        minHeight: '54px', color: '#d8eaff',
        margin: '0 0 20px 0', letterSpacing: '0.01em',
      }}>
        "{FAREWELL_LINES[lineIndex]}"
      </p>

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
          }}
        >
          {isLast ? '✓ Safe Travels!' : 'Continue'}
        </button>
      </div>
    </div>
  );
};
