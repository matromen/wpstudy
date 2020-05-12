import React, {memo, useState} from 'react';

const ResponseResultHooks = (props) => {
    const temp = props.resultTime;
    const [resultTime, setResultTime] = useState(temp);
    
    console.log(props.resultTime);
    console.log(temp);
    const resetOnclick = () => {
        setResultTime([]);
    }

    return (
        <>
            {resultTime.length !== 0 ? 
            <><div>평균시간: {resultTime.reduce((acc, time)=> acc + time)/resultTime.length}ms</div><button onClick={resetOnclick}>리셋</button></> : null}   
        </>
    );
    
} 

export default ResponseResultHooks;