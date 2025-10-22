import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
  baseStyle: ({ colorMode }) => ({
    container: {},
    thumb: {
      bg: 'white',
    },
    track: {
      bg: colorMode === 'dark' ? 'gray.900' : 'gray.120',
      border: '1px solid',
      borderColor: colorMode === 'dark' ? 'gray.800' : 'gray.120',
      _checked: {
        bg: 'blue.300',
      },
    },
  }),
  variants: {
    green: ({ colorMode }) => ({
      container: {},
      thumb: {
        bg: 'white',
      },
      track: {
        bg: colorMode === 'dark' ? 'gray.500' : 'gray.300',
        border: '1px solid',
        borderColor: colorMode === 'dark' ? 'gray.500' : 'gray.300',
        _checked: {
          bg: 'green.200',
          borderColor: 'green.200',
        },
      },
    }),
    strongGreen: ({ colorMode }) => ({
      track: {
        bg: colorMode === 'dark' ? 'gray.500' : 'gray.300',
        borderColor: colorMode === 'dark' ? 'gray.500' : 'gray.300',
        _checked: {
          bg: 'green.200',
          borderColor: 'green.200',
        },
      },
    }),
  },
  defaultProps: {},
});
