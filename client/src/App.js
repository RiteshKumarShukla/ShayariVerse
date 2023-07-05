import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [shayari, setShayari] = useState('');

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleGenerateClick = async () => {
    try {
      const response = await fetch('http://localhost:8080/generate?type=Shayari', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });

      if (response.ok) {
        const data = await response.json();
        setShayari(data.join('\n'));
      } else {
        console.log('Error:', response.statusText);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  return (
    <div className="App">
      <h1>Shayari Generator</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a keyword"
          value={keyword}
          onChange={handleKeywordChange}
        />
        <button onClick={handleGenerateClick}>Generate Shayari</button>
      </div>
      {shayari && (
        <div className="shayari-container">
          <h2>Generated Shayari:</h2>
          <p>{shayari}</p>
        </div>
      )}
    </div>
  );
};

export default App;
