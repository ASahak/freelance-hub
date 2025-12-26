import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
  baseStyle: {
    fontFamily: 'inherit',
  },
  sizes: {},
  variants: {
    base: {
      field: {
        border: '1px solid',
        borderColor: 'gray.150',
        boxShadow: 'none',
        borderRadius: '0.8rem ',
        bgColor: 'white',
        color: 'black',
        fontSize: '1.4rem',
        py: '1.2rem',
        px: '1.4rem',
        h: '4rem',
        _placeholder: {
          color: 'gray.400',
        },
        _invalid: {
          borderColor: 'red.400',
        },
        _focus: {
          borderColor: 'blue.300',
        },
        _hover: {
          borderColor: 'gray.200',
        },
      },
    },
  },
  defaultProps: {},
});
