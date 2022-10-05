import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [SwSupport, setSwSupport] = useState(false);
  const [IdbSupport, setIdbSupport] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [tableValues, setTableValues] = useState<string[]>(() => {
    const localTable = localStorage.getItem('table');
    
    if (typeof localTable === 'string'){
      return JSON.parse(localTable);
    } else {
      localStorage.setItem('table', '[]');
      return []
    }
  });
  const [formState, setFormState] = useState(false);

  const handleConfirm = () => {
    setTableValues(old => [...old, inputValue])
    localStorage.setItem('table', JSON.stringify(tableValues));
  }
  
  const handleClear = () => {
    localStorage.setItem('table', '[]');
    setTableValues([]);
  }

  const handleSync = () => {
    console.log(JSON.parse(localStorage.getItem('table') || ''));
  }

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      setSwSupport(true)
    }
    
    if ('indexedDB' in window) {
      setIdbSupport(true)
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div>ServiceWorker Support ({SwSupport.toString()})</div>
        <div>IndexedDB Support ({IdbSupport.toString()})</div>
        <h3>Teste de Armazenamento de Informações PWA em React</h3>
        <input disabled={formState} placeholder='value' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <button onClick={handleConfirm} disabled={formState}>Inserir</button>
        <button onClick={handleClear} disabled={formState}>Limpar</button>
        <button onClick={handleSync} disabled={formState}>Sincronizar</button>
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {tableValues.map((el, i) => <tr key={i}><td>{i}</td><td>{el}</td></tr>)}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
