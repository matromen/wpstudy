import React from 'react';
import Td from './Td';

const Tr = ({rowData, rowIndex, dispatch}) => {
    return (
        <>  
            <tr>
                {Array(rowData.length).fill().map((tdTag, i)=><Td key={i} rowIndex={rowIndex} colIndex={i} colData={rowData[i]} dispatch={dispatch} />)}
            </tr>
        </>
    );
}

export default Tr;