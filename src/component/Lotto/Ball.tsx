import React, { memo } from 'react';

const colorChart = (num) => {
  let background = '';
  if (num <= 10) background = 'red';
  else if (num <= 20) background = 'orange';
  else if (num <= 30) background = 'yellow';
  else if (num <= 40) background = 'green';
  else {
    background = 'blue';
  }
  return background;
};

const Ball = ({ num }) => {
  const background = colorChart(num);
  return (
    <div
      className='rounded-circle text-white d-flex align-items-center justify-content-center m-1'
      style={{ background, width: '40px', height: '40px' }}
    >
      {num}
    </div>
  );
};

export default memo(Ball);
