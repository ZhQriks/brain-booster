import React from 'react';

import { Stack, useMantineTheme } from '@mantine/core';

import RoadmapDiagram from './components/RoadmapDiagram';

const Roadmap = (): JSX.Element => {
  const mantineTheme = useMantineTheme();

  return (
    <Stack mt='lg' spacing={50}>
      <RoadmapDiagram />
    </Stack>
  );
};

export default Roadmap;
