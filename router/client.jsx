const React = require('react');
const ReactDOM = require('react-dom');
const {hot} = require('react-hot-loader/root');

import Games from './Games';

const Hot = hot(Games);


ReactDOM.render(<Hot />, document.querySelector('#root'));