import React from 'react';
import PropTypes from 'prop-types';
import BoardContainer from '../styles/board';

const Board = ({ board }) => (
	<div>
		<BoardContainer>
			{board.map((eachRow, rowID) => (
				eachRow.map((eachCell, colID) => {
					const currentKey = `${rowID}-${colID}`;
					return <div className={`cell ${eachCell}`} key={currentKey} />;
				})
			))}
		</BoardContainer>
	</div>
);

Board.propTypes = {
	board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
};

export default Board;
