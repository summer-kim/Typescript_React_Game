import * as React from 'react';
import { useState, useRef, Fragment } from 'react';

const Gugudan = () => {
  const [FirstNum, setFirstNum] = useState(Math.ceil(Math.random() * 9));
  const [SecondNum, setSecondNum] = useState(Math.ceil(Math.random() * 9));
  const [Value, setValue] = useState('');
  const [Result, setResult] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (parseInt(Value) === FirstNum * SecondNum) {
      setResult(Value + ' Correct!');
      setFirstNum(Math.ceil(Math.random() * 9));
      setSecondNum(Math.ceil(Math.random() * 9));
      setValue('');
      if (inputRef.current) {
        inputRef.current.style.backgroundColor = 'rgb(216, 175, 216)';
      }
    } else {
      setResult(Value + ' Wrong!');
      setValue('');
      if (inputRef.current) {
        inputRef.current.style.backgroundColor = 'rgb(236, 96, 96)';
      }
    }
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.style.backgroundColor = '';
      }
    }, 350);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Fragment>
      <div>
        {FirstNum} X {SecondNum} ?
      </div>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} type='number' value={Value} onChange={onChange} />
        <button type='submit'>Submit</button>
      </form>
      <div>{Result}</div>
    </Fragment>
  );
};

export default Gugudan;
