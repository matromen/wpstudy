import React, {useState, useCallback, useContext, memo } from 'react';
import {TableContext} from './MineSearch';
import {START_GAME} from './MineSearch'


const Form = memo(() => {
    console.log('Form render');
    
    const [row, setRow] = useState(10);
    const [col, setCol] = useState(10);
    const [mine, setMine] = useState(20);

    const {dispatch} = useContext(TableContext);


    console.log(row);

    const onChangeRow = useCallback(
        (e) => {
            setRow(e.target.value);
    }, []);

    const onChangeCol = useCallback(
        (e) => {
            setCol(e.target.value);
    }, [])

    const onChangeMine = useCallback(
        (e) => {
            setMine(e.target.value);
    }, [])

    const onClickBtn = useCallback(() => {
        dispatch({type: START_GAME, row, col, mine});
    }, [row, col, mine])

    return (
        <>
            <div>
                <input type='number' placeholder='세로' value={row} onChange={onChangeRow} />
                <input type='number' placeholder='가로' value={col} onChange={onChangeCol} />
                <input type='number' placeholder='지뢰갯수' value={mine} onChange={onChangeMine} />
                <button onClick={onClickBtn}>ok</button>
            </div>
        </>
    )
});

export default Form;