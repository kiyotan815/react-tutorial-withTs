import React, { Component } from 'react';
import Board from './Board'
import calculateWinner from './calculateWinner'
import { SquareType } from './type'
import { Button } from '@material-ui/core'

interface GameState {
  history: Array<{squares: Array<SquareType>}>
  stepNumber: number
  xIsNext: boolean
}

class Game extends Component<any, GameState> {
  constructor(props: any) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }


  render() {
    const { history, stepNumber } = this.state
    const current = history[stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start'
      return (
        <li key={move} style={{marginBottom: 5}}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </Button>
        </li>
      )
    })

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul style={{listStyleType: 'none'}}>{moves}</ul>
        </div>
      </div>
    );
  }
}

export default Game;
