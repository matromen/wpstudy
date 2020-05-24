import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import Form from './Form';
import Table from './Table';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPEND: 0,  //0 이상이면 다 OPEND
}

function plantMine(row, col, mine){
    console.log(row, col, mine);

    const candidate = Array(row*col).fill().map((d, i)=> i);
    const shuffle = [];
    while(candidate.length > (row*col)-mine){
        shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0]);
    }
    console.log(shuffle);

    const data = [];                     //2차원 배열에 초기 값 셋팅
    for(let i=0; i<row; i++){
        const rowData = [];
        for(let j=0; j<col; j++){
           rowData.push(CODE.NORMAL);
        }
        data.push(rowData);
    }

    console.log(data);

    for(let k=0; k<shuffle.length; k++){ //shuffle값을 좌표로 표현하여 마이닝 함.
        const ver = Math.floor(shuffle[k]/col);
        const hor = shuffle[k]%col;

        data[ver][hor] = CODE.MINE;
    }
    console.log(data);

    return data;
}



export const TableContext = createContext({
    tableData: [],
    halted: false,
    dispatch: ()=>{}
});


const initialState = {
    data: {
        row: 0,
        col: 0,
        mine: 0
    },
    tableData: [],
    timer: 0,
    result: '',
    halted: true,
    checkCountSum: 0
}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const SET_FLAG = 'SET_FLAG';
export const SET_QUESTION = 'SET_QUESTION';
export const SET_NORMAL = 'SET_NORMAL';
const INCREAMENT_TIME = 'INCREAMENT_TIME';

let checked = []; //중복 OPEN 막기

const reducer = (state, action) => {
    switch(action.type){
        case START_GAME : {
            checked = [];
            return {...state,
                 data: {
                     row: action.row,
                     col: action.col,
                     mine: action.mine
                 },
                 tableData: plantMine(action.row, action.col, action.mine), halted: false, checkCountSum: 0, timer: 0}
        }

        case INCREAMENT_TIME : {
            return {...state, timer: state.timer + action.timer}
        }

        case OPEN_CELL: {
            const tableData = [...state.tableData];
            // tableData[action.row] = [...state.tableData[action.row]];
            tableData.forEach((row, i) => {
                tableData[i] = [...state.tableData[i]];
            });       
            

           
            let checkCount = 0;

            const checkArround = (row, col) => {
                //필터링
                if(row < 0 || row >= tableData.length || col < 0 || col >= tableData[row].length){
                    return;
                }

                if([CODE.OPEND, CODE.QUESTION_MINE,CODE.QUESTION, CODE.FLAG_MINE, CODE.FLAG].includes[tableData[row][col]]){
                    return;
                } 

                if(checked.includes(row + ',' + col)){
                    return;
                }else{
                    checked.push(row + ',' + col);
                }

                checkCount += 1;

               
                //주변 탐색
                let around = [];

                if(tableData[row-1]){  //윗줄이 있으면
                    console.log('search');
                    around = around.concat([tableData[row-1][col-1], tableData[row-1][col], tableData[row-1][col+1]]);
                }
                around = around.concat([tableData[row][col-1], tableData[row][col+1]]); //좌우
                if(tableData[row+1]){  //아랫줄이 있으면
                    around = around.concat([tableData[row+1][col-1], tableData[row+1][col], tableData[row+1][col+1]]);
                }
                const count = around.filter((d, i) => [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE].includes(d)).length;

                tableData[row][col] = count || CODE.OPEND;

                if(count === 0){ //CODE.OPEND 더 멀리 체크
                    let near = []; 
                    
                    if(row-1 > -1){
                        near = near.concat([[row-1, col-1], [row-1, col], [row-1, col+1]]);
                    }
                    near = near.concat([[row, col-1], [row, col+1]]);
                    if(row + 1 < tableData.length){
                        near = near.concat([[row+1, col-1], [row+1, col], [row+1, col+1]])
                    }
                    
                    console.log('near ', near)
                    near.forEach((d, i) => {
                        if(tableData[d[0]]){
                            checkArround(d[0], d[1]);
                        }

                    });
                }

            } //checkArround

            checkArround(action.row, action.col);
            console.log(checkCount,', ', state.checkCountSum);
            let halted = false;
            let result = '';
            if(state.checkCountSum + checkCount === ((state.data.row*state.data.col)-state.data.mine)){
                halted = true;
                result = `${state.timer}초, 승리하였습니다.`;
            }

            return {...state, tableData, checkCountSum: state.checkCountSum + checkCount, halted, result };
        }
       
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.col] = CODE.CLICKED_MINE;

            return {...state, tableData, halted: true};
        }
        case SET_FLAG : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.col] === CODE.NORMAL){
                tableData[action.row][action.col] = CODE.FLAG;
            }else{
                tableData[action.row][action.col] = CODE.FLAG_MINE;
            }            

            return {...state, tableData};
        }
        case SET_QUESTION : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.col] === CODE.FLAG){
                tableData[action.row][action.col] = CODE.QUESTION;
            }else{
                tableData[action.row][action.col] = CODE.QUESTION_MINE;
            }            

            return {...state, tableData};
        }       
        case SET_NORMAL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]]; 
            if(tableData[action.row][action.col] === CODE.QUESTION){
                tableData[action.row][action.col] = CODE.NORMAL;
            }else{
                tableData[action.row][action.col] = CODE.MINE;
            }

            return {...state, tableData};
        } 
        default: return state;
    }
}

const MineSearch = () => {
    console.log('MineSearch render');

    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, halted, timer, result} = state;

    
    useEffect(() => {
        let timerInterval;
        if(!halted){
            timerInterval = setInterval(()=>{
                dispatch({type: INCREAMENT_TIME, timer: 1});
            }, 1000);
        }
        console.log('timerInterval ', timerInterval) //halted가 false일때 clearInterval 즉 return이 실행됨.... timerInterval는 undefined가 된다.
        
        return () => {
            console.log('timerInterval clear');
            clearInterval(timerInterval);
        }
    }, [halted])



    const providerValue = useMemo(()=> {return {tableData: tableData, halted, dispatch}},[tableData, halted]); //caching 사용
    return (
        // <TableContext.Provider value={ {tableData: tableData, dispatch} }>   rerender시 퍼포먼스 문제
        <TableContext.Provider value={providerValue}>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    )
}

export default MineSearch;