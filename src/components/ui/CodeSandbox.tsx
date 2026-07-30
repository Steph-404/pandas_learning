import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useGameStore } from '../../store/gameStore';
import { sandboxStages } from '../../data/sandboxStages';
import { STORYLINE } from '../../data/storyline';
import { loadPyodide, executePython } from '../../utils/pyodideLoader';
import './CodeSandbox.css';

export const CodeSandbox: React.FC = () => {
  const { currentStageId, nextStage, setSequence, isQuestionActive } = useGameStore();
  const stage = sandboxStages[currentStageId];

  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stage || stage.type !== 'code_sandbox') return;
    
    setCode(stage.starterCode || '');
    setOutput('');
    setIsValidated(false);
    setErrorMsg(null);

    // Initialize pyodide ahead of time
    setIsPyodideLoading(true);
    loadPyodide()
      .then(() => setIsPyodideLoading(false))
      .catch(err => {
        console.error("Failed to load Pyodide", err);
        setErrorMsg("Failed to initialize Python environment.");
        setIsPyodideLoading(false);
      });
  }, [stage]);

  // Handle Pyodide stdout
  useEffect(() => {
    (window as any).onPyodideStdout = (str: string) => {
      setOutput(prev => prev + str + '\n');
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    };
    return () => {
      (window as any).onPyodideStdout = null;
    };
  }, []);

  if (!isQuestionActive || stage?.type !== 'code_sandbox') {
    return null;
  }

  const handleRunCode = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setOutput('');
    setErrorMsg(null);

    // First, run the user's code
    const res = await executePython(code);
    
    if (!res.success) {
      setErrorMsg(res.error);
      setIsRunning(false);
      return;
    }

    // Next, run the validation script if present
    if (stage.validationScript) {
      const valRes = await executePython(stage.validationScript);
      
      // We expect the validation script to set 'valid' (bool) and 'error' (string) in python globals
      if (valRes.success) {
        const pyodide = await loadPyodide();
        const valid = pyodide.globals.get('valid');
        const vError = pyodide.globals.get('error');
        
        if (valid) {
          setIsValidated(true);
          setOutput(prev => prev + '\n>>> SUCCESS: ' + (stage.successMessage || 'Task completed.') + '\n');
        } else {
          setErrorMsg(vError || 'Validation failed. Try again.');
        }
      } else {
        setErrorMsg("Validation script error: " + valRes.error);
      }
    } else {
      // No validation script, just mark as success
      setIsValidated(true);
    }

    setIsRunning(false);
  };

  const handleNextStage = () => {
    if (currentStageId >= STORYLINE.length) {
      useGameStore.getState().incrementScore();
      setSequence('FAREWELL_TRANSIT');
    } else {
      useGameStore.getState().incrementScore();
      nextStage();
    }
  };

  return (
    <div className="sandbox-overlay">
      <div className="sandbox-header">
        <div className="sandbox-title">Redrock Station // pandas environment</div>
        <div className="sandbox-stage-info">{stage.title}</div>
      </div>
      
      <div className="sandbox-prompt">
        <p>{stage.prompt}</p>
      </div>

      <div className="sandbox-workspace">
        <div className="sandbox-editor-pane">
          <Editor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: '"Fira Code", "Cascadia Code", monospace',
              scrollBeyondLastLine: false,
              padding: { top: 16 }
            }}
          />
        </div>
        
        <div className="sandbox-output-pane">
          <div className="output-header">Console Output</div>
          <div className="output-content" ref={outputRef}>
            {isPyodideLoading && <div className="loading-text">Loading Python Environment (WebAssembly)...</div>}
            {!isPyodideLoading && output}
            {errorMsg && <div className="error-text">{errorMsg}</div>}
          </div>
          
          <div className="sandbox-actions">
            {!isValidated ? (
              <button 
                className={`btn-run ${isRunning || isPyodideLoading ? 'disabled' : ''}`}
                onClick={handleRunCode}
                disabled={isRunning || isPyodideLoading}
              >
                {isRunning ? 'Running...' : 'Run Code (Ctrl+Enter)'}
              </button>
            ) : (
              <button 
                className="btn-next-stage"
                onClick={handleNextStage}
              >
                Proceed to Next Stage →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
