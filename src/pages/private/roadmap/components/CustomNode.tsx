import React, { memo } from 'react';

import { Title } from '@mantine/core';
import { Handle, Position } from 'reactflow';

import { EdgeStatus } from './EdgeInfoDrewer';

function CustomNode({ data }: { data: any }) {
  const statusData = data.status;
  const { isStep } = data;
  console.log(data.isStep);

  let status;
  let dotColor = '#E2B53E';

  switch (statusData) {
    case EdgeStatus.completed:
      status = 'Completed';
      dotColor = '#00C853';
      break;
    case EdgeStatus.inProgress:
      status = 'In Progress';
      dotColor = '#E2B53E';
      break;
    default:
      status = 'Not Started';
      dotColor = '#9BA1AF';
  }

  return (
    <div
      className={`pl-3 pr-6 py-1 pt-7 rounded-lg ${
        isStep
          ? 'bg-[#175BC1] text-white'
          : 'bg-[#FFFFFF] border-[#BBBBBB] border-[1px] border-solid'
      }`}
    >
      <div className='flex'>
        <div className='ml-2'>
          <div className='text-md font-bold'>{data.name}</div>
          <div className='flex items-center'>
            <Title order={1} color={dotColor} className='mr-1'>·</Title>
            <div className='text-xs'>{status}</div>
          </div>
        </div>
      </div>

      <Handle type='target' position={Position.Top} />
      <Handle type='source' position={Position.Bottom} />
    </div>
  );
}

export default memo(CustomNode);
