import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [NextPlayer, SetNextPlayer] = useState(true);
  const [value, SetValue] = useState(Array(9).fill(null));

  const winner = calculateWinner(value);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (NextPlayer ? "X" : "O");
  }

  function changestatus(i){
    if (calculateWinner(value) || value[i]) {
      return;
    }
    let Zug = value.slice()
    if(NextPlayer || calculateWinner(value)){
      Zug[i] = "X"
    }else{
      Zug[i] = "O"
    }
    SetValue(Zug)
    SetNextPlayer(!NextPlayer)
  }

  function Square({value, Click}) {
    return <button style={{backgroundColor: value == "O" ? "rgba(0, 28, 142, 1)" : value == "X" ? "rgba(138, 0, 0, 1)": "#222222ff"}} className="square" onClick={Click}>{value}</button>;
  }
  function NewGame(){
    SetNextPlayer(true)
    SetValue(Array(9).fill(null))
  }

  return (
    <>
      <div><button className='Start' onClick={NewGame}>Start New Game</button></div>
      <p>{status}</p>
      <div className='board-row'>
        <Square value={value[0]} Click={() => changestatus(0)}/>
        <Square value={value[1]} Click={() => changestatus(1)}/>
        <Square value={value[2]} Click={() => changestatus(2)}/>
      </div>
      <div className='board-row'>
        <Square value={value[3]} Click={() => changestatus(3)}/>
        <Square value={value[4]} Click={() => changestatus(4)}/>
        <Square value={value[5]} Click={() => changestatus(5)}/>
      </div>
      <div className='board-row'>
        <Square value={value[6]} Click={() => changestatus(6)}/>
        <Square value={value[7]} Click={() => changestatus(7)}/>
        <Square value={value[8]} Click={() => changestatus(8)}/>
      </div>
    </>
  )
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App
