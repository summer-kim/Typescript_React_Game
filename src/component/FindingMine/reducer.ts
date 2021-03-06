import { plantMine, ReducerState, initialState } from './MineSearch';
import { TABLE_CODE, ACTION_TYPE, ReducerAction } from './code';

const reducer = (state = initialState, action: ReducerAction): ReducerState => {
  let row: number, col: number;
  let rowArray: number[] = [];

  switch (action.type) {
    case ACTION_TYPE.START_GAME:
      return {
        ...state,
        halted: false,
        result: '',
        tableData: plantMine({
          rows: action.rows,
          cols: action.cols,
          mines: action.mines,
        }),
      };
    case ACTION_TYPE.OPEN_CELL: {
      const tableData = [...state.tableData];
      const mineList: number[] = [
        TABLE_CODE.MINE,
        TABLE_CODE.QUESTION_MINE,
        TABLE_CODE.FLAG_MINE,
      ];
      const recursiveLog: string[] = [];
      console.log('get opendCount state:' + state.opendNum);
      let opendNum = 0;
      row = action.row;
      col = action.col;

      const checkMines = (rowCurr: number, colCurr: number) => {
        if (mineList.includes(tableData[rowCurr][colCurr])) {
          return;
        }
        if (tableData[rowCurr][colCurr] >= TABLE_CODE.OPEND) {
          return;
        }
        if (recursiveLog.includes(rowCurr + ' ' + colCurr)) {
          return;
        } else {
          recursiveLog.push(row + ' ' + col);
        }
        let aroundCell = [
          [rowCurr - 1, colCurr - 1],
          [rowCurr - 1, colCurr],
          [rowCurr - 1, colCurr + 1],
          [rowCurr, colCurr - 1],
          [rowCurr, colCurr + 1],
          [rowCurr + 1, colCurr - 1],
          [rowCurr + 1, colCurr],
          [rowCurr + 1, colCurr + 1],
        ];
        aroundCell = aroundCell.filter(
          (coord) =>
            coord[0] > -1 &&
            coord[0] < tableData.length &&
            coord[1] > -1 &&
            coord[1] < tableData[0].length
        );
        const extractCode = aroundCell.map(
          (coord) => tableData[coord[0]][coord[1]]
        );
        const count = extractCode.filter((code) => mineList.includes(code))
          .length;
        tableData[rowCurr][colCurr] = count;
        if (count === 0) {
          //call Recursive function (to open all cell doesn't carry mine)
          aroundCell.forEach((coord) => checkMines(coord[0], coord[1]));
        }
        opendNum++;
        console.log(opendNum);
      };
      checkMines(row, col);
      console.log('right before returning opendCount state:' + opendNum);
      return {
        ...state,
        opendNum,
        tableData,
      };
    }
    case ACTION_TYPE.BLOW_UP:
      row = action.row;
      col = action.col;
      rowArray = [...state.tableData[row]];
      rowArray[col] = TABLE_CODE.EXPLOSION;
      return {
        ...state,
        halted: true,
        result: 'LOSE',
        tableData: state.tableData.map((original, i) =>
          i === row ? rowArray : original
        ),
      };
    case ACTION_TYPE.TO_QUESTION:
      row = action.row;
      col = action.col;
      rowArray = [...state.tableData[row]];
      rowArray[col] === TABLE_CODE.MINE
        ? (rowArray[col] = TABLE_CODE.QUESTION_MINE)
        : (rowArray[col] = TABLE_CODE.QUESTION);
      return {
        ...state,
        tableData: state.tableData.map((original, i) =>
          i === row ? rowArray : original
        ),
      };
    case ACTION_TYPE.TO_FLAG:
      row = action.row;
      col = action.col;
      rowArray = [...state.tableData[row]];
      rowArray[col] === TABLE_CODE.QUESTION_MINE
        ? (rowArray[col] = TABLE_CODE.FLAG_MINE)
        : (rowArray[col] = TABLE_CODE.FLAG);
      return {
        ...state,
        tableData: state.tableData.map((original, i) =>
          i === row ? rowArray : original
        ),
      };
    case ACTION_TYPE.TO_NORMAL:
      row = action.row;
      col = action.col;
      rowArray = [...state.tableData[row]];
      rowArray[col] === TABLE_CODE.FLAG_MINE
        ? (rowArray[col] = TABLE_CODE.MINE)
        : (rowArray[col] = TABLE_CODE.NORMAL);
      return {
        ...state,
        tableData: state.tableData.map((original, i) =>
          i === row ? rowArray : original
        ),
      };
    default:
      return state;
  }
};

export default reducer;
