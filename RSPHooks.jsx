import React, {useState, useRef, useEffect} from 'react';

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


const RSPHooks = () => {
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState('');

    const interval = useRef(null);


    /// Hooks에서는 class의 componentDidMount처럼 수동 시작을 할수가 없다. 왜냐면 함수전체가 render대상 이다.
    // const start = () => {
    //     interval.current = setInterval(changeHand ,2000);
    // }

    useEffect(() => {                                                  //componentDidMount, componentDidUpdate
        interval.current = setInterval(changeHand, 2000);
        return () => {                                                 //componentWillUnmount
            clearInterval(interval.current);
        }
    }, [imgCoord]);
    
    const changeHand = ()=>{
        if(imgCoord === rspCoords['바위']){
            setImgCoord(rspCoords['가위']);
        }else if(imgCoord === rspCoords['가위']){
            setImgCoord(rspCoords['보']);
        }else{
            setImgCoord(rspCoords['바위']);
        }
    }


    const onClickBtn = (choice) => (e) => {
        clearInterval(interval.current);

        const myScores = scores[choice];
        const computerScores = scores[Object.entries(rspCoords).find((d, i)=> { return d[1]===imgCoord; })[0] ];

        const diff = myScores - computerScores;
        if(diff === 0){
            setResult('비겼음');
            setScore(
                (prevScore) => {
                    return prevScore + 0;
                }
            );
            
        }else if([-1, 2].includes(diff)){
            setResult('이겼습니다');
            setScore(
                (prevScore) => {
                    return prevScore + 1;
                }
            );

        }else{
            setResult('졌습니다.');
            setScore(
                (prevScore) => {
                    return prevScore - 1;
                }
            );
        }

        setTimeout(()=>{interval.current = setInterval(changeHand,100)}
        ,2000);
    }



    return (
        <>
            <div id='computer' style={{width:'142px', height:'200px', background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
            <div>
                {/* <button id='rock' className='btn' onClick={()=>this.onClickBtn('바위')}>바위</button> */}
                <button id='rock' className='btn' onClick={onClickBtn('바위')}>바위</button>
                <button id='scissor' className='btn' onClick={onClickBtn('가위')}>가위</button>
                <button id='paper' className='btn' onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
}


export default RSPHooks; 