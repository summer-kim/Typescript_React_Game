import React, { useState, useCallback, useContext } from 'react';
import { TableContext } from './MineSearch';
import { ACTION_TYPE } from './code';

const Form = () => {
  const [mines, setMines] = useState(10);
  const { dispatch, result } = useContext(TableContext);

  const onChangeMines = useCallback((e) => {
    setMines(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const length = e.target['gameType'].value;
      dispatch({
        type: ACTION_TYPE.START_GAME,
        rows: length,
        cols: length,
        mines,
      });
    },
    [mines]
  );

  return (
    <form className='m-1 form-check' onSubmit={onSubmit}>
      <input
        className='form-check-input'
        type='radio'
        value={5}
        id='five'
        name='gameType'
      />
      <label className='form-check-label' htmlFor='five'>
        5 X 5
      </label>
      <br />
      <input
        className='form-check-input'
        type='radio'
        value={10}
        id='ten'
        name='gameType'
      />
      <label className='form-check-label' htmlFor='ten'>
        10 X 10
      </label>
      <br />
      <input
        className='form-check-input'
        type='radio'
        value={15}
        id='fifteen'
        name='gameType'
      />
      <label className='form-check-label' htmlFor='fifteen'>
        15 X 15
      </label>
      <br />
      <input
        className='form-check-input'
        type='radio'
        value={20}
        id='twenty'
        name='gameType'
      />
      <label className='form-check-label' htmlFor='twenty'>
        20 X 20
      </label>
      <br />
      <label className='form-check-label' htmlFor='mines'>
        Number of Mines
      </label>
      <br />
      <input
        type='number'
        value={mines}
        onChange={onChangeMines}
        name='mines'
      />
      <br />
      <button className='btn border rounded'>Submit</button>
      <div className='mt-2'>{result}</div>
    </form>
  );
};

export default Form;
