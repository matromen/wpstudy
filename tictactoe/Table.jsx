import React from 'react';
import Tr from './Tr'; 

const Table = ({onClick, tableData, dispatch}) => {
    return (
        <>  
            {/* <table onClick={onClick}> */}
            <table>
                {Array(tableData.length).fill().map((trTag, i) => <Tr key={i} rowData={tableData[i]} rowIndex={i} dispatch={dispatch} />)}
            </table>
        </>
    );
}

export default Table; 