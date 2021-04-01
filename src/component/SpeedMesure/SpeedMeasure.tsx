import React, { Fragment, useState, useRef } from 'react';

const SpeedMeasure = () => {
  const [status, setStatus] = useState('wait');
  const [message, setMessage] = useState('Click to Start');
  const [records, setRecords] = useState([]);
  const [result, setResult] = useState('');
  const setTimer = useRef(null);
  const startTime = useRef(null);
  const endTime = useRef(null);

  const onClick = () => {
    switch (status) {
      case 'wait':
        setStatus('ready');
        setMessage('Click Box when color turns to Blue');
        setResult('');
        setTimer.current = setTimeout(() => {
          startTime.current = Date.now();
          setStatus('now');
          setMessage('Click Now');
        }, Math.random() * 3000 + 1000);
        break;
      case 'ready':
        clearTimeout(setTimer.current);
        setStatus('wait');
        setMessage('Too Early, Click to start again');
        setResult('FAIL');
        break;
      case 'now':
        endTime.current = Date.now();
        setStatus('wait');
        setMessage('Good Job Click to start agiain');
        setResult('SUCCESS');
        setRecords((preRecords) => [
          ...preRecords,
          endTime.current - startTime.current,
        ]);
        break;
      default:
        break;
    }
  };
  const showAverage = () => {
    let sum, average;
    if (records) {
      sum = records.reduce((acc, curr) => acc + curr, 0);
      average = sum / records.length;
    }
    return average > 0 ? average / 1000 : 0;
  };

  const statusColor =
    status === 'ready'
      ? 'bg-danger'
      : status === 'wait'
      ? 'bg-success'
      : 'bg-primary';

  return (
    <Fragment>
      <div
        onClick={onClick}
        className={` w-50 h-50 d-flex flex-column align-items-center justify-content-center text-white h2 mx-auto ${statusColor}`}
      >
        <h3>{result}</h3>
        <div>{message}</div>
      </div>
      <div>Average : {showAverage()}s</div>
    </Fragment>
  );
};

export default SpeedMeasure;
