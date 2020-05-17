import React, { useReducer, useCallback, useEffect } from 'react';
import Table from './Table';

const initialState = {  // state값들을 정의
    winner: '',
    turn: 'O',
    tableData: [['','',''],['','',''],['','','']],
    recentCell: [-1 ,-1],
}


const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
const REST_GAME = 'REST_GAME';
const reducer = (state, action) => {  //여기서 위의 state를 변경한다.
    switch(action.type){
        case SET_WINNER : {
            console.log('aciton : ' , action.winner);
            return  {...state, winner: action.winner};
        }        
        case CLICK_CELL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.col] = state.turn;

            return {...state, tableData, recentCell: [ action.row, action.col]};
        }
        case CHANGE_TURN : {
            return {...state, turn: state.turn === 'O' ? 'X' : 'O'}
        }
        case REST_GAME : {
            return { ...state, turn: 'O', tableData: [['','',''],['','',''],['','','']], recentCell: [-1, -1]};
        }
        default :
            return state;
    }

}


const Tictactoe = () => {
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('0');
    // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);

    //useReducer는 위의 state를 통일 : 1개의 state, 1개의 set으로 통일하여 선언
    const [state, dispatch] = useReducer(reducer, initialState); 
    const {winner, turn, tableData, recentCell} = state;

    //useCallback  샘플 자식 table에서 끊음
    const onClickTable = useCallback(() => {
        dispatch({type: SET_WINNER, winner: 'O'});  //액션객체 기반으로 dispatch(실행) => reducer 함수 실행, initialState는 dispatch => reducer를 통해서만 가능
    }, []);

    useEffect(() => {
        console.log('useEffect')
        const [row, col] = recentCell;

        if(row < 0 ){  //componentDidMount시에는 return
            return;
        }

        let win = false;
        if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
            win = true;
        }

        if(tableData[0][col] === turn && tableData[1][col] === turn && tableData[2][col] === turn){
            win = true;
        }

        if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){
            win = true;
        }

        if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){
            win = true;
        }
        console.log(win, turn, tableData[row],[col], row, col);
        if(win){
            dispatch({type: SET_WINNER, winner: turn});
            dispatch({type: REST_GAME});
        }else{
            let all = true;
            tableData.forEach((row) => { //무승부 검사
                row.forEach((col) => {
                    if(!col){
                        all = false;  // 1칸이라도 비어 있으면 무승부가 아직 아님
                    }
                });
            });

            if(all){
                dispatch({type: REST_GAME});
            }else{
                dispatch({type: CHANGE_TURN});
            }
        }

    }, [recentCell])

    return (
        <>
            <Table onClick={onClickTable} tableData = {tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리 </div>}
        </>
    );
}


export default Tictactoe; 