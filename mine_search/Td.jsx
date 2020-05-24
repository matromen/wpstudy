import React, { useContext, useCallback, memo, useMemo } from 'react';
import { TableContext, CODE } from './MineSearch';
import {OPEN_CELL, CLICK_MINE, SET_FLAG, SET_QUESTION, SET_NORMAL} from './MineSearch';



const Td = memo(({rowIndex, colIndex}) => {
    console.log('td render');

    const {tableData, halted, dispatch} = useContext(TableContext);

    const getStyle = (code)=>{
        switch(code){
            case CODE.NORMAL :
            case CODE.MINE : {
                return {background: '#444'}
            }
            case CODE.CLICKED_MINE : {
                return {background: 'white'};
            }
            case CODE.OPEND : {
                return {background: 'white'}
            }
            case CODE.FLAG : 
            case CODE.FLAG_MINE: {
                return {background: 'red'};
            }            
            case CODE.QUESTION_MINE:
            case CODE.QUESTION: {
                return {background: 'yellow'};
            }
            default : {
                return {background: 'white'}
            }
        }
    }

    const getText = (code) => {
        console.log('#######getText');
        switch(code){
            case CODE.OPEND : 
            case CODE.NORMAL: {
                return '';
            }
            case CODE.MINE : {
                return 'X';
            }
            case CODE.CLICKED_MINE : {
                return '펑';
            }
            case CODE.FLAG : 
            case CODE.FLAG_MINE: {
                return '!';
            }
            case CODE.QUESTION_MINE:
            case CODE.QUESTION: {
                return '?';
            }
            default : {
                return code;
            }
        }
    }

    const onClickTd = useCallback(() => {
        if(halted){
            return;
        }
        switch(tableData[rowIndex][colIndex]){
            case CODE.OPEND : 
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE: {
                break;
            }
            case CODE.NORMAL : {
                dispatch({type: OPEN_CELL, row: rowIndex, col: colIndex});
                break;
            }
            case CODE.MINE : {
                dispatch({type: CLICK_MINE, row: rowIndex, col: colIndex});
                break;
            }
            default: break;

        }
        
    }, [tableData[rowIndex][colIndex], halted]);

    const onContextMenuTd = useCallback((e) => {
        e.preventDefault();
        if(halted){
            return;
        }        

        switch(tableData[rowIndex][colIndex]){
            case CODE.NORMAL :
            case CODE.MINE : {
                dispatch({type: SET_FLAG, row: rowIndex, col: colIndex})
                break;
            }
            case CODE.FLAG : 
            case CODE.FLAG_MINE : {
                dispatch({type: SET_QUESTION,  row: rowIndex, col: colIndex})
                break;
            }
            case CODE.QUESTION : 
            case CODE.QUESTION_MINE : {
                dispatch({type: SET_NORMAL,  row: rowIndex, col: colIndex})
                break;
            }
            default : break;
        }

    }, [tableData[rowIndex][colIndex], halted]);

    // return (
    //     <>
    //         {console.log('real td reander')}
    //         <td style={getStyle(tableData[rowIndex][colIndex])} onClick={onClickTd} onContextMenu={onContextMenuTd}>
    //             {getText(tableData[rowIndex][colIndex])}
    //         </td>
    //     </>
    // );
    return useMemo( () => { 
        return (
        <>
            {console.log('real td reander')}
            <td style={getStyle(tableData[rowIndex][colIndex])} onClick={onClickTd} onContextMenu={onContextMenuTd}>
                {getText(tableData[rowIndex][colIndex])}
            </td>
        </>
        )
    }, [tableData[rowIndex][colIndex]])
});

export default Td;