import React, { useContext, memo } from 'react';
import Td from './Td';
import { TableContext } from './MineSearch';


const Tr = memo(({rowIndex}) => {
    console.log('tr render');

    const {tableData} = useContext(TableContext);


    return (
        <>
            <tr>
                {tableData[0] && Array(tableData[0].length).fill().map( (tdTag, i) => <Td key={i} rowIndex={rowIndex} colIndex={i} />)}
            </tr>
        </>
    )
});

export default Tr;