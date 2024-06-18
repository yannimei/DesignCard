import React, {useState,useEffect} from 'react';

function App() {

  const [dataDisplay, setData] = useState([{}])

  useEffect(() =>{
    fetch("/home").then(
      res => res.json()
    ).then
    (
      dataDisplay => {
        setData(dataDisplay)
        console.log(dataDisplay)
      }
    )
  }, [])

  return (
    <div>
      {(typeof dataDisplay.cards === 'undefined') ? (
        <p>loading...</p>
      ) : (
        dataDisplay.cards.map ((cards,i) => (
          <p key={i}>{cards}</p>
        ))
      )

      }
    </div>
  );
}

export default App;

