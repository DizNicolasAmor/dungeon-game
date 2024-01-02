import React from 'react';
import { createRoot } from 'react-dom';
import GameContainer from './game/GameContainer';

const container = document.getElementById('root');
const root = createRoot(container);

if (root) {
    root.render(<GameContainer />);
}
