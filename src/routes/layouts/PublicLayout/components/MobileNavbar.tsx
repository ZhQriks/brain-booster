import React from 'react';

import {
  Group,
  Footer as MantineFooter,
  MediaQuery,
  ActionIcon,
  Burger,
  useMantineTheme,
  Center,
  Drawer,
  Transition,
  Title,
  Text,
  Stack,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCirclePlus, IconSmartHome } from '@tabler/icons';
import useCurrentRoute from 'hooks/useCurrentRoute';
import useMultipleRoadmap from 'query/roadmaps';
import { Link } from 'react-router-dom';

const data = [
  {
    id: '/roadmap',
    title: 'Sample roadmap',
  },
  {
    id: '/roadmap/2',
    title: 'Тема 2',
  },
];
const MobileNavbar = (): JSX.Element => {
  const theme = useMantineTheme();
  const roadmaps = useMultipleRoadmap();
  const currentRoute = useCurrentRoute();

  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <MediaQuery largerThan='md' styles={{ display: 'none' }}>
        <MantineFooter
          zIndex={1000}
          py='sm'
          px='xl'
          height='auto'
          sx={{ position: 'fixed', bottom: 0, width: '100%' }}
        >
          <Center>
            <Group position='apart' maw={500} w='100%'>
              <Burger opened={opened} onClick={toggle} size='sm' color='#1B3966' />
              <ActionIcon component={Link} to='/' onClick={close}>
                <IconSmartHome size={theme.fontSizes.lg} />
              </ActionIcon>
              <ActionIcon component={Link} to='/generate-roadmap' onClick={close}>
                <IconCirclePlus size={theme.fontSizes.lg} />
              </ActionIcon>
            </Group>
          </Center>
        </MantineFooter>
      </MediaQuery>

      <MediaQuery largerThan='md' styles={{ display: 'none' }}>
        <Drawer
          opened={opened}
          onClose={close}
          size='full'
          transitionProps={{ transition: 'slide-right', duration: 150, timingFunction: 'ease' }}
          withCloseButton={false}
          padding='xl'
          zIndex={999}
          sx={theme => ({
            '.mantine-Drawer-content': {
              overflow: 'visible',
            },
          })}
        >
          <Stack spacing='xl'>
            <Group position='apart' mb='xl'>
              <Group spacing='sm'>
                <Transition mounted={opened} transition='fade' duration={400} timingFunction='ease'>
                  {styles => (
                    <Title style={opened ? {} : styles} order={3}>
                      Brain Boost
                    </Title>
                  )}
                </Transition>
              </Group>
            </Group>

            <Stack spacing='md' mb='xl'>
              {(roadmaps?.data ? roadmaps?.data : data).map(
                ({ id, title }: { id: number; title: string }) => (
                  <UnstyledButton key={id} component={Link} to={`/roadmap/${id}`} onClick={close}>
                    <Group spacing='xs'>
                      <Text size='md'>{title}</Text>
                    </Group>
                  </UnstyledButton>
                ),
              )}
            </Stack>
          </Stack>
        </Drawer>
      </MediaQuery>
    </>
  );
};

export default MobileNavbar;
