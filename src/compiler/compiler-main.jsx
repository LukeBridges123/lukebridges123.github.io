import CodeMirror from '@uiw/react-codemirror';
import { useState, useCallback } from 'react';
import createMyModule from './Project4.js'


export function CompilerPage(){
  var module = createMyModule();
  const defaultCode = "function Get42() : int { return 42; }";
  const [userCode, updateUserCode] = useState(defaultCode);
  const onChange = useCallback((value, viewUpdate) => {
    updateUserCode(value)
  }, []);
  function onClick(){
    module.main();
  }
  
    return <div>
      <CodeMirror
      value={defaultCode}
      height="200px"
      onChange={onChange}
    />
    <button onClick={onClick}>Compile</button>
    </div>
}
