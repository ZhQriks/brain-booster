import React from 'react';

import {
  createStyles,
  Group,
  keyframes,
  MediaQuery,
  Navbar as MantineNavbar,
  ScrollArea,
  Title,
  Tooltip,
  Transition,
  useMantineTheme,
} from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { IconSquareToggle } from '@tabler/icons';
import { Link, useLocation } from 'react-router-dom';

const resizeAnimation = keyframes({
  'from, 0%, to': {
    width: 0,
    height: 0,
  },
  '50%': {
    width: 12,
    height: 12,
  },
  '100%': {
    width: 0,
    height: 0,
  },
});

const useStyles = createStyles(theme => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    padding: 12,
    marginBottom: 12,
    borderRadius: theme.radius.md,
    transition: 'all 200ms',
    color: theme.white,
    backgroundColor: '#2E6BC7',

    '&:hover': {
      color: theme.colorScheme === 'dark' ? theme.white : '#6894D7',
    },
  },

  linkActive: {
    backgroundColor: '#6894D7',
    '&, &:hover': {
      backgroundColor: '#6894D7',
      boxShadow: `${theme.fn.rgba('#6894D7', 0.2)} 0px 18px 50px -10px`,
      color: theme.white,
    },
  },

  logo: {
    textDecoration: 'none',
    color: theme.white,
  },

  logoStar: {
    position: 'relative',
    '::before': {
      boxShadow: `0 0 88px 12px ${'#6894D7'}`,
      content: '" "',
      borderRadius: '50%',
      height: 12,
      width: 12,
      position: 'absolute',
      animation: `${resizeAnimation} 5s linear infinite`,
      zIndex: -1,

      top: 14,
      left: 15,
    },
  },
}));

const Navbar = ({
  opened,
  handleCloseHeader,
}: {
  opened: boolean;
  handleCloseHeader: () => void;
}): JSX.Element => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const { pathname } = useLocation();
  const data = [
    {
      link: '/roadmap',
      label: 'Sample roadmap',
    },
    {
      link: '/roadmap/2',
      label: 'Тема 2',
    },
  ];

  const [wrapped, { toggle }] = useDisclosure(false);
  const openedOrNotWrapped = opened || !wrapped;
  const [showRouteLabelDebounced] = useDebouncedValue(openedOrNotWrapped, 300);

  const links = data.map(({ link, label }) => (
    <Link
      key={link}
      to={link}
      className={cx(classes.link, { [classes.linkActive]: link === pathname })}
      onClick={() => {
        if (opened) {
          handleCloseHeader();
        }
      }}
    >
      <Group>
        {openedOrNotWrapped && (
          <Transition
            mounted={showRouteLabelDebounced}
            transition='fade'
            duration={400}
            timingFunction='ease'
          >
            {styles => <span style={{ ...styles }}>{label}</span>}
          </Transition>
        )}
      </Group>
    </Link>
  ));

  const width = wrapped ? 70 : 303;

  return (
    <>
      <MantineNavbar
        hiddenBreakpoint='md'
        px={16}
        h='100vh'
        pb={40}
        hidden={!opened}
        styles={{
          root: {
            transition: 'all 400ms',
            gap: theme.spacing.md,
            background: '#175BC1',
            border: 'none',
          },
        }}
        width={{ sm: 0, md: width, lg: width }}
      >
        <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
          <MantineNavbar.Section py={40} px={8}>
            <Group position={!opened && wrapped ? 'center' : 'apart'} align='center'>
              <Link to='/' className={classes.logo}>
                <Group spacing='sm'>
                  {openedOrNotWrapped && (
                    <Transition
                      mounted={showRouteLabelDebounced}
                      transition='fade'
                      duration={400}
                      timingFunction='ease'
                    >
                      {styles => (
                        <Title
                          style={opened ? {} : styles}
                          size={28}
                          weight={800}
                          sx={{ letterSpacing: '-0.04em' }}
                        >
                          Brain Booster
                        </Title>
                      )}
                    </Transition>
                  )}
                </Group>
              </Link>

              <Tooltip position='right' label={`${wrapped ? 'Show' : 'Hide'} navigation`}>
                <span style={{ display: 'flex' }}>
                  <IconSquareToggle
                    size={24}
                    fill='#1B3966'
                    color='#1B3966'
                    cursor='pointer'
                    onClick={toggle}
                  />
                </span>
              </Tooltip>
            </Group>
          </MantineNavbar.Section>
        </MediaQuery>

        <MediaQuery
          smallerThan='md'
          styles={{
            link: {
              border: 'white',
            },
            linkActive: {
              '&, &:hover': {
                color: theme.colorScheme === 'dark' ? 'white' : 'black',
              },
            },
          }}
        >
          <MantineNavbar.Section grow component={ScrollArea} pr={12} mr={-12} mb={theme.spacing.sm}>
            {links}
          </MantineNavbar.Section>
        </MediaQuery>
      </MantineNavbar>
    </>
  );
};

export default Navbar;
