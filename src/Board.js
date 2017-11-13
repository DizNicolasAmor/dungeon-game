import React from 'react';


class Board extends React.Component {
  render() {
    return (
      <div className="board">

        {this.props.board.map( eachRow => (
          eachRow.map( eachCell => (
            <div className = {"cell " + eachCell}></div> 
          ))
        ))}
        
      </div>
    );
  }
}

export default Board;