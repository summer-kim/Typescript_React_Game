import React, { useContext, memo } from 'react';
import Tr from './Tr';
import { TableContext } from './MineSearch';

const Table = () => {
  const { tableData } = useContext(TableContext);
  return (
    <table className='m-1 ms-2'>
      <tbody id='tableTbody'>
        {Array(tableData.length)
          .fill()
          .map((tr, index) => (
            <Tr rowIndex={index} key={index} />
          ))}
      </tbody>
    </table>
  );
};

export default memo(Table);
