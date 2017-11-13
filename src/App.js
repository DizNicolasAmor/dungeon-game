import React from 'react';
import Stats from './Stats';
import Board from './Board';

let rows = 20,
    columns = 40;

let probability = function(num){
  num = num*100;
  let randomBetween0and100 = Math.floor(Math.random()*100);
  if(randomBetween0and100 < num)  return true;
  else  return false;
}


class App extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      board: [],
      playerPosition: {row: 0, column: 2},
      health: 100,
      level: 1,
      exp: 0,
      attack: 10,
      dungeon: 1,
      isGameOn: true,
      result: ''
    }
    this.keyPressHandler = this.keyPressHandler.bind(this);
    this.reset = this.reset.bind(this);
  }

  //auxiliar function used when update the board
  arrayClone(arr){
    return JSON.parse(JSON.stringify(arr));
  }

  createBoard(){
    let newBoard = [],
        items = ['weapon', 'health', 'enemy', 'weapon', 'health', 'enemy', 'weapon', 'health', 'enemy', 'weapon', 'health', 'enemy', 'weapon', 'health', 'enemy', 'weapon', 'health', 'enemy', 'weapon', 'health', 'enemy', 'weapon', 'health', 'enemy', 'weapon', 'health', 'enemy', 'weapon', 'health', 'enemy'],
        itemIndex = 0;
    
    //create and fill board
    for(let i=0; i < rows; i++){
      let rowArr = [];
      for(let j=0; j < columns; j++){
        //set walls in columns that are multiple of three
        if( j % 3 === 0){
          if( probability(0.60) )  rowArr[j] = 'wall';
          else  rowArr[j] = 'available';
        }
        //add items randomly in columns that are multiple of 5 and 7
        else if( itemIndex < items.length && j % 5 === 0 && probability(0.20) ){
          rowArr[j] = items[itemIndex];
          itemIndex++;
        }
        else if( itemIndex < items.length && j % 7 === 0 && probability(0.20) ){
          rowArr[j] = items[itemIndex];
          itemIndex++;
        }
        //else:  available cells
        else  rowArr[j] = 'available';

        //set player and door
        if( i === 0) rowArr[2] = 'player';
        if( i === 19) rowArr[37] = 'door';
      }
      newBoard.push(rowArr);
    }

    
    //set initial darkness
    newBoard = newBoard.map( (row, rowID) => {
      return row.map( (cell, columnID) => {
        if( rowID < 3 && columnID < 5 ){  //this is where player starts
          if( rowID === 2 && (columnID === 0 || columnID === 4) )  cell = cell + ' darkness';  //border radius darkness
          else  cell = cell + ' noDarkness';
        }  
        else  cell = cell + ' darkness';
        return cell;
      });
    });

    this.setState({board: newBoard});
  }
  
  keyPressHandler(e){
    if(this.state.isGameOn){
  //    event.preventDefault();
      let updatedBoard = this.state.board,
          nextPosition = {
        row: this.state.playerPosition.row,
        column: this.state.playerPosition.column
      };

      switch(e.key){
        default: break;
        case "ArrowUp":
          nextPosition.row = nextPosition.row - 1;
          break;
        case "ArrowRight":
          nextPosition.column = nextPosition.column + 1;
          break;
        case "ArrowDown":
          nextPosition.row = nextPosition.row + 1;
          break;
        case "ArrowLeft":
          nextPosition.column = nextPosition.column - 1;
          break;
      }

      if (nextPosition.column < 0 || nextPosition.column > columns - 1 || 
          nextPosition.row < 0 || nextPosition.row > rows - 1){
        return;
      }

      let updateDarkness = () => {
        //set all noDarkness cells to darkness
        for(let i = this.state.playerPosition.row - 2; i <= this.state.playerPosition.row + 2; i++){
          for(let j = this.state.playerPosition.column - 2; j <= this.state.playerPosition.column+ 2; j++){
            if( i > -1 && j > -1 && i < 20 && j < 40 ){
              updatedBoard[i][j] = updatedBoard[i][j].split(' ')[0] + ' darkness';
            }
          }
        }
        //set the player and his new neightboards from darkness to noDarkness
        for(let i = nextPosition.row - 2; i <= nextPosition.row + 2; i++){
          for(let j = nextPosition.column - 2; j <= nextPosition.column+ 2; j++){
            if( i > -1 && j > -1 && i < 20 && j < 40 ){
              //border radius darkness
              if( i === nextPosition.row - 2 && j === nextPosition.column - 2 ) continue;
              if( i === nextPosition.row - 2 && j === nextPosition.column + 2 ) continue;
              if( i === nextPosition.row + 2 && j === nextPosition.column - 2 ) continue;
              if( i === nextPosition.row + 2 && j === nextPosition.column + 2 ) continue;
              //the rest: noDarkness
              updatedBoard[i][j] = updatedBoard[i][j].split(' ')[0] + ' noDarkness';
            }
          }
        }
        
      }
      
      switch(this.state.board[nextPosition.row][nextPosition.column]){
        default: break;
        case "available noDarkness":
          updatedBoard[this.state.playerPosition.row][this.state.playerPosition.column] = 'available noDarkness';
          updatedBoard[nextPosition.row][nextPosition.column] = 'player noDarkness';

          updateDarkness();
          
          this.setState({
            board: updatedBoard,
            playerPosition: nextPosition
          });
          break;

        case "wall noDarkness":  break;

        case "health noDarkness":
          updatedBoard[this.state.playerPosition.row][this.state.playerPosition.column] = 'available noDarkness';
          updatedBoard[nextPosition.row][nextPosition.column] = 'player noDarkness';
          updateDarkness();
          this.setState({
            board: updatedBoard,
            playerPosition: nextPosition,
            health: this.state.health + 10
          });
          break;

        case "weapon noDarkness":
          updatedBoard[this.state.playerPosition.row][this.state.playerPosition.column] = 'available noDarkness';
          updatedBoard[nextPosition.row][nextPosition.column] = 'player noDarkness';
          updateDarkness();
          this.setState({
            board: updatedBoard,
            playerPosition: nextPosition,
            attack: this.state.attack + this.state.dungeon
          });
          break;

        case "enemy noDarkness":
          let enemyLife = 20 * this.state.dungeon;

          while( enemyLife > 0 && this.state.health > 0){
            enemyLife = enemyLife - this.state.attack * Math.floor(Math.random()*4 / 2);
            if( enemyLife > 0){
              this.setState({
                health: this.state.health - Math.floor(Math.random()*10)
              });
              if(this.state.health < 1){
                this.setState({
                  isGameOn: false,
                  result: 'GAME OVER'
                });
              }
            }
          }

          updatedBoard[this.state.playerPosition.row][this.state.playerPosition.column] = 'available noDarkness';
          updatedBoard[nextPosition.row][nextPosition.column] = 'player noDarkness';
          updateDarkness();
          this.setState({
            board: updatedBoard,
            playerPosition: nextPosition,
            exp: this.state.exp + 1
          });

          if(this.state.exp > 9){
            this.setState({
              level: this.state.level + 1,
              exp: this.state.exp - 10
            });
          }
          
          break;

        case "door noDarkness":
          this.createBoard();
          if(this.state.dungeon === 2){
            let finalBoard = this.state.board;
            finalBoard[19][37] = 'boss noDarkness';
            this.setState({board: finalBoard});
          }
          nextPosition.row = 0;
          nextPosition.column = 2;
          updateDarkness();
          this.setState({
            playerPosition: {row: 0, column: 2},
            dungeon: this.state.dungeon + 1
          });
          break;

        case "boss noDarkness":
          let bossLife = 200;
          while( bossLife > 0 && this.state.health > 0){
            bossLife = bossLife - this.state.attack * Math.floor(Math.random()*4 / 2);
            if( bossLife > 0){
              this.setState({health: this.state.health - Math.floor(Math.random()*40) });
            }
          }
          
          if(this.state.health < 1){
            this.setState({
              isGameOn: false,
              result: 'GAME OVER'
            });
            break;
          }

          if(bossLife < 1){
            updatedBoard[this.state.playerPosition.row][this.state.playerPosition.column] = 'available noDarkness';
            updatedBoard[nextPosition.row][nextPosition.column] = 'player noDarkness';
            updateDarkness();
            this.setState({
              isGameOn: false,
              result: 'YOU WON!!!',
              board: updatedBoard,
              playerPosition: nextPosition,
              exp: this.state.exp + 1
            });
            break;
          }

      }
    }
  }
  
  reset(){
    this.createBoard();
    this.setState({
      playerPosition: {row: 0, column: 2},
      health: 100,
      level: 1,
      exp: 0,
      attack: 10,
      dungeon: 1,
      isGameOn: true,
      result: ''
    });
  }
  
  componentDidMount(){
    this.createBoard();
    window.addEventListener('keydown', this.keyPressHandler);
  }
  
  componentWillUnmount() {
    window.addEventListener('keydown', this.keyPressHandler);
  }
  
  render() {
    return (
      <div>
        <h1 className="container">Dungeon Game</h1>
        <Stats 
          health={this.state.health}
          level={this.state.level}
          exp={this.state.exp}
          attack={this.state.attack}
          dungeon={this.state.dungeon}
          isGameOn={this.state.isGameOn}
          result={this.state.result}
          reset={this.reset}/>
        <Board board={this.state.board}/>
      </div>
    );
  }
}

export default App;
