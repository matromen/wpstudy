const React = require('react');
const ReactDOM = require('react-dom');
const {hot} = require('react-hot-loader/root');

import Tictactoe from './Tictactoe';

const Hot = hot(Tictactoe);


ReactDOM.render(<Hot />, document.querySelector('#root'));