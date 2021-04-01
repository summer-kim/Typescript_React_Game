import * as React from 'react';
import { Fragment, useState, useEffect, useRef } from 'react';

const RSPcoord = {
  Rock: '0',
  Scissors: '-170px',
  Paper: '-345px',
} as const;

const scoreTable = {
  Rock: 0,
  Scissors: 1,
  Paper: -1,
} as const;

type PositionKey = keyof typeof RSPcoord;
type Position = typeof RSPcoord[keyof typeof RSPcoord];
const computerSelect = (position: Position): PositionKey => {
  return (Object.keys(RSPcoord) as PositionKey[]).find(
    (each) => RSPcoord[each] === position
  )!;
};

const RockScissorPaper = () => {
  const interval = useRef<number>();
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState<Position>(RSPcoord.Rock);

  useEffect(() => {
    interval.current = window.setInterval(switchRSP, 100);
    return () => {
      clearInterval(interval.current);
    };
  }, [imgCoord]);

  const switchRSP = () => {
    if (imgCoord === RSPcoord.Rock) {
      setImgCoord(RSPcoord.Scissors);
    } else if (imgCoord === RSPcoord.Scissors) {
      setImgCoord(RSPcoord.Paper);
    } else {
      setImgCoord(RSPcoord.Rock);
    }
  };

  const onClickStop = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const mySelect = target.innerHTML as PositionKey;
    const computer = computerSelect(imgCoord);
    clearInterval(interval.current);
    setTimeout(() => {
      interval.current = window.setInterval(switchRSP, 100);
    }, 1200);
    if (scoreTable[computer] === scoreTable[mySelect]) {
      setResult('Draw');
    } else if (scoreTable[mySelect] - scoreTable[computer] === -1) {
      setResult('Win');
    } else if (mySelect === 'Scissors' && computer === 'Paper') {
      setResult('Win');
    } else {
      setResult('Lose');
    }
  };

  return (
    <Fragment>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        <img
          src='./asset/rsp.jpg'
          style={{
            objectPosition: `${imgCoord} 0`,
            objectFit: 'cover',
            width: '185px',
            height: '300px',
          }}
        />
        <div>
          <button
            className='mx-1 btn btn-outline-secondary'
            onClick={onClickStop}
          >
            Rock
          </button>
          <button
            className='mx-1 btn btn-outline-secondary'
            onClick={onClickStop}
          >
            Scissors
          </button>
          <button
            className='mx-1 btn btn-outline-secondary'
            onClick={onClickStop}
          >
            Paper
          </button>
        </div>
        <h2>{result}</h2>
      </div>
    </Fragment>
  );
};

export default RockScissorPaper;
