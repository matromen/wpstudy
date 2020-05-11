import React, {Component} from 'react';
import ResponseResult from './ResponseResult';

class ResponseCheck extends Component{
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        resultTime: []
    }


    nowSettimeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const {state} = this.state;
        
        if(state === 'waiting'){
            this.setState({
                state: 'ready',
                message: '초록색이되면 클릭하세요.'
            });

            this.nowSettimeout= setTimeout(()=>{
                this.setState({
                    state: 'now',
                    message: '클릭하세요.'
                });
                this.startTime = Date.now();
                }, 
                Math.floor(Math.random()*1000) + 2000
            );
        }else if(state === 'now'){
            this.endTime = Date.now();
            this.setState((prevState)=>{
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요.',
                    resultTime: [...prevState.resultTime, (this.endTime-this.startTime)]
                }
            });
        }else if(state === 'ready'){
            clearTimeout(this.nowSettimeout);
            this.setState({
                state: 'waiting',
                message: '성급하시군요. 클릭해서 사용하세요.'
            });
        }

    }

    resetOnclick = () => {
        this.setState({
            resultTime: []
        });
    }

    clickAverage = () => {
        const {resultTime} = this.state;

        // jsx에서 tag가 없다는 것은 null로 표현
        // return resultTime.length !== 0 ? 
        // <div>평균시간: {resultTime.reduce((acc, time)=> acc + time)/resultTime.length}ms<button onClick={this.resetOnclick}>리셋</button></div> : null;   

        return <ResponseResult resultTime={resultTime} resetOnclick={this.resetOnclick} />
    }

    render(){
        const {state, message, resultTime} = this.state;

        return (
            <>
                <div id='screen' className={state} onClick={this.onClickScreen}>
                    {message}
                </div>
                <div>{resultTime[resultTime.length-1]}ms</div>
                {this.clickAverage()}
            </>
        );
    }
}

export default ResponseCheck;