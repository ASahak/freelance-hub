import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
  baseStyle: {},
  sizes: {},
  variants: {
    primary: () => ({
      icon: {
        h: '1.8rem',
        w: '1.8rem',
        color: 'white',
        fontSize: '0.9rem',
      },
      control: {
        borderRadius: 'md',
        border: '2px solid',
        borderColor: 'gray.500',
        verticalAlign: 'middle',
        h: '1.8rem',
        w: '1.8rem',
        _checked: {
          _hover: {
            backgroundColor: 'blue.500',
            borderColor: 'blue.500',
          },
          _disabled: {
            backgroundColor: 'gray.300',
          },
          _invalid: {
            backgroundColor: 'red.700',
            borderColor: 'red.700',
            _hover: {
              borderColor: 'red.700',
            },
          },
          backgroundColor: 'blue.300',
          borderColor: 'blue.300',
        },
        _hover: {
          borderColor: 'brand.600',
        },
        _disabled: {
          borderColor: 'gray.200',
          backgroundColor: 'white',
          _hover: {
            borderColor: 'gray.200',
          },
        },
        _invalid: {
          borderColor: 'red.700',
          _hover: {
            borderColor: 'red.700',
          },
        },
        _indeterminate: {
          backgroundColor: 'blue.300',
          borderColor: 'blue.300',
          _hover: {
            borderColor: 'transparent',
          },
          _invalid: {
            borderColor: 'red.700',
            backgroundColor: 'red.700',
            _hover: {
              borderColor: 'red.700',
            },
          },
        },
      },
      label: {
        fontSize: '1.4rem',
      },
    }),
  },
  defaultProps: {},
});
