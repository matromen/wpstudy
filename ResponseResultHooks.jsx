import React, {memo, useState} from 'react';

const ResponseResultHooks = memo((props) => {
    // const [resultTime, setResultTime] = useState(props.resultTime);  //부모의 배열값은 useState로 안됨.
    
    
    return (
        <>
            <div>평균시간: {props.resultTime.reduce((acc, time)=> acc + time)/props.resultTime.length}ms</div>
        </>
    );
    
}); 

export default ResponseResultHooks;