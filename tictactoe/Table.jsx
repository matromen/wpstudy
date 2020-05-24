import React, {memo, useMemo} from 'react';
import Tr from './Tr'; 

const Table = ({onClick, tableData, dispatch}) => {
    console.log('table render')
    return (
        <>  
            <table>
                {Array(tableData.length).fill().map((trTag, i) => 
                    useMemo(()=><Tr key={i} rowData={tableData[i]} rowIndex={i} dispatch={dispatch} />, [tableData[i]])
                )}
            </table>
        </>
    );
};

export default Table; 