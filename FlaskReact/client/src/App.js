import React, { useState } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [buttonVisible, setButtonVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question.trim() }),
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error('Error fetching answer:', error);
    }
  };

  const handleDoubleClick = () => {
    setButtonVisible(true);
  };

  return (
    <div className="App">
      <div className="card">
        <h1>Optimization Criteria</h1>
        <form onSubmit={handleSubmit}>
          <div className="text-container">
            <textarea
              value={question} 
              onChange={(e) => setQuestion(e.target.value)} 
              onDoubleClick={handleDoubleClick}
              style={{
                width: '100%',
                height: '100px',
                resize: 'vertical', // Allow vertical resizing
                fontSize: '12px',   // Adjust font size if needed
                border: 'none',     // Make border invisible
                outline: 'none',    // Remove outline on focus
                padding: '10px',    // Add some padding for better appearance
                boxSizing: 'border-box',
              }}
              className="text-common"
            ></textarea>
          </div>
          {buttonVisible && (
            <button type="submit">Examplify</button>
          )}
        </form>
        {answer && (
          <div>
            <p className="text-common">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
