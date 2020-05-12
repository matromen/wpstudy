import React, {memo, useState} from 'react';

const TryHooks = memo((props)=>{ 
// const TryHooks = ({tryInfo})=>{   //props. 생략 가능


    // 부모의 props는 자식에서 변경이 불가 하여 아래처럼 값을 복사하여 새변수에서 처리 한다.
    // const [result, setResult] = useState(props.tryInfo.try.result);

    // const onclick = () => {
    //     setResult('3');
    // }
    // const [tryInfo, setTryInfo] = useState(props.tryInfo);    <------ 객체는 useState로 받으나, 배열은 받지 못함..... ResponseResultHooks.jsx
    const [result, setResult] = useState(props.tryInfo.result);
    const [inputValue, setInputValue] = useState(props.tryInfo.inputValue);
    // console.log('1tryInfo : ', props.tryInfo);  
    // console.log('2tryInfo : ', tryInfo);
    console.log('1: ', props.tryInfo.inputValue);
    console.log('1: ', props.tryInfo.result);
    // setResult(33);                <--------------무한루프 값변경시 전체 함수를 실행
    // setInputValue(3);
    console.log('2: ', inputValue);
    console.log('2: ', result);
    return (
        <>
            <li>
                <b>{props.tryInfo.inputValue}</b> - {props.tryInfo.result}.
                {/* <div onClick={onclick}></div> */}
            </li>

            <li>
                <b>{inputValue}</b> - {result}.
                {/* <div onClick={onclick}></div> */}
            </li>            
        </>
    );
});

export default TryHooks;