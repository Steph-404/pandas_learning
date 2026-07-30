import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { STORYLINE } from '../../data/storyline';
import anime from 'animejs';

export const QuestionPanel: React.FC = () => {
  const {
    currentStageId, isQuestionActive,
    selectedAnswer, setSelectedAnswer,
    feedback, setFeedback,
    score, incrementScore, nextStage,
    setQuestionActive, setDialogueActive,
  } = useGameStore();

  const stage = STORYLINE.find(s => s.id === currentStageId);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLastStage = currentStageId >= STORYLINE.length;

  useEffect(() => {
    if (isQuestionActive && containerRef.current) {
      anime({
        targets: containerRef.current,
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo',
      });
    }
  }, [isQuestionActive]);

  if (!stage || !isQuestionActive) return null;

  const handleAnswer = (optionId: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(optionId);
    const isCorrect = optionId === stage.question.correctOptionId;
    if (isCorrect) {
      incrementScore();
      setFeedback(`✓ ${stage.question.explanation}`);
    } else {
      setFeedback(`✗ Incorrect. ${stage.question.explanation}`);
    }
  };

  const handleNext = () => {
    if (isLastStage) {
      useGameStore.getState().setSequence('COMPLETED');
      setQuestionActive(false);
    } else {
      nextStage();
      setQuestionActive(false);
      setDialogueActive(false);
      // Show next dialogue after a brief pause
      setTimeout(() => {
        setDialogueActive(true);
      }, 500);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(2,8,20,0.97) 0%, rgba(4,12,28,0.97) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        fontFamily: '"Fira Code", "Cascadia Code", "Consolas", monospace',
        padding: '20px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '820px' }}>
        {/* Terminal header bar */}
        <div style={{
          background: 'rgba(20,40,80,0.8)',
          border: '1px solid rgba(40,100,200,0.3)',
          borderBottom: 'none',
          borderRadius: '10px 10px 0 0',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
          <span style={{ marginLeft: 12, fontSize: '0.75rem', color: '#4080c0', letterSpacing: '0.1em' }}>
            REDROCK_LAB — pandas_assessment.py — Stage {currentStageId}/{STORYLINE.length}
          </span>
          <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: '#2060a0' }}>
            score: {score}
          </span>
        </div>

        {/* Terminal body */}
        <div style={{
          background: 'rgba(4,10,22,0.98)',
          border: '1px solid rgba(40,100,200,0.3)',
          borderRadius: '0 0 10px 10px',
          padding: '28px 32px',
          boxShadow: '0 30px 80px rgba(0,0,20,0.8)',
        }}>
          {/* Breadcrumb / context */}
          <div style={{ fontSize: '0.7rem', color: '#2060a0', marginBottom: '16px', letterSpacing: '0.05em' }}>
            <span style={{ color: '#1a88ff' }}>{'>>> '}</span>
            <span style={{ color: '#4aaa44' }}>{stage.title.toLowerCase().replace(/\s/g, '_')}</span>
            <span style={{ color: '#888' }}>.assess()</span>
          </div>

          {/* Question */}
          <div style={{
            background: 'rgba(10,30,70,0.6)',
            border: '1px solid rgba(30,80,180,0.25)',
            borderLeft: '3px solid #1a88ff',
            borderRadius: '4px',
            padding: '16px 20px',
            marginBottom: '24px',
          }}>
            <span style={{ color: '#4aaa44', fontSize: '0.75rem', display: 'block', marginBottom: 8 }}>
              # QUESTION
            </span>
            <p style={{ color: '#d0e8ff', fontSize: '1.0rem', lineHeight: 1.65, margin: 0 }}>
              {stage.question.text}
            </p>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {stage.question.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.id === stage.question.correctOptionId;
              let bgColor = 'rgba(10,25,60,0.7)';
              let borderColor = 'rgba(40,100,200,0.2)';
              let textColor = '#90aad0';

              if (selectedAnswer) {
                if (isCorrect) {
                  bgColor = 'rgba(10,60,30,0.7)';
                  borderColor = 'rgba(40,200,80,0.5)';
                  textColor = '#88eea0';
                } else if (isSelected) {
                  bgColor = 'rgba(60,10,10,0.7)';
                  borderColor = 'rgba(200,40,40,0.5)';
                  textColor = '#ee8888';
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  disabled={!!selectedAnswer}
                  style={{
                    background: bgColor,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '6px',
                    padding: '14px 18px',
                    textAlign: 'left',
                    cursor: selectedAnswer ? 'default' : 'pointer',
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'flex-start',
                    transition: 'all 0.25s ease',
                    color: textColor,
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    lineHeight: '1.55',
                  }}
                  onMouseEnter={e => {
                    if (!selectedAnswer) {
                      e.currentTarget.style.borderColor = 'rgba(100,180,255,0.5)';
                      e.currentTarget.style.background = 'rgba(16,40,90,0.8)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!selectedAnswer) {
                      e.currentTarget.style.borderColor = 'rgba(40,100,200,0.2)';
                      e.currentTarget.style.background = 'rgba(10,25,60,0.7)';
                    }
                  }}
                >
                  <span style={{
                    fontWeight: 700, fontSize: '0.78rem',
                    color: selectedAnswer ? (isCorrect ? '#44ee88' : isSelected ? '#ee4444' : '#2060a0') : '#1a88ff',
                    minWidth: 20, marginTop: 2,
                  }}>
                    {option.id.toUpperCase()}.
                  </span>
                  {option.text}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {feedback && (
            <div style={{
              background: feedback.startsWith('✓')
                ? 'rgba(10,50,20,0.8)' : 'rgba(50,10,10,0.8)',
              border: `1px solid ${feedback.startsWith('✓') ? 'rgba(40,180,80,0.4)' : 'rgba(180,40,40,0.4)'}`,
              borderRadius: '6px',
              padding: '14px 18px',
              fontSize: '0.88rem',
              color: feedback.startsWith('✓') ? '#88eea0' : '#ee9090',
              lineHeight: 1.55,
              marginBottom: '16px',
            }}>
              {feedback}
            </div>
          )}

          {/* Next button */}
          {selectedAnswer && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleNext}
                style={{
                  background: 'linear-gradient(135deg, #1a4a8a, #0d3060)',
                  color: '#c8e0ff',
                  border: '1px solid rgba(60,140,255,0.4)',
                  padding: '11px 32px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: 'inherit',
                }}
              >
                {isLastStage ? '◆ Complete Assessment' : '→ Next Stage'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
