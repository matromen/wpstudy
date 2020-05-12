import React, { useState, useRef } from 'react';
import ResponseResultHooks from './ResponseResultHooks';


const ResponseCheckHooks = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [resultTime, setResultTime] = useState([]);

    //이 값이 변경되어도 rendering이 되지 않음.
    const nowSettimeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();


    const onClickScreen = () => {
        if(state === 'waiting'){
            setState('ready');
            setMessage('초록색이되면 클릭하세요.');

            nowSettimeout.current = setTimeout(()=>{
                setState('now');
                setMessage('클릭하세요.');

                startTime.current = Date.now();
                }, 
                Math.floor(Math.random()*1000) + 2000
            );
        }else if(state === 'now'){
            endTime.current = Date.now();
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResultTime((prevResultTime)=>{
                return [...prevResultTime, (endTime.current-startTime.current)];
            });
        }else if(state === 'ready'){
            clearTimeout(nowSettimeout);
            setState('waiting');
            setMessage('성급하시군요. 클릭해서 사용하세요.');            
        }

    }



    return (
        <>
            <div id='screen' className={state} onClick={onClickScreen}>
                {message}
            </div>
            <div>{resultTime[resultTime.length-1]}ms</div>
            <ResponseResultHooks resultTime={resultTime} />
        </>
    );
}


export default ResponseCheckHooks;