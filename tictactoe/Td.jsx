import React, { useCallback, useRef, useEffect } from 'react';
import {CLICK_CELL } from  './Tictactoe';


const Td = ({rowIndex, colIndex, dispatch, colData}) => {
    const ref = useRef([]);

    console.log('td renderring ' +  ref.current[0])


    useEffect(() => {
        // console.log(rowIndex, colIndex, dispatch, colData)
        // console.log(ref.current);
        console.log(rowIndex === ref.current[0], colIndex === ref.current[1], dispatch === ref.current[2], colData === ref.current[3])
        ref.current = [rowIndex, colIndex, dispatch, colData];

    }, [rowIndex, colIndex, dispatch, colData])



    const onClickTd = useCallback(() => {  //rerendering 시 재생성 막기. 힘수 기억
        // console.log(rowIndex, colIndex);
        // console.log(colData)
        if(colData){
            console.log('s나와1');
            return;
        }

        console.log(rowIndex ,',', colIndex)
        dispatch({type: CLICK_CELL, row: rowIndex, col: colIndex});
        
    }, [colData]);


    return (
        <>
            <td onClick={onClickTd}>{colData}</td>
        </>
    );
}

export default Td;