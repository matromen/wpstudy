import React, { useContext, memo } from 'react';
import Tr from './Tr';
import { TableContext } from './MineSearch';


const Table = memo(() => {
    console.log('table render');

    const {tableData} = useContext(TableContext)


    return (
        <>
            <table>
                {Array(tableData.length).fill().map((trTag, i)=> <Tr key={i} rowIndex={i} />)}
            </table>
        </>
    )
});

export default Table;