import React from 'react';


class Board extends React.Component {
  render() {
    return (
      <div className="board">

        {this.props.board.map( (eachRow, rowID) => (
          eachRow.map( (eachCell, colID) => (
            <div className = {"cell " + eachCell} 
            key = {rowID + '-' + colID} ></div> 
          ))
        ))}
        
      </div>
    );
  }
}

export default Board;