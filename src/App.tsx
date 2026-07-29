import { Scene } from './components/3d/Scene';
import { DialogueBox } from './components/ui/DialogueBox';
import { QuestionPanel } from './components/ui/QuestionPanel';
import { HUD } from './components/ui/HUD';

function App() {
  return (
    <Scene>
      <HUD />
      <DialogueBox />
      <QuestionPanel />
    </Scene>
  );
}

export default App;
