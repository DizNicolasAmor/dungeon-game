import React from 'react';
import Stats from './components/Stats';
import Board from './components/Board';
import {
	totalRows,
	totalColumns,
	createBoard,
	setNextPosition,
	updateBoard
} from './utils/utils';

class GameContainer extends React.Component {
	helpers = {
		moveToCell: (currentBoard, currentPosition, nextPosition) => {
			const { playerPosition } = this.state;
			const updatedBoard = updateBoard(currentBoard, playerPosition, nextPosition);
			updatedBoard[currentPosition.row][currentPosition.column] = 'available noDarkness';
			updatedBoard[nextPosition.row][nextPosition.column] = 'player noDarkness';
			this.setState({
				board: [...updatedBoard],
				playerPosition: { ...nextPosition }
			});
		},

		pickWeapon: () => {
			const { dungeon } = this.state;
			this.setState(prevState => ({
				attack: prevState.attack + dungeon
			}));
		},

		updatePlayerLife: (value) => {
			this.setState(prevState => ({ health: prevState.health + value }));
		},

		gainExperience: () => {
			this.setState(prevState => ({ exp: prevState.exp + 1 }));
		},

		fightAgainst: (currentAdversary, adversaryPosition) => {
			const {
				health,
				attack,
				dungeon,
				board,
				playerPosition,
				exp
			} = this.state;
			const isBoss = currentAdversary === 'boss';
			const playerAttack = Math.floor((Math.random() * attack)) + 1;
			let adversaryLife = isBoss ? 150 : (20 * dungeon);
			const adversaryAttackMax = isBoss ? 25 : 10;
			const adversaryAttack = Math.floor((Math.random() * adversaryAttackMax)) + 1;

			while(adversaryLife > 0 && health > 0) {
				adversaryLife -= playerAttack;
				if(adversaryLife > 0)
					this.helpers.updatePlayerLife(-adversaryAttack);
				this.helpers.checkIfPlayerIsAlive();
			}

			this.helpers.moveToCell(board, playerPosition, adversaryPosition);
			this.helpers.gainExperience();

			if(exp > 9)
				this.helpers.levelUp();
			if(isBoss && health > 0)
				this.helpers.playerWon(board, playerPosition, adversaryPosition);
		},

		goToNextDungeon: () => {
			const {
				dungeon
			} = this.state;
			this.setBoard();
			this.setState(prevState => ({
				playerPosition: { row: 0, column: 2 },
				dungeon: prevState.dungeon + 1
			}), () => {
				const {
					finalBoard,
					board
				} = this.state;
				if(dungeon === finalBoard) {
					board[19][37] = 'boss noDarkness';
					this.setState({ board });
				}
			});
		},

		levelUp: () => {
			this.setState(prevState => ({
				level: prevState.level + 1,
				exp: prevState.exp - 10
			}));
		},

		checkIfPlayerIsAlive: () => {
			const { health } = this.state;
			if(health < 1) {
				this.setState({
					isGameOn: false,
					result: 'GAME OVER'
				});
			}
		},

		playerWon: (currentBoard, currentPosition, nextPosition) => {
			const { health } = this.state;
			if(health > 0) {
				const board = [...currentBoard];
				board[currentPosition.row][currentPosition.column] = 'available noDarkness';
				board[nextPosition.row][nextPosition.column] = 'player noDarkness';
				this.setState({
					isGameOn: false,
					result: 'YOU WON!!!',
					board,
					playerPosition: { ...nextPosition }
				});
			}
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			board: [],
			playerPosition: { row: 0, column: 2 },
			health: 100,
			level: 1,
			exp: 0,
			attack: 10,
			dungeon: 1,
			isGameOn: true,
			result: '',
			finalBoard: 2
		};
	}

	componentDidMount() {
		this.setBoard();
		window.addEventListener('keydown', this.keyPressHandler);
	}

	componentWillUnmount() {
		window.addEventListener('keydown', this.keyPressHandler);
	}

	setBoard = () => {
		this.setState({ board: createBoard() });
	}

	keyPressHandler = (event) => {
		event.preventDefault();
		const {
			isGameOn,
			board,
			playerPosition
		} = this.state;

		if(isGameOn) {
			const nextPosition = setNextPosition(event.key, playerPosition);
			const isInvalidPosition = nextPosition.column < 0 || nextPosition.column > totalColumns - 1
				|| nextPosition.row < 0 || nextPosition.row > totalRows - 1;

			const nextCellValue = isInvalidPosition ? 'invalid' : board[nextPosition.row][nextPosition.column];

			switch(nextCellValue) {
				case 'available noDarkness':
					this.helpers.moveToCell(board, playerPosition, nextPosition);
					break;
				case 'wall noDarkness':
					break;
				case 'health noDarkness':
					this.helpers.updatePlayerLife(+10);
					this.helpers.moveToCell(board, playerPosition, nextPosition);
					break;
				case 'weapon noDarkness':
					this.helpers.pickWeapon();
					this.helpers.moveToCell(board, playerPosition, nextPosition);
					break;
				case 'door noDarkness':
					this.helpers.goToNextDungeon();
					break;
				case 'enemy noDarkness': {
					this.helpers.fightAgainst('enemy', nextPosition);
					break;
				}
				case 'boss noDarkness': {
					this.helpers.fightAgainst('boss', nextPosition);
					break;
				}
				default:
					break;
			}
		}
	}

	reset = () => {
		this.setState({
			board: createBoard(),
			playerPosition: { row: 0, column: 2 },
			health: 100,
			level: 1,
			exp: 0,
			attack: 10,
			dungeon: 1,
			isGameOn: true,
			result: ''
		});
	}

	render() {
		const {
			health,
			level,
			exp,
			attack,
			dungeon,
			isGameOn,
			result,
			board
		} = this.state;

		return (
			<div>
				<Stats
					health={health}
					level={level}
					exp={exp}
					attack={attack}
					dungeon={dungeon}
					isGameOn={isGameOn}
					result={result}
					reset={this.reset}
				/>
				<Board board={board} />
			</div>
		);
	}
}

export default GameContainer;
