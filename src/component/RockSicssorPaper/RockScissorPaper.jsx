import React, { Fragment, useState, useEffect, useRef } from 'react';

const RSPcoord = {
  Rock: '0',
  Scissors: '-170px',
  Paper: '-345px',
};

const scoreTable = {
  Rock: 0,
  Scissors: 1,
  Paper: -1,
};

const computerSelect = (position) => {
  return Object.entries(RSPcoord).find((each) => each[1] === position)[0];
};

const RockScissorPaper = () => {
  const interval = useRef();
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(0);

  useEffect(() => {
    interval.current = setInterval(switchRSP, 100);
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

  const onClickStop = (e) => {
    const mySelect = e.target.textContent;
    const computer = computerSelect(imgCoord);
    clearInterval(interval.current);
    setTimeout(() => {
      interval.current = setInterval(switchRSP, 100);
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
