export const totalRows = 20;

export const totalColumns = 40;

const probability = num => (Math.floor(Math.random() * 100)) < (num * 100);
const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)];
const generateRandomArray = (arr, length) => {
	const newArr = [];
	for(let i = 0; i < length; i += 1)
		newArr.push(getRandomItem(arr));
	return newArr;
};

export const createBoard = () => {
	let newBoard = [];
	const itemsQuantity = 30;
	const itemsType = ['weapon', 'health', 'enemy'];
	const items = generateRandomArray(itemsType, itemsQuantity);
	let itemIndex = 0;

	// create and fill board
	for(let i = 0; i < totalRows; i += 1) {
		const rowArr = [];
		for(let j = 0; j < totalColumns; j += 1) {
			if(j % 3 === 0) { // set walls in columns that are multiple of three
				if(probability(0.60))
					rowArr[j] = 'wall';
				else
					rowArr[j] = 'available';
			// add items randomly in columns that are multiple of 5 and 7
			} else if(itemIndex < items.length && j % 5 === 0 && probability(0.20)) {
				rowArr[j] = items[itemIndex];
				itemIndex++;
			} else if(itemIndex < items.length && j % 7 === 0 && probability(0.20)) {
				rowArr[j] = items[itemIndex];
				itemIndex++;
			} else
				rowArr[j] = 'available';

			// set player and door
			if(i === 0)
				rowArr[2] = 'player';
			if(i === 19)
				rowArr[37] = 'door';
		}
		newBoard.push(rowArr);
	}

	// set darkness
	newBoard = newBoard.map((row, rowID) => (
		row.map((cell, columnID) => {
			if(rowID < 3 && columnID < 5) { // position where player starts
				if(rowID === 2 && (columnID === 0 || columnID === 4)) // border radius darkness
					cell = `${cell} darkness`; // eslint-disable-line no-param-reassign
				else
					cell = `${cell} noDarkness`; // eslint-disable-line no-param-reassign
			} else
				cell = `${cell} darkness`; // eslint-disable-line no-param-reassign
			return cell;
		})
	));

	return newBoard;
};

export const setNextPosition = (eventKey, currentPosition) => {
	switch(eventKey) {
		default:
			return currentPosition;
		case 'ArrowUp':
			return ({
				...currentPosition,
				row: currentPosition.row - 1,
			});
		case 'ArrowRight':
			return ({
				...currentPosition,
				column: currentPosition.column + 1
			});
		case 'ArrowDown':
			return ({
				...currentPosition,
				row: currentPosition.row + 1,
			});
		case 'ArrowLeft':
			return ({
				...currentPosition,
				column: currentPosition.column - 1
			});
	}
};

export const updateBoard = (oldBoard, currentPosition, nextPosition) => {
	const newBoard = [...oldBoard];

	// set all noDarkness cells to darkness
	for(let i = currentPosition.row - 2; i <= currentPosition.row + 2; i++) {
		for(let j = currentPosition.column - 2; j <= currentPosition.column + 2; j++) {
			if(i > -1 && j > -1 && i < 20 && j < 40)
				newBoard[i][j] = `${newBoard[i][j].split(' ')[0]} darkness`;
		}
	}
	// set noDarkness to the player and his new neightboards
	for(let i = nextPosition.row - 2; i <= nextPosition.row + 2; i++) {
		for(let j = nextPosition.column - 2; j <= nextPosition.column + 2; j++) {
			if(i > -1 && j > -1 && i < 20 && j < 40) {
				// corners must be dark
				if(!((i === nextPosition.row - 2 && j === nextPosition.column - 2)
					|| (i === nextPosition.row - 2 && j === nextPosition.column + 2)
					|| (i === nextPosition.row + 2 && j === nextPosition.column - 2)
					|| (i === nextPosition.row + 2 && j === nextPosition.column + 2)))
					newBoard[i][j] = `${newBoard[i][j].split(' ')[0]} noDarkness`;
			}
		}
	}
	return newBoard;
};
