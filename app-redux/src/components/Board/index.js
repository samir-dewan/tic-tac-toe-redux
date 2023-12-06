import React from "react";
import PropTypes from "prop-types";
import "./board.css";
import Square from "../Square";

/**
 * A board for the game of tic-tac-toe.  A 3x3 square.
 */
class Board extends React.Component {
  renderSquare(i) {
    const isWinningSquare =
      this.props.winningLine && this.props.winningLine.includes(i);
    return (
      <Square
        value={this.props.squares[i]}
        onClick={this.props.onClick ? () => this.props.onClick(i) : null}
        isMain={this.props.isMain}
        isWinning={isWinningSquare}
      />
    );
  }

  render() {
    const squares = [];
    for (let i = 0; i < 9; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div className={this.props.isMain ? "board" : "notMainBoard"}>
        {squares}
      </div>
    );
  }
}

Board.propTypes = {
  /**
   *  The 1..9 array of squares to display
   */
  squares: PropTypes.array.isRequired,

  /**
   *  The handler for when a square is clicked
   */
  onClick: PropTypes.func,

  /**
   * checks if this board is the main player board or not.
   */
  isMain: PropTypes.bool,

  /**
   * checks the indexes of the winning squares of the board, so they can be classed.
   */
  winningLine: PropTypes.array,
};

export default Board;
