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
        {!answer ? (
          <form onSubmit={handleSubmit}>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onDoubleClick={handleDoubleClick}
              className="text-common"
            ></textarea>
            {buttonVisible && (
              <button type="submit">Examplify</button>
            )}
          </form>
        ) : (
          <div className="text-container">
            <p className="text-common">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
  
  // return (
  //   <div className="App">
  //     <div className="card">
  //       <h1>Optimization Criteria</h1>
  //       <form onSubmit={handleSubmit}>
  //           <textarea
  //             value={question} 
  //             onChange={(e) => setQuestion(e.target.value)} 
  //             style={{
  //               width: '100%',
  //               height: '100px',
  //               resize: 'vertical', // Allow vertical resizing
  //               fontSize: '12px',   // Adjust font size if needed
  //             }}
  //           ></textarea>
  //         <button type="submit">Examplify</button>
  //       </form>
  //       {answer && (
  //         <div>
  //           <h2>Answer:</h2>
  //           <p>{answer}</p>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
}

export default App;
