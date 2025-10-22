import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
  baseStyle: ({ colorMode }) => ({
    control: {
      borderWidth: '0.1rem',
      borderColor: colorMode === 'dark' ? 'gray.400' : 'gray.350',
      boxSizing: 'initial',
      display: 'flex',
      position: 'relative',
      width: '1.8rem',
      height: '1.8rem',

      _checked: {
        bg: 'white',
        borderColor: colorMode === 'dark' ? 'blue.250' : 'blue.300',
        background: 'none',

        _before: {
          bg: colorMode === 'dark' ? 'blue.250' : 'blue.300',
          margin: 'auto',
          width: '1.2rem !important',
          height: '1.2rem !important',
        },

        _hover: {
          borderColor: colorMode === 'dark' ? 'blue.250' : 'blue.300',
          background: 'none',
        },
      },
    },
  }),
  defaultProps: {},
});
