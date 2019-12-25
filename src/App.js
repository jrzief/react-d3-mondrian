import React from 'react';
import './App.css';
import Mondrian from './Mondrian';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Piet Mondrain chart generator</h1>
        <p>Tweak the params - see what happens</p>
      </header>
      <svg width="100%" height="100%" style={{ border: '1px solid red' }}>
        <Mondrian x={100} y={10} width={800} height={350} />
      </svg>
    </div>
  );
}

export default App;
