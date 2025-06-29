import CodeMirror from '@uiw/react-codemirror';
import { useState, useCallback, useEffect } from 'react';
import createMyModule from './Project4.js'
import { ErrorMessage, LoadingMessage } from '../components/ErrorMessage';

export function CompilerPage(){
  const [module, setModule] = useState(null);
  const [isModuleLoading, setIsModuleLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilationResult, setCompilationResult] = useState(null);
  
  const defaultCode = "function Get42() : int { return 42; }";
  const [userCode, updateUserCode] = useState(defaultCode);
  
  // Initialize WebAssembly module
  useEffect(() => {
    const loadModule = async () => {
      try {
        setIsModuleLoading(true);
        setError(null);
        const wasmModule = await createMyModule();
        setModule(wasmModule);
      } catch (err) {
        setError({
          message: "Failed to load the WebAssembly compiler. Please refresh the page and try again. If the problem persists, the compiler may be temporarily unavailable.",
          type: 'error'
        });
      } finally {
        setIsModuleLoading(false);
      }
    };
    
    loadModule();
  }, []);
  
  const onChange = useCallback((value, viewUpdate) => {
    updateUserCode(value);
    setCompilationResult(null); // Clear previous results when code changes
  }, []);
  
  function onClick(){
    if (!module) {
      setError({
        message: "Compiler not loaded. Please wait for the compiler to initialize or refresh the page.",
        type: 'warning'
      });
      return;
    }
    
    if (!userCode.trim()) {
      setError({
        message: "Please enter some code to compile.",
        type: 'warning'
      });
      return;
    }
    
    setIsCompiling(true);
    setError(null);
    setCompilationResult(null);
    
    try {
      // Attempt to compile the code
      const result = module.main();
      setCompilationResult({
        success: true,
        message: "Compilation completed successfully!",
        output: result
      });
      setError({
        message: "Code compiled successfully!",
        type: 'success'
      });
    } catch (err) {
      setCompilationResult({
        success: false,
        message: "Compilation failed",
        error: err.message || "Unknown compilation error"
      });
      setError({
        message: `Compilation failed: ${err.message || 'Unknown error occurred during compilation.'}`,
        type: 'error'
      });
    } finally {
      setIsCompiling(false);
    }
  }
  
  if (isModuleLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <LoadingMessage message="Loading WebAssembly compiler..." />
        <p>Please wait while the compiler initializes...</p>
      </div>
    );
  }
  
  return (
    <div style={{ padding: '1rem' }}>
      {error && (
        <ErrorMessage 
          message={error.message} 
          type={error.type} 
          onClose={() => setError(null)}
        />
      )}
      
      {isCompiling && (
        <LoadingMessage message="Compiling code..." />
      )}
      
      <div style={{ marginBottom: '1rem' }}>
        <h2>WebAssembly Compiler</h2>
        <p>Write your code in the editor below and click "Compile" to generate WebAssembly.</p>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <CodeMirror
          value={defaultCode}
          height="200px"
          onChange={onChange}
        />
      </div>
      
      <button 
        onClick={onClick} 
        disabled={isCompiling || !module}
        style={{
          padding: '10px 20px',
          backgroundColor: isCompiling || !module ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: isCompiling || !module ? 'not-allowed' : 'pointer',
          marginBottom: '1rem'
        }}
      >
        {isCompiling ? 'Compiling...' : 'Compile'}
      </button>
      
      {compilationResult && (
        <div style={{
          padding: '1rem',
          backgroundColor: compilationResult.success ? '#d4edda' : '#f8d7da',
          border: `1px solid ${compilationResult.success ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '5px',
          marginTop: '1rem'
        }}>
          <h3>{compilationResult.message}</h3>
          {compilationResult.success ? (
            <p>Output: {compilationResult.output}</p>
          ) : (
            <p>Error: {compilationResult.error}</p>
          )}
        </div>
      )}
    </div>
  );
}
