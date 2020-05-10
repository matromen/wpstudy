import React, {PureComponent, createRef} from 'react';
import Try from './Try';



//this를 안쓰기 위해 class 밖으로...
function getNumbers(){
    const candidate = [0,1,2,3,4,5,6,7,8,9];
    const chosen = [];


    for(let i=0; i<4; i+=1){
        chosen.push(candidate.splice(Math.floor(Math.random()*(candidate.length)),1)[0]);
    }

    return chosen;
}


class Numberbaseball extends PureComponent{
    state = {
        answer: getNumbers(),
        inputValue: '',
        result: '',
        tries: []
    }

    onchange = (e) =>{
        this.setState({
            inputValue: e.target.value
        })
    }

    onsubmit = (e) => {
        e.preventDefault();

        if(this.state.inputValue === this.state.answer.join('')){
            this.setState(
                (prevState) => {
                    return {
                        result: '홈런',
                        tries: [...prevState.tries, {try: this.state.inputValue, result: '홈런'} ],
                    };
                }
            );
            alert('게임을 다시 시작 합니다.');
            this.setState({
                inputValue: '',
                answer: getNumbers(),
                tries: []
            });
        }else{
            const answerArray = this.state.inputValue.split('').map(d=> parseInt(d));
            let strike = 0;
            let ball = 0;

            if(this.state.tries.length >= 9 ){
                this.setState({
                    result: `10번 넘개 틀려서 실패: 답은 ${this.state.answer.join(',')} 입니다.` 
                });

                alert('게임을 다시 시작 합니다.');

                this.setState({
                    inputValue : '',
                    answer: getNumbers(),
                    tries: []
                });
            }else{
                for(let i=0; i<4; i++){
                    if(answerArray[i] === this.state.answer[i]){
                        strike += 1;
                    }else if((this.state.answer).includes(answerArray[i])){
                        ball += 1;
                    }
                }

                this.setState(
                    (prevState) => {
                        return  {
                            tries: [...prevState.tries, {try: this.state.inputValue, result: `${strike}스트라이크, ${ball}볼 입니다.`}],
                            inputValue: '',
                            result: `${strike}스트라이크, ${ball}볼 입니다.`
                        };
                    }
                );
            }
        }
        this.inputRef.current.focus();
    }
    
    inputRef = createRef();
    // inputRef = (c) => this.input = c;
    // input;

    // fruite = [
    //     {name: '사과', taste: '맛있다'},
    //     {name: '사과2', taste: '맛있다'},
    //     {name: '사과3', taste: '맛있다'},
    //     {name: '사과4', taste: '맛있다'},
    //     {name: '사과7', taste: '맛있다'},
    // ]

    render(){
        return (
            <>
                {console.log('111 ', this.state.answer)}
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onsubmit}>
                    <input type='text' ref={this.inputRef} maxLength={4} value={this.state.inputValue} onChange={this.onchange} />
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {/* {
                        this.fruite.map((d, i)=>{
                            return <li key={i}><b>{d.name}</b> - {d.taste}.</li>
                        })
                    } */}

                    {/*분리 Try */}
                    {/* {
                        this.fruite.map((d, i)=>{
                            return <Try key={i} d={d} i={i} />
                        })
                    } */}

                    {
                        this.state.tries.map((d, i)=>{
                            return <Try key={`${i+1}차 시도 :`} tryInfo={d} />
                        })
                    }
                </ul>
            </>
        );
    }
}

export default Numberbaseball;