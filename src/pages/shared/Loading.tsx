import React from 'react';

import { ProgressSpinner } from 'primereact/progressspinner';

const Loading = (): JSX.Element => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className='flex align-items-center justify-content-center'>
        <ProgressSpinner />
      </div>
    </div>
  );
};

export default Loading;
