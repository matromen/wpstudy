import React, {PureComponent} from 'react';
import LottoWinBalls from './LottoWinBalls';
import LottoWinBallsFunctional from './LottoWinBallsFunctional';
import BonusBall from './BonusBall';

function getNumbers(){
    let candidate = Array(45).fill().map((d, i)=>i+1);
    let suffle = [];
    for(let i=0; i<6; i+=1){
        suffle.push(candidate.splice(Math.floor(Math.random()*(candidate.length)),1)[0]);
    }
    // suffle.push(Array(45).fill().map((d)=>{return candidate.splice(Math.floor(Math.random()*(candidate.length)),1)[0]}));  // map의한 return 배열1개가 통째로 push됨
    
    console.log(suffle);
    return suffle;
}
 

class Lotto extends PureComponent{
    constructor(props){
        super(props);

        this.state = {
            winNumbers: getNumbers(),
            winBalls: [],
            bonusBall: null,
            redo: false
        }
    }
    
    setTimes = [];

    secondInit = () => {
        for(let i=0; i<6; i+=1){
            this.setTimes[i] = setTimeout(()=>{
                this.setState(
                    (prevState) => {
                        return { 
                            winBalls: [...prevState.winBalls, this.state.winNumbers[i]]
                        }
                    }
                );
            },1000*(i+1));
        }
        this.setTimes[6] = setTimeout(()=>{
            this.setState({
                bonusBall: this.state.winNumbers[this.state.winNumbers.length-1],
                redo: true
            });
        },7000);

    }

    componentDidMount(){  //첫 랜더링 후
       this.secondInit();
    }

    componentDidUpdate(prevProps, prevState){  //재 랜더링 후
        console.log('this.setTimes.length ', this.setTimes.length);
        if(this.setTimes.length === 0){
            this.secondInit();
        }
    }

    componentWillUnmount(){ //component 해지 직전
        this.setTimes.map((d, i)=>{clearTimeout(d)});
    } 

    reload = () => {
        this.setState({
            winNumbers: getNumbers(),
            winBalls: [],
            bonusBall: null,
            redo: false
        });   

        this.setTimes = [];

    }

    render(){
        return (
            <>
                <div>당첨 숫자</div>
                <div id='결과창'>
                    {
                        this.state.winBalls.map((d, i)=>
                            <LottoWinBallsFunctional key={i} ball={d} />   
                    )}
                </div>
                
                <div id='보너스볼'>
                    {this.state.bonusBall &&
                        <BonusBall ball={this.state.bonusBall} />
                    }
                    {this.state.redo && <button onClick={this.reload}>재시작</button>}
                </div>
            </>
           
        );
    }
}

export default Lotto;