import React, {useState, useRef, memo} from 'react';
import TryHooks from './TryHooks';


//this를 안쓰기 위해 class 밖으로...
function getNumbers(){
    const candidate = [0,1,2,3,4,5,6,7,8,9];
    const chosen = [];


    for(let i=0; i<4; i+=1){
        chosen.push(candidate.splice(Math.floor(Math.random()*(candidate.length)),1)[0]);
    }

    return chosen;
}

// 자식이 memo 나 pureComponent등으로 되어 있으면 부모도 처리 한다.
const NumberbaseballHooks = memo(() => {
    const [answer, setAnswer] = useState(getNumbers());
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');
    const [tries, setTries] = useState([]);
    const inputRef = useRef(null);

    const onchange = (e) =>{
        setInputValue( e.target.value);
    }


    const onsubmit = (e) => {
        e.preventDefault();

        if(inputValue === answer.join('')){
            setResult('홈런');
            setTries((prevTries)=>
                [...prevTries, {try: inputValue, result: '홈런'}]
            );

            alert('게임을 다시 시작 합니다.');

            setAnswer(getNumbers());
            setInputValue('');
            setTries([]);
;
        }else{
            const answerArray = inputValue.split('').map(d=> parseInt(d));
            let strike = 0;
            let ball = 0;

            if(tries.length >= 9 ){
                setResult(`10번 넘개 틀려서 실패: 답은 ${answer.join(',')} 입니다.` );

                alert('게임을 다시 시작 합니다.');

                setAnswer(getNumbers());
                setInputValue('');
                setTries([]);

            }else{
                for(let i=0; i<4; i++){
                    if(answerArray[i] === answer[i]){
                        strike += 1;
                    }else if((answer).includes(answerArray[i])){
                        ball += 1;
                    }
                }

                setTries((prevTries)=>
                    [...prevTries, {try: inputValue, result: `${strike}스트라이크, ${ball}볼 입니다.`}]
                );
                setInputValue('');
                setResult(`${strike}스트라이크, ${ball}볼 입니다.`);
            }
        }
    }
    
    
    return (
        <>
        {console.log(answer)}
        <h1>{result}</h1>
        <form onSubmit={onsubmit}>
            <input type='text' ref={inputRef} maxLength={4} value={inputValue} onChange={onchange} />
        </form>
        <div>시도: {tries.length}</div>
        <ul>
            {
                tries.map((d, i)=>{
                    return <TryHooks key={`${i+1}차 시도 :`} tryInfo={d} />
                })
            }
        </ul>
    </>
    );
});

export default NumberbaseballHooks;