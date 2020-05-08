const React = require('react');
const reactDOM = require('react-dom');

const WordRelay = require('./WordRelay');
const Gugudan = require('./Gugudan');
const GugudanHooks = require('./GugudanHooks');


reactDOM.render(<WordRelay />, document.querySelector('#root'));
reactDOM.render(<Gugudan />, document.querySelector('#root2'));
reactDOM.render(<GugudanHooks />, document.querySelector('#root3'));