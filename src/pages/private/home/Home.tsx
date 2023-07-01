import React from 'react';

import { Stack, useMantineTheme } from '@mantine/core';

const Home = (): JSX.Element => {
  const mantineTheme = useMantineTheme();

  return (
    <Stack mt='lg' spacing={50}>
      Hello world
    </Stack>
  );
};

export default Home;
