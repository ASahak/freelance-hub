import { defineStyleConfig } from '@chakra-ui/react';

import { getExactUnit } from '@/utils/helpers/global';

export default defineStyleConfig({
  baseStyle: {
    fontFamily: 'inherit',
    textAlign: 'left',
  },
  sizes: {},
  variants: {
    base: ({ colorMode }) => ({
      root: {},
      tablist: {
        borderRadius: '1rem',
        bgColor:
          colorMode === 'dark'
            ? 'var(--chakra-colors-gray-800)'
            : 'var(--chakra-colors-gray-50)',
      },
      tab: {
        borderRadius: '0.8rem',
        w: 'full',
        fontSize: '1.4rem',
        fontWeight: '400',
        textAlign: 'center',
        border: '1px solid transparent',
        color:
          colorMode === 'dark'
            ? 'var(--chakra-colors-gray-300)'
            : 'var(--chakra-colors-gray-450)',
        _selected: {
          border: '1px solid',
          borderColor:
            colorMode === 'dark'
              ? 'var(--chakra-colors-gray-600)'
              : 'var(--chakra-colors-gray-150)',
          color: 'blue.300',
          bgColor:
            colorMode === 'dark' ? 'var(--chakra-colors-gray-700)' : 'white',
        },
      },
    }),
    variable_stable: ({ colorMode, size }) => ({
      root: {
        w: 'full',
      },
      tablist: {
        w: 'full',
        p: '.4rem',
        gap: '1rem',
        borderRadius: '1rem',
        bgColor:
          colorMode === 'dark' ? 'var(--chakra-colors-gray-700)' : 'white',
      },
      tab: {
        borderRadius: '0.8rem',
        w: 'full',
        fontSize: '1.8rem',
        lineHeight: '2.4rem',
        gap: '0.8rem',
        py: getExactUnit(size, {
          lg: '1.1rem',
          md: '1rem',
          sm: '1rem',
        }),
        px: '2.4rem',
        fontWeight: '400',
        textAlign: 'center',
        border: '1px solid transparent',
        color: colorMode === 'dark' ? 'var(--chakra-colors-gray-300)' : 'black',
        _selected: {
          border: '1px solid',
          borderColor:
            colorMode === 'dark'
              ? 'var(--chakra-colors-gray-600)'
              : 'var(--chakra-colors-gray-150)',
          color: colorMode === 'dark' ? 'white' : 'black',
          bgColor:
            colorMode === 'dark'
              ? 'var(--chakra-colors-gray-800)'
              : 'var(--chakra-colors-gray-50)',
        },
      },
    }),
  },
  defaultProps: {},
});
