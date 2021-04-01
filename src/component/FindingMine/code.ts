export const TABLE_CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  EXPLOSION: -6,
  OPEND: 0,
} as const;

export const ACTION_TYPE = {
  START_GAME: 'START_GAME',
  OPEN_CELL: 'OPEN_CELL',
  TO_FLAG: 'TO_FLAG',
  TO_NORMAL: 'TO_NORMAL',
  TO_QUESTION: 'TO_QUESTION',
  BLOW_UP: 'BLOW_UP',
} as const;

interface StartGameAction {
  type: typeof ACTION_TYPE.START_GAME;
  rows: number;
  cols: number;
  mines: number;
}

interface OpenCellAction {
  type: typeof ACTION_TYPE.OPEN_CELL;
  row: number;
  col: number;
}

interface ToFlagAction {
  type: typeof ACTION_TYPE.TO_FLAG;
  row: number;
  col: number;
}

interface ToNormalAction {
  type: typeof ACTION_TYPE.TO_NORMAL;
  row: number;
  col: number;
}

interface ToQuestionAction {
  type: typeof ACTION_TYPE.TO_QUESTION;
  row: number;
  col: number;
}

interface BlowUpAction {
  type: typeof ACTION_TYPE.BLOW_UP;
  row: number;
  col: number;
}

export type ReducerAction =
  | StartGameAction
  | OpenCellAction
  | ToFlagAction
  | ToNormalAction
  | ToQuestionAction
  | BlowUpAction;
