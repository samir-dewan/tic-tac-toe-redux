import React from "react";
import Board from "../../components/Board";
import "./game.css";

import { selectSquare, selectMove, restartGame } from "../../redux/game/index";
import { connect } from "react-redux";
import { changePlayerName, increaseWinnerCount } from "../../redux/player";
import Button from "../../components/utils/Button/Button";

/**
 * Renders the game page, with the main board and history.
 */
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameX: "",
      nameO: "",
    };
  }

  //on update, increases the count of the winner.
  componentDidUpdate(prevProps) {
    if (this.props.winner && this.props.winner !== prevProps.winner) {
      this.props.increaseWinnerCount(this.props.winner);
    }
  }

  render() {
    const history = this.props.history;
    const current = history[this.props.stepNumber];
    const xCount = this.props.xPlayerCount;
    const xName = this.props.xPlayerName;
    const oCount = this.props.oPlayerCount;
    const oName = this.props.oPlayerName;
    const xIsNext = this.props.xIsNext;
    const squares = this.props.history[history.length - 1].squares;

    const drawGame =
      squares.every((square) => square !== null) && !this.props.winner;
    console.log(squares, drawGame);

    const moves = history.map((step, move) => {
      if (move) {
        return (
          //creates board for each historical move made.
          <div
            key={move}
            className="historicBoard"
            onClick={() => this.props.jumpToMove(move)}
          >
            <Board squares={step.squares} isMain={false} />
            <p className="historicBoardDescriptor">{"Go to move " + move}</p>
          </div>
        );
      } else return null;
    });

    let status;
    if (this.props.winner) {
      //for stating turn or winner
      status =
        "Winner: " + (xIsNext ? (oName ? oName : "O") : xName ? xName : "X");
    } else if (drawGame) {
      status = "Draw!!!";
    } else {
      status =
        "Next player: " +
        (xIsNext ? (xName ? xName : "X") : oName ? oName : "O");
    }

    return (
      <div>
        <div>
          <div className="gameContainer">
            <div className="detailContainer">
              <div className="versusContainer">
                <div className="playerContainer">
                  <h1 className="playerName">{xName ? xName : "Player X"}</h1>
                  <h3 className="playerScore">Score: {xCount}</h3>
                </div>
                <div className="statusContainer">
                  <p>{status}</p>
                  <div>
                    <Button text="Play Again?" onClick={this.props.restartGame} />
                  </div>
                </div>
                <div className="playerContainer">
                  <h1 className="playerName">{oName ? oName : "Player O"}</h1>
                  <h3 className="playerScore">Score: {oCount}</h3>
                </div>
              </div>
              <div className="historyTitleContainer">
                <p className="historyTitle">History</p>
              </div>
              <div className="gameHistory">{moves}</div>
            </div>
            <div className="gameBoard">
              <Board
                squares={current.squares}
                onClick={(i) => this.props.handleClick(i)}
                isMain={true}
                winningLine={this.props.winningLine}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    winner: state.game.winner,
    winningLine: state.game.winningLine,
    xIsNext: state.game.xIsNext,
    history: state.game.history,
    stepNumber: state.game.stepNumber,
    xPlayerName: state.winner.xPlayer.playerName,
    oPlayerName: state.winner.oPlayer.playerName,
    xPlayerCount: state.winner.xPlayer.playerCount,
    oPlayerCount: state.winner.oPlayer.playerCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: (squareNumber) => dispatch(selectSquare(squareNumber)),
    jumpToMove: (moveNumber) => dispatch(selectMove(moveNumber)),
    restartGame: () => dispatch(restartGame()),
    increaseWinnerCount: (winner) => dispatch(increaseWinnerCount(winner)),
    changePlayerName: (inputName, isX) =>
      dispatch(changePlayerName(inputName, isX)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
