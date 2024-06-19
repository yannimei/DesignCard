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
  const [answer, setAnswer] = useState('');

  const fetchAnswer = async () => {
    try {
      const response = await fetch('/answer'); // Replace with your Flask server URL
      const data = await response.text();
      setAnswer(data);
    } catch (error) {
      console.error('Error fetching answer:', error);
    }
  };

  return (
    <div className="App">
      <h1>what is deisgn card</h1>
      <button onClick={fetchAnswer}>Fetch Answer</button>
      <p>{answer}</p>
    </div>
  );
}

export default App;

