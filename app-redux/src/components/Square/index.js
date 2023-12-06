import React from "react";
import PropTypes from 'prop-types';
import './square.css';

/**
 * A square in the game of tic tac toe.   Can be clicked or the square can contain a value.
 */
function Square(props) {
    const squareClass = props.isWinning ? "winningSquare" : (props.isMain ? "square" : "notMainSquare");

    return (
        <button className={squareClass} onClick={props.onClick ? props.onClick : null}>
            {props.value}
        </button>
    );
}

Square.propTypes = {
    /**
     *  The handler for when a square is clicked
     */
    onClick: PropTypes.func,

    /**
     * Checks if the square is for the main board or for the history component
     */

    isMain: PropTypes.bool,

    /**
     * Checks the value within the square
     */

    value: PropTypes.oneOf(['X', 'O', null]),

    /**
     * Adds a colour for when it is a winning square
     */

    isWinning: PropTypes.bool
};

export default Square;