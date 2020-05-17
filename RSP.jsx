// constructor => render => ref => componentDidMount => setState/props => shouldComponenUpdate => reRedner => componentDidUpdate => (부모가 나를 없엣 때)componentWillUnmount

import React, {Component} from 'react';


const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
}

const scores = {
    바위: 0,
    가위: 1,
    보: -1
}

class RSP extends Component{
    constructor(props){
        super(props);

        this.state = {
            imgCoord: rspCoords.바위,
            result: '',
            score: 0
        }
    }

    interval;

    changeHand = ()=>{
        const {imgCoord} = this.state;

        if(imgCoord === rspCoords['바위']){
            this.setState({
                imgCoord: rspCoords['가위']
            })
        }else if(imgCoord === rspCoords['가위']){
            this.setState({
                imgCoord: rspCoords['보']
            })  
        }else{
            this.setState({
                imgCoord: rspCoords['바위']
            })
        }
    }
    /// componentDidMount() 대신에 수동으로 시작할수 있음
    // start = () => {
    //     this.interval = setInterval(this.changeHand,2000);
    // }
    componentDidMount(){  //컴포넌트가 처음 랜더링 후, 여기에 비동기 요청을 많이 함.
        this.interval = setInterval(this.changeHand,100);
    }

    componentDidUpdate(){ //컴포넌트가 재 랜더링 후

    }

    componentWillUnmount(){ //컴포넌트가 제거되기 직전, 비동기 요청을 정리를 많이 함.
        clearInterval(this.interval);
    }

    onClickBtn = (choice) => (e) => {
        clearInterval(this.interval);

        const myScores = scores[choice];
        const computerScores = scores[Object.entries(rspCoords).find((d, i)=> { return d[1]===this.state.imgCoord; })[0] ];

        const diff = myScores - computerScores;
        if(diff === 0){
            this.setState(
                (prevState) => {
                    return {
                        result: '비겼음',
                        score: prevState.score + 0
                    }
                }
            )
        }else if([-1, 2].includes(diff)){
            this.setState(
                (prevState) => {
                    return {
                        result: '이겼습니다.',
                        score: prevState.score + 1
                    }
                }
            )           
        }else{
            this.setState(
                (prevState) => {
                    return {
                        result: '졋습니다.',
                        score: prevState.score - 1
                    }
                }
            )          
        }

        setTimeout(()=>{this.interval = setInterval(this.changeHand,2000)}
        ,2000);
    }

    render(){
        const {imgCoord, result, score} = this.state;

        return (
            <>
                <div id='computer' style={{width:'142px', height:'200px', background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
                <div>
                    {/* <button id='rock' className='btn' onClick={()=>this.onClickBtn('바위')}>바위</button> */}
                    {/* <button onClick={this.start}>start</button> */}
                    <button id='rock' className='btn' onClick={this.onClickBtn('바위')}>바위</button>
                    <button id='scissor' className='btn' onClick={this.onClickBtn('가위')}>가위</button>
                    <button id='paper' className='btn' onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}


export default RSP;