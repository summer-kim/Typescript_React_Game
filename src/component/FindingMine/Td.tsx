import * as React from 'react';
import { useCallback, memo } from 'react';
import { TABLE_CODE, ACTION_TYPE, ReducerAction } from './code';

const getTdText = (code: number) => {
  switch (code) {
    case TABLE_CODE.MINE:
      return ' ';
    case TABLE_CODE.EXPLOSION:
      return 'X';
    case TABLE_CODE.NORMAL:
      return ' ';
    case TABLE_CODE.QUESTION_MINE:
    case TABLE_CODE.QUESTION:
      return '?';
    case TABLE_CODE.FLAG_MINE:
    case TABLE_CODE.FLAG:
      return '!';
    default:
      return code || ' ';
  }
};

const getTdStyle = (code: number) => {
  switch (code) {
    case TABLE_CODE.NORMAL:
    case TABLE_CODE.MINE:
      return;
    case TABLE_CODE.OPEND:
      return { background: 'teal' };
    case TABLE_CODE.QUESTION_MINE:
    case TABLE_CODE.QUESTION:
      return { background: 'gray' };
    case TABLE_CODE.FLAG_MINE:
    case TABLE_CODE.FLAG:
      return { background: 'rgb(255, 107, 156)' };
    case TABLE_CODE.EXPLOSION:
      return { background: 'red' };
    default:
      return { background: 'teal' };
  }
};

interface Props {
  rowIndex: number;
  colIndex: number;
  code: number;
  dispatch: React.Dispatch<ReducerAction>;
  halted: boolean;
}

const Td: React.FC<Props> = ({
  rowIndex,
  colIndex,
  code,
  dispatch,
  halted,
}) => {
  const onClickDigging = useCallback(() => {
    if (halted) {
      return;
    }
    switch (code) {
      case TABLE_CODE.MINE:
      case TABLE_CODE.QUESTION_MINE:
      case TABLE_CODE.FLAG_MINE:
        dispatch({ type: ACTION_TYPE.BLOW_UP, row: rowIndex, col: colIndex });
        break;
      case TABLE_CODE.NORMAL:
      case TABLE_CODE.QUESTION:
      case TABLE_CODE.FLAG:
        dispatch({ type: ACTION_TYPE.OPEN_CELL, row: rowIndex, col: colIndex });
        break;
      default:
        break;
    }
  }, [halted, code]);

  const onClickRight = useCallback(
    (e) => {
      e.preventDefault();
      if (halted) {
        return;
      }
      switch (code) {
        case TABLE_CODE.MINE:
        case TABLE_CODE.NORMAL:
          dispatch({
            type: ACTION_TYPE.TO_QUESTION,
            row: rowIndex,
            col: colIndex,
          });
          break;
        case TABLE_CODE.QUESTION_MINE:
        case TABLE_CODE.QUESTION:
          dispatch({ type: ACTION_TYPE.TO_FLAG, row: rowIndex, col: colIndex });
          break;
        case TABLE_CODE.FLAG_MINE:
        case TABLE_CODE.FLAG:
          dispatch({
            type: ACTION_TYPE.TO_NORMAL,
            row: rowIndex,
            col: colIndex,
          });
          break;
        case TABLE_CODE.OPEND:
        default:
          break;
      }
    },
    [halted, code]
  );

  return (
    <td
      onClick={onClickDigging}
      style={getTdStyle(code)}
      onContextMenu={onClickRight}
    >
      {getTdText(code)}
    </td>
  );
};

export default memo(Td);
