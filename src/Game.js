import React from 'react';
import {Board} from './Board';
import {calculateWinner} from './CalculateWinner';
import './Game.css';


export class Game extends React.Component{
constructor(props){
  super(props);
  this.state = {
    history: [{
       squares: Array(9).fill(null)
    }],
    stepNumber: 0,
    xIsNext: true,
  };
}

handleClick(i){
  const history = this.state.history.slice(0, this.state.stepNumber + 1);
  const current = history[history.length - 1];
  const locations = [
    [1, 1],
    [2, 1],
    [3, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [1, 3],
    [2, 3],
    [3, 3]
  ];
  const squares = current.squares.slice();
  if (calculateWinner(squares) || squares[i]) {
   return;
 }
  squares[i] = this.state.xIsNext ? 'X' : 'O';
  this.setState({
    history: history.concat([{
      squares: squares,
      location: locations[i] 
    }]),
    stepNumber: history.length,
    xIsNext: !this.state.xIsNext,
   });
}

jumpTo(step){
  this.setState({
    stepNumber: step,
    xIsNext: (step % 2) === 0,
  })
}

  render(){
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
   
    const moves = history.map((step,move)=>{
      const desc = move ?
      `Go to step #${move} at Col${history[move].location[0]} Row${history[move].location[1]}`
      : `Go back to start`;
      return(
        <li key={move}>
          <button className="history-btn" onClick={() => this.jumpTo(move)}>
              {desc}
          </button>
        </li>
      )
    });



    let status;
    if (winner) {
      status = 'Winner is ' + winner.winner;
    } else if (!current.squares.includes(null)) {
      status = "Game ended in a draw";
    } else if (this.state.stepNumber === 0) {
      status = "Let's play";
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }


    return(
      <div className='game'>
        <h1 className="game-title">Tic Tac Toe</h1>
        <div className="game-status">{status}</div>
        <div className="game-board">
        <Board
          winningSquares={winner ? winner.line : []}
          squares={current.squares}
          onClick={i => this.handleClick(i)}
        />
        <div className="game-info">
          <ul>{moves}</ul>
        </div>
        </div>
      </div>
    );
  }
}
