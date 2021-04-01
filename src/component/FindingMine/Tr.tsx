import React, { useContext, memo } from 'react';
import Td from './Td';
import { TableContext } from './MineSearch';

const Tr = ({ rowIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext);
  console.log('rerender');
  return (
    <tr>
      {Array(tableData[0].length)
        .fill()
        .map((td, index) => (
          <Td
            rowIndex={rowIndex}
            colIndex={index}
            code={tableData[rowIndex][index]}
            dispatch={dispatch}
            halted={halted}
            key={rowIndex + '' + index}
          />
        ))}
    </tr>
  );
};

export default memo(Tr);
