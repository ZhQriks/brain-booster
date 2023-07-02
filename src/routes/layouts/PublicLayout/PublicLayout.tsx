import React from 'react';

import {
  AppShell,
  Header,
  Container,
  createStyles,
  useMantineTheme,
  Group,
  Title,
  Anchor,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import GenerationPhoto from 'assets/images/generation.png';
import useCurrentRoute from 'hooks/useCurrentRoute';
import { useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import useCreateRoadmap from "../../../query/createRoadmap";

const useStyles = createStyles(theme => ({
  content: {
    background: theme.colorScheme === 'dark' ? '#FFFFFF' : '#FFFFFF',
    borderRadius: 20,
    height: '100%',
  },
}));
const PublicLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const currentRoute = useCurrentRoute();
  const location = useLocation();

  const [isBackgroundGenerate, setIsBackgroundGenerate] = React.useState(false);

  const theme = useMantineTheme();
  const { classes } = useStyles();

  const [opened, { close }] = useDisclosure(false);
  React.useEffect(() => {
    if (location.pathname === '/generate-roadmap') {
      setIsBackgroundGenerate(true);
    }
  }, [location]);
  return (
    <>
      <AppShell
        header={
          !currentRoute.startsWith('/roadmap') ? (
            <Header height={60} p='xs' bg='#175BC1' sx={{ border: 'none' }}>
              <Group position='apart' px={20}>
                <Title color='white' order={2}>
                  Brain Booster
                </Title>

                <Group>
                  <Anchor href='/generate-roadmap' color='white'>
                    Generate New
                  </Anchor>
                  <Anchor href='/roadmap/1' color='white'>
                    Roadmaps
                  </Anchor>
                </Group>
              </Group>
            </Header>
          ) : undefined
        }
        padding={0}
        navbar={
          currentRoute.startsWith('/roadmap') ? (
            <Navbar opened={opened} handleCloseHeader={close} />
          ) : undefined
        }
        styles={{
          root: {
            height: '100%',
          },
          main: {
            background: '#175BC1',
            paddingTop: 24,
            paddingBottom: 24,
          },
          body: {
            background: '#175BC1',
          },
        }}
      >
        <div
          className={classes.content}
          style={{
            backgroundImage: isBackgroundGenerate ? `url(${GenerationPhoto})` : '',
          }}
        >
          <Container py={20}>{children}</Container>
        </div>
      </AppShell>
    </>
  );
};

export default PublicLayout;
