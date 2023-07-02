import React from 'react';

import { Stack, useMantineTheme } from '@mantine/core';
import data from 'pages/private/roadmap/data/data.json';

import RoadmapDiagram from './components/RoadmapDiagram';

const Roadmap = (): JSX.Element => {
  const mantineTheme = useMantineTheme();

  return (
    <Stack mt='lg' spacing={50}>
      <RoadmapDiagram data={data} />
    </Stack>
  );
};

export default Roadmap;
