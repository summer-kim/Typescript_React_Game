import * as React from 'react';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Ball from './Ball';

const getLottoNumbers = () => {
  const shuffle: number[] = [];
  const candidate = Array(45)
    .fill(null)
    .map((v, i) => i + 1);

  while (shuffle.length < 6) {
    const num = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(num);
  }
  return shuffle.sort((a, b) => a - b);
};

const Lotto = () => {
  const timeoutArray = useRef<number[]>([]);
  const pickNumbers = useMemo(() => getLottoNumbers(), [timeoutArray.current]);
  const [numbers, setNumbers] = useState(pickNumbers);
  const [balls, setBalls] = useState<number[]>([]);
  const [startable, setStartable] = useState(true);
  const [resetable, setResetable] = useState(false);
  const [run, setRun] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (run) {
      for (let i = 0; i < numbers.length; i++) {
        timeoutArray.current[i] = window.setTimeout(() => {
          setBalls((preBalls) => [...preBalls, numbers[i]]);
          if (i === numbers.length - 1) setResetable(true);
        }, (i + 1) * 1000);
      }
    }
    return () => {
      if (run) {
        timeoutArray.current.forEach((timeout) => {
          clearTimeout(timeout);
        });
        setRun(false);
      }
    };
  }, [run]);

  useEffect(() => {
    if (reset) {
      onReset();
    }
  }, [reset]);

  useEffect(() => {
    setNumbers(pickNumbers);
  }, [pickNumbers]);

  const onClick = useCallback(
    () => (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.target as HTMLButtonElement;
      if (target.id === 'start') {
        setRun(true);
        setStartable(false);
      } else {
        setReset(true);
        setResetable(false);
      }
    },
    []
  );

  const onReset = useCallback(() => {
    timeoutArray.current = [];
    setBalls([]);
    setRun(false);
    setStartable(true);
    setResetable(false);
    setReset(false);
  }, []);

  return (
    <div className='container text-center h-100'>
      <h3 className='m-2 text-center text-uppercase text-secondary'>Result</h3>
      <div className='d-flex m-1 justify-content-center align-items-center h-50'>
        {balls.map((num, i) => (
          <Ball num={num} key={i + ':' + num} />
        ))}
      </div>
      <div>
        <button
          className='btn btn-outline-secondary m-1'
          id='start'
          disabled={!startable}
          onClick={onClick()}
        >
          Start
        </button>
        <button
          className='btn btn-outline-secondary m-1'
          id='reset'
          disabled={!resetable}
          onClick={onClick()}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Lotto;
