import React from "react";
import "./home.css";
import { connect } from "react-redux";
import { changePlayerName } from "../../redux/player";
import { withRouter } from "react-router-dom";
import Button from "../../components/utils/Button/Button";

/**
 * A game of tic-tac-toe.
 */
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameX: "",
      nameO: "",
    };
  }

  //if both names are filled in, will move to game
  componentDidUpdate() {
    if (this.props.xPlayerName && this.props.oPlayerName) {
      this.props.history.push("/game");
    }
  }

  render() {
    const handleKeyChange = (e) => {
      //removed spaces from input for smaller names
      if (e.key === " ") {
        e.preventDefault();
      }
    };

    const playerContainer = (isX) => {
      let playerName = isX ? this.props.xPlayerName: this.props.oPlayerName;
      let condition = playerName !== '';
      let inputKey = isX ? "nameX" : "nameO";
      let buttonClick = isX ? this.state.nameX : this.state.nameO;
      if (condition) {
        return (
          <div className="inputtedName">
            <p>{playerName}</p>
          </div>
        )
      } else {
        return (
          <div>
            <p className="nameTitle">Enter your name, Player {isX ? "X" : "O"}</p>
            <div className="nameInputContainer">
              <input
                onChange={(e, k = inputKey) => { //k being passed as key
                  this.setState({[k]: e.target.value });
                }}
                placeholder="Enter Name"
                className="nameInput"
                onKeyDown={handleKeyChange}
                maxLength={10}
              />
              <Button
                onClick={() =>
                  this.props.changePlayerName(buttonClick, isX)
                }
                text="Ready?"
              />
            </div>
          </div>
        );
      }
    };

    return (
      <div className="namesContainer">
        <div className="nameContainer">
        {playerContainer(true)}
        </div>
        <div className="XOStringContainer">
          <p className="XOString animated-loop">OXOXOXOXOXOX</p>
        </div>
        <div className="nameContainer">
          {playerContainer(false)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    xPlayerName: state.winner.xPlayer.playerName,
    oPlayerName: state.winner.oPlayer.playerName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePlayerName: (inputName, isX) =>
      dispatch(changePlayerName(inputName, isX)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
