import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
  baseStyle: {},
  sizes: {},
  variants: {
    base: {
      list: {
        boxShadow: '0px 4px 16px 0px #070F1A29',
        borderRadius: '1.2rem',
        py: '1.2rem',
        display: 'flex',
        flexDirection: 'column',
        touchAction: 'none',
        width: '100%',
        backgroundColor: 'white',
      },
      item: {
        bgColor: 'transparent',
        color: 'black',
        px: '1.6rem',
        py: '1.2rem',
        _hover: {
          bgColor: 'gray.150',
        },
      },
    },
  },
  defaultProps: {},
});
