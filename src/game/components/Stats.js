import React from 'react';
import Collapse from 'react-collapse';
import PropTypes from 'prop-types';
import {
	StatsContainer,
	Title,
	Button
} from '../styles/commons';

const Stats = ({
	health,
	level,
	exp,
	attack,
	dungeon,
	isGameOn,
	result,
	reset
}) => (
	<div>
		<StatsContainer>
			<Title>Dungeon Game</Title>
			<div className="data">
				<div><span>Health:</span> {health}</div>
				<div><span>Level:</span> {level}</div>
				<div><span>Exp:</span> {exp}</div>
				<div><span>Attack:</span> {attack}</div>
				<div><span>Dungeon:</span> {dungeon}</div>
			</div>
			<Button
				type="button"
				className="btn btn-submit"
				onClick={reset}
			>
				NEW GAME
			</Button>
			<Collapse isOpened={!isGameOn}>
				<Title isResult>{result}</Title>
			</Collapse>
		</StatsContainer>
	</div>
);

Stats.propTypes = {
	health: PropTypes.number.isRequired,
	level: PropTypes.number.isRequired,
	exp: PropTypes.number.isRequired,
	attack: PropTypes.number.isRequired,
	dungeon: PropTypes.number.isRequired,
	isGameOn: PropTypes.bool.isRequired,
	result: PropTypes.string.isRequired,
	reset: PropTypes.func.isRequired
};

export default Stats;
