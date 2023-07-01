import { MantineThemeOverride, Tuple, DefaultMantineColor } from '@mantine/core';

type ExtendColors = 'primaryBlue' | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendColors, Tuple<string, 10>>;
  }
}

const primaryBlue: Tuple<string, 10> = [
  '#C9D6EB',
  '#C9D6EB',
  '#B2C6E5',
  '#9CB7E0',
  '#86A8DB',
  '#7099D6',
  '#5A8AD1',
  '#437ACB',
  '#2E6BC7',
  '#175BC1',
];

// https://github.com/mantinedev/mantine/blob/master/src/mantine-styles/src/theme/default-theme.ts

export const mantineTheme: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    primaryBlue,
  },
  primaryColor: 'primaryBlue',

  other: {
    fontWeights: {
      medium: 500,
      semibold: 600,
    },
  },

  fontFamily: 'Roboto, sans-serif',
  fontFamilyMonospace: 'Roboto, sans-serif',
  headings: { fontFamily: 'Roboto, sans-serif', fontWeight: 600 },
};
