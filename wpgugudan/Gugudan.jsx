const React = require('react');
const {Component} = React;

class Gugudan extends Component{
    state = {
        first: Math.ceil(Math.random()*9),
        second: Math.ceil(Math.random()*9),
        inputValue: '',
        result: ''
    }

    onchange = (e)=>{
        this.setState(
            {
                inputValue : e.target.value
            }
        );
    }

    onsubmit = (e)=>{
        e.preventDefault();

        if(parseInt(this.state.inputValue) === this.state.first*this.state.second){
            this.setState(
                (prevState)=>{
                    return {
                        result: '정답.' + prevState.inputValue,
                        first: Math.ceil(Math.random()*9),
                        second: Math.ceil(Math.random()*9),
                        inputValue: ''
                    };
                }
            );
            this.input.focus();
        }else{
            this.setState(
                {
                    result: '아닙니다.',
                    inputValue: ''
                }
            );
            this.input.focus();
        }
    }


    inputRef = (c)=>this.input = c;
    input;
    

    render(){
        return (
            <>
                <div>{this.state.first} 곱하기 {this.state.second} ?</div>
                <form onSubmit={this.onsubmit}>
                    <input type="number" ref={this.inputRef} value={this.state.inputValue}  onChange={this.onchange} />
                    <button>입력</button>
                </form>
                <div id='result'>{this.state.result}</div>
            </>
        );
    }
}

module.exports = Gugudan;