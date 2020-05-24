import React, {memo, useMemo} from 'react';
import Td from './Td';

const Tr = ({rowData, rowIndex, dispatch}) => {
    console.log('tr render')
    return (
        <>  
            <tr>
                {
                    Array(rowData.length).fill().map((tdTag, i)=>
                        useMemo(()=> <Td key={i} rowIndex={rowIndex} colIndex={i} colData={rowData[i]} dispatch={dispatch} />, [rowData[i]])
                    )
                }

            </tr>
        </>
    );
};

export default Tr;