const React = require('react');
const reactDOM = require('react-dom');
const {hot} = require('react-hot-loader/root');

const WordRelay = require('./WordRelay');
const WordRelayHooks = require('./WordRelayHooks');
const Gugudan = require('./Gugudan');
const GugudanHooks = require('./GugudanHooks');
import NumberBaseball from './Numberbaseball';
import NumberBaseballHooks from './NumberbaseballHooks';
import ResponseCheck from  './ResponseCheck';
import ResponseCheckHooks from  './ResponseCheckHooks';


const Hot = hot(ResponseCheckHooks);

reactDOM.render(<Hot />, document.querySelector('#root'));
// reactDOM.render(<WordRelayHooks />, document.querySelector('#root1'));
// reactDOM.render(<Gugudan />, document.querySelector('#root2'));
// reactDOM.render(<GugudanHooks />, document.querySelector('#root3'));
