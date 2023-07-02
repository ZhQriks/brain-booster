import React from 'react';

import { Stack, useMantineTheme } from '@mantine/core';
import useSingleRoadmap from 'query/roadmap';
import { useParams } from 'react-router-dom';

import RoadmapDiagram from '../roadmap/components/RoadmapDiagram';

const RoadMapDetails = (): JSX.Element => {
  const { roadmapId } = useParams();

  const mantineTheme = useMantineTheme();
  const roadmap = useSingleRoadmap(+roadmapId! || 0);

  React.useEffect(() => {
    console.log(roadmap?.data);
  }, [roadmap]);

  return (
    <Stack mt='lg' spacing={50}>
      {roadmap?.data && <RoadmapDiagram key={roadmapId} data={roadmap?.data} />}
    </Stack>
  );
};

export default RoadMapDetails;
