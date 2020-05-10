const React = require('react');
const {Component} = React;

class WordRelay extends Component{
    state = {
        word: '끝말잇기',
        inputValue: '',
        result: ''
    }

    inputRef = (c) => this.input = c;
    input;


    onchange = (e) =>{
        this.setState(
            {
                inputValue: e.target.value
            }
        );
    }


    onsubmit = (e) => {
        e.preventDefault();
        if(this.state.word[(this.state.word).length-1] === this.state.inputValue[0]){
            this.setState(
                {
                    word: this.state.inputValue,
                    inputValue: '',
                    result: '성공'
                }
            );
            this.input.focus();

        }else{
            this.setState(
                {
                    inputValue: '',
                    result: '실패'
                }
            );
            this.input.focus();

        }
    }
    
    render(){
        return (
            <>
                <h1>{this.state.word}</h1>
                <form onSubmit={this.onsubmit}>
                    <input type='text' ref={this.inputRef} value={this.state.inputValue} onChange={this.onchange} />
                    <button>전송!!!</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }
}


module.exports = WordRelay;