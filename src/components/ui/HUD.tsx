import React from 'react';
import { useGameStore } from '../../store/gameStore';

export const HUD: React.FC = () => {
  const { score, currentStageId } = useGameStore();

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      right: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      color: '#fff',
      fontFamily: 'sans-serif',
      zIndex: 1000,
      pointerEvents: 'none'
    }}>
      <div style={{
        background: 'rgba(0,0,0,0.5)',
        padding: '10px 20px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <h3 style={{ margin: 0, fontSize: '1rem', color: '#aaa' }}>Stage</h3>
        <p style={{ margin: '4px 0 0 0', fontSize: '1.5rem', fontWeight: 'bold' }}>{currentStageId} / 3</p>
      </div>
      <div style={{
        background: 'rgba(0,0,0,0.5)',
        padding: '10px 20px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.2)',
        textAlign: 'right'
      }}>
        <h3 style={{ margin: 0, fontSize: '1rem', color: '#aaa' }}>Score</h3>
        <p style={{ margin: '4px 0 0 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#64c8ff' }}>{score}</p>
      </div>
    </div>
  );
};
