import * as React from 'react';
import { useReducer, createContext, useMemo } from 'react';
import reducer from './reducer';
import { TABLE_CODE, ReducerAction } from './code';
import Form from './Form';
import Table from './Table';
//import './findingMine.css';

interface Context {
  tableData: number[][];
  dispatch: React.Dispatch<ReducerAction>;
  halted: boolean;
  result: string;
  opendNum: number;
}

export const TableContext = createContext<Context>({
  tableData: [],
  dispatch: () => {},
  halted: false,
  result: 'Win',
  opendNum: 0,
});

export interface ReducerState {
  opendNum: number;
  tableData: number[][];
  result: string;
  halted: boolean;
  dispatch?: () => {};
}

export const initialState: ReducerState = {
  opendNum: 0,
  tableData: [],
  result: 'Win',
  halted: false,
};
interface plantMineType {
  rows: number;
  cols: number;
  mines: number;
}
export const plantMine = ({ rows, cols, mines }: plantMineType) => {
  const data: number[][] = [];
  const shuffle = [];
  const candidate = Array(rows * cols)
    .fill(null)
    .map((v, idx) => idx);
  while (shuffle.length < mines) {
    const randomNum = Math.floor(Math.random() * candidate.length);
    const mineLocation = candidate.splice(randomNum, 1)[0];
    shuffle.push(mineLocation);
  }
  for (let i = 0; i < rows; i++) {
    const rowArray = [];
    for (let j = 0; j < cols; j++) {
      rowArray.push(TABLE_CODE.NORMAL);
    }
    data.push(rowArray);
  }

  shuffle.forEach((location) => {
    const row = Math.floor(location / cols);
    const col = location % cols;
    data[row][col] = TABLE_CODE.MINE;
  });
  return data;
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, result, opendNum } = state!;
  const contextValue = useMemo(
    () => ({ tableData, dispatch, halted, result, opendNum }),
    [tableData, halted, opendNum]
  );
  return (
    <TableContext.Provider value={contextValue}>
      <div className='d-flex flex-row justify-content-center align-items-center'>
        <Form />
        <Table />
      </div>
    </TableContext.Provider>
  );
};

export default MineSearch;
