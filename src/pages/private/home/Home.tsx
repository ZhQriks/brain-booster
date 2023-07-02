import React from 'react';

import { Badge, Button, Group, Stack, useMantineTheme } from '@mantine/core';
import Marquee from 'react-fast-marquee';
import { useNavigate } from 'react-router-dom';

const Home = (): JSX.Element => {
  const mantineTheme = useMantineTheme();
  const navigate = useNavigate();

  return (
    <div style={{ backgroundImage: 'url(https://i.postimg.cc/L6JVR9hq/bg-12-1.png)' }}>
      <p className='text-[#414141] text-4xl md:text-6xl font-bold text-center mt-40'>
        Learn any <br className='hidden md:block' /> of{' '}
        <a className='underline decoration-[#5C9DFE] decoration-6'>2,000,000+</a> skills
      </p>
      <p className='color-[#7D7D7D] font-light text-center px-60 -mt-10'>
        We help you develop a detailed and structured plan that will help to systematically master
        the topic being studied without missing anything important.
      </p>
      <Group position='center' mb={80}>
        <Button size='lg' radius='lg' onClick={() => navigate('/generate-roadmap')}>
          Find your road
        </Button>
      </Group>
      <Marquee>
        <Badge color='gray' variant='outline' mr='sm' size='xl'>
          Flavorist
        </Badge>
        <Badge color='gray' variant='outline' mr='sm' size='xl'>
          Color expert
        </Badge>
        <Badge color='gray' variant='outline' mr='sm' size='xl'>
          Hippotherapy
        </Badge>
        <Badge color='gray' variant='outline' mr='sm' size='xl'>
          Toy design
        </Badge>
        <Badge color='gray' variant='outline' mr='sm' size='xl'>
          Blockchain
        </Badge>
        <Badge color='gray' variant='outline' mr='sm' size='xl'>
          Periodontist
        </Badge>
      </Marquee>
    </div>
  );
};

export default Home;
