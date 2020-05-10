import React, {memo, useState} from 'react';

const TryHooks = memo((props)=>{ 
// const TryHooks = ({tryInfo})=>{   //props. 생략 가능


    // 부모의 props는 자식에서 변경이 불가 하여 아래처럼 값을 복사하여 새변수에서 처리 한다.
    // const [result, setResult] = useState(props.tryInfo.try.result);

    // const onclick = () => {
    //     setResult('3');
    // }

    return (
        <>
            <li>
                <b>{props.tryInfo.try}</b> - {props.tryInfo.result}.
                {/* <div onClick={onclick}></div> */}
            </li>
        </>
    );
});

export default TryHooks;