import React, {useState,useEffect} from 'react';

// function App() {

//   const [dataDisplay, setData] = useState([{}])

//   useEffect(() =>{
//     fetch("/home").then(
//       res => res.json()
//     ).then
//     (
//       dataDisplay => {
//         setData(dataDisplay)
//         console.log(dataDisplay)
//       }
//     )
//   }, [])

//   return (
//     <div>
//       {(typeof dataDisplay.cards === 'undefined') ? (
//         <p>loading...</p>
//       ) : (
//         dataDisplay.cards.map ((cards,i) => (
//           <p key={i}>{cards}</p>
//         ))
//       )

//       }
//     </div>
//   );
// }

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

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

  return (
    <div className="App">
      <h1>Ask a Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your question:
          <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
        </label>
        <button type="submit">Get Answer</button>
      </form>
      {answer && (
        <div>
          <h2>Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;

