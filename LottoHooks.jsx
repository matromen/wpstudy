import React, {Component, useState, useRef, useEffect, useMemo, useCallback} from 'react';
import LottoWinBallsFunctional  from './LottoWinBallsFunctional';
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

const LottoHooks = () => {
    
    const memoGetNumbers = useMemo(()=>getNumbers(), []);  // 2번째 인자값(state)이 있다면 값의 변화가 있다면 실행
    const [winNumbers, setWinNumbers] = useState(memoGetNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonusBall, setBonusBall] = useState(null);
    const [redo, setRedo] = useState(false);
    
    let setTimes = useRef([]);



    const secondInit = () => {
        for(let i=0; i<6; i+=1){
            setTimes.current[i] = setTimeout(()=>{
                setWinBalls(
                    (prevWinBalls) => {
                        return  [...prevWinBalls, winNumbers[i]]
                    }
                );
            },1000*(i+1));
        }
        setTimes.current[6] = setTimeout(()=>{
            setBonusBall(
                winNumbers[winNumbers.length-1]
            );
            setRedo(true);
        },7000);

    }


    useEffect(() => {
        console.log('useEffect');
        secondInit();
        console.log('useEffect2');
        return () => {
            setTimes.current.forEach( (d) => clearTimeout(d));
        }
    }, [setTimes.current])   // 2번째 인자의 값의(state or ref값이든 상관 없음) 변화가 있으면 componentDidUpdate개념이 발생함.


    const reload = useCallback(() => {  //정의 : 함수를 기억하고 있어 reredering시 영향을 받지 않음, rendering에 의해 변경된 state 값을 인지하지 못함.
        setWinNumbers(getNumbers());    //useCallback은 해당 함수를 props로 사용될때 부모의 rerendering시 
        setWinBalls([]);                //해당함수가 같이 재 생성함에 따라 자식요소에 전달된 함수 또한 필요 없이 재 랜더링 됨
        setBonusBall(null);             //이럴때는 useCallback을 사용하여 부모의 rerendering시 함수의 재생성을 막는다.
        setRedo(false);                 //자식이 <BonusBall onClick={reload} ball={bonusBall} /> 경우
        setTimes.current = [];
    // }, []);
    }, [winNumbers]);    // state요소를 2번째 안자에 넣어 값 변경시 해당 함수전체를 새로운 함수로 간주하고 재 인식함.
                            // []이나, 값의 변화가 없다면 해당 함수를 기 인식 시점에 머물러 있음.
    return (
        <>
            <div>당첨 숫자</div>
            <div id='결과창'>
                {
                    winBalls.map((d, i)=>
                        <LottoWinBallsFunctional key={i+'s'} ball={d} />   
                )}
            </div>
            
            <div id='보너스볼'>
                {bonusBall &&
                    <BonusBall ball={bonusBall} />
                }
                {redo && <button onClick={reload}>재시작</button>}
            </div>
        </>
    );
}


export default LottoHooks;