import { Scene } from './components/3d/Scene';
import { DialogueBox } from './components/ui/DialogueBox';
import { QuestionPanel } from './components/ui/QuestionPanel';
import { FarewellDialogue } from './components/ui/FarewellDialogue';
import { HUD } from './components/ui/HUD';
import { useGameStore } from './store/gameStore';

function App() {
  const sequence = useGameStore(state => state.sequence);

  if (sequence === 'COMPLETED') {
    return (
      <div style={{
        width: '100vw', height: '100vh',
        background: 'linear-gradient(135deg, #040c1a 0%, #081428 50%, #040c1a 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Segoe UI", system-ui, sans-serif',
        color: '#d8eaff',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>🎉</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#64c8ff', margin: '0 0 8px', letterSpacing: '0.04em' }}>
          Assessment Complete!
        </h1>
        <p style={{ color: '#6090c0', fontSize: '1.0rem', marginBottom: 32 }}>
          You've successfully completed the Redrock Field Lab pandas assessment.
        </p>
        <div style={{
          background: 'rgba(20,50,100,0.4)',
          border: '1px solid rgba(100,200,255,0.3)',
          borderRadius: '12px',
          padding: '28px 48px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.78rem', color: '#4080a0', letterSpacing: '0.12em', marginBottom: 8 }}>FINAL SCORE</div>
          <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#64c8ff' }}>
            {useGameStore.getState().score}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#507090', marginTop: 8 }}>points earned</div>
        </div>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: 36,
            background: 'linear-gradient(135deg, #1a4a8a, #0d3060)',
            color: '#c8e0ff',
            border: '1px solid rgba(60,140,255,0.45)',
            padding: '12px 40px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
            letterSpacing: '0.08em',
          }}
        >
          ↩ Restart
        </button>
      </div>
    );
  }

  return (
    <Scene>
      <HUD />
      <DialogueBox />
      <QuestionPanel />
      <FarewellDialogue />
    </Scene>
  );
}

export default App;
