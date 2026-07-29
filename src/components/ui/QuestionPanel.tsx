import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { STORYLINE } from '../../data/storyline';
import anime from 'animejs';

export const QuestionPanel: React.FC = () => {
  const { 
    currentStageId, 
    isQuestionActive, 
    selectedAnswer, 
    setSelectedAnswer,
    feedback,
    setFeedback,
    incrementScore,
    nextStage
  } = useGameStore();
  
  const stage = STORYLINE.find(s => s.id === currentStageId);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isQuestionActive && containerRef.current) {
      anime({
        targets: containerRef.current,
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutElastic(1, .8)'
      });
    }
  }, [isQuestionActive]);

  if (!stage || !isQuestionActive) return null;

  const handleSelect = (optionId: string) => {
    if (selectedAnswer) return; // Prevent changing answer
    
    setSelectedAnswer(optionId);
    
    if (optionId === stage.question.correctOptionId) {
      setFeedback(stage.question.explanation);
      incrementScore();
    } else {
      setFeedback("Incorrect. " + stage.question.explanation);
    }
  };

  const handleNextStage = () => {
    if (currentStageId < STORYLINE.length) {
      nextStage();
    } else {
      // Game Complete
      alert("Assessment Complete! Check your score.");
    }
  };

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '700px',
        backgroundColor: 'rgba(20, 30, 40, 0.95)',
        border: '2px solid rgba(100, 200, 255, 0.5)',
        borderRadius: '12px',
        padding: '32px',
        color: '#fff',
        fontFamily: 'sans-serif',
        boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      <h2 style={{ margin: 0, color: '#fff', fontSize: '1.5rem' }}>{stage.question.text}</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {stage.question.options.map(option => {
          const isSelected = selectedAnswer === option.id;
          const isCorrect = option.id === stage.question.correctOptionId;
          const showColors = selectedAnswer !== null;
          
          let bgColor = 'rgba(255, 255, 255, 0.1)';
          let borderColor = 'rgba(255, 255, 255, 0.2)';
          
          if (showColors) {
            if (isCorrect) {
              bgColor = 'rgba(46, 204, 113, 0.2)';
              borderColor = '#2ecc71';
            } else if (isSelected && !isCorrect) {
              bgColor = 'rgba(231, 76, 60, 0.2)';
              borderColor = '#e74c3c';
            }
          } else if (isSelected) {
            bgColor = 'rgba(100, 200, 255, 0.3)';
            borderColor = '#64c8ff';
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={selectedAnswer !== null}
              style={{
                background: bgColor,
                border: `1px solid ${borderColor}`,
                padding: '16px',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '1.1rem',
                textAlign: 'left',
                cursor: selectedAnswer === null ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
              }}
            >
              {option.text}
            </button>
          );
        })}
      </div>

      {feedback && (
        <div style={{
          marginTop: '16px',
          padding: '16px',
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: '8px',
          borderLeft: `4px solid ${selectedAnswer === stage.question.correctOptionId ? '#2ecc71' : '#e74c3c'}`
        }}>
          <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: '1.5' }}>{feedback}</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button 
              onClick={handleNextStage}
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
              {currentStageId < STORYLINE.length ? 'Next Stage' : 'Finish'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
