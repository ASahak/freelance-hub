import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
  baseStyle: ({ colorMode }) => ({
    outlineOffset: '1px',
    border: '1px solid',
    borderColor: colorMode === 'dark' ? 'gray.800' : 'gray.120',
    backgroundColor: colorMode === 'dark' ? 'gray.900' : 'white',
    fontSize: '1.6rem',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '600',
    rounded: '0.5rem',
    h: 'auto',
    gap: '0.1rem',
    _hover: {},
  }),
  sizes: {
    sm: {
      fontSize: '1rem',
      p: '.7rem 1rem',
      rounded: '0.4rem',
    },
    md: {
      fontSize: '1.4rem',
      p: '.9rem 1.2rem',
      rounded: '0.6rem',
    },
    lg: {
      fontSize: '1.6rem',
      p: '1.2rem 1.6rem',
      rounded: '0.8rem',
    },
  },
  variants: {
    unstyled: {
      border: 'none',
      bgColor: 'transparent !important',
      h: 'auto',
      minW: 'auto',
      w: 'auto',
      p: 0,
    },
    input: {
      border: '1px solid',
      borderColor: 'gray.150',
      boxShadow: 'none',
      borderRadius: '0.8rem ',
      fontWeight: 400,
      bgColor: 'white',
      color: 'black',
      fontSize: '1.4rem',
      py: '1.2rem',
      px: '1.4rem',
      h: '4rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      _hover: {
        bgColor: 'transparent',
        borderColor: 'blue.300',
      },
      _active: {
        bgColor: 'transparent',
        borderColor: 'blue.300',
        _hover: {
          borderColor: 'blue.300',
        },
      },
      _focus: {
        boxShadow: 'none',
        bgColor: 'transparent',
        borderColor: 'blue.300',
        _hover: {
          borderColor: 'blue.300',
        },
      },
      _disabled: {
        opacity: 0.5,
      },
      _invalid: {
        borderColor: 'red.300',
      },
    },
    'pagination-btn': ({ colorMode }) => ({
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '500',
      color: colorMode === 'dark' ? '#fff' : '#000',
      bgColor: 'transparent',
      border: 'none',
      h: '4rem',
      w: '4rem',
      rounded: '0.8rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1.4rem',
      _focus: {
        boxShadow: '0px 0px 0px 1px transparent',
        outline:
          colorMode === 'dark'
            ? '1px solid var(--chakra-colors-blue-250)'
            : '1px solid var(--chakra-colors-blue-300)',
      },
      _disabled: {
        opacity: 1,
        color:
          colorMode === 'dark' ? '#373A43 !important' : '#AFB4BC !important',
      },
    }),
    primary: () => ({
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '600',
      color: 'gray.100',
      bgColor: 'blue.250',
      rounded: '0.6rem',
      h: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      _hover: {
        bg: 'blue.350 !important',
        _disabled: {
          bg: 'blue.250 !important',
        },
      },
      _active: {
        bg: 'blue.450',
      },
      _focus: {
        boxShadow: '0px 0px 0px 1px transparent',
        outline: '1px solid var(--chakra-colors-blue-250)',
      },
      _disabled: {
        opacity: 0.6,
      },
    }),
    purple: () => ({
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '600',
      color: 'white',
      bgColor: 'purple.300',
      rounded: '0.6rem',
      h: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      _hover: {
        bg: 'purple.400',
      },
      _active: {
        bg: 'purple.400',
      },
      _focus: {
        boxShadow: '0px 0px 0px 1px transparent',
        outline: '1px solid var(--chakra-colors-purple-200)',
      },
      _disabled: {
        opacity: 1,
        bg: 'var(--chakra-colors-gray-250) !important',
        color: 'var(--chakra-colors-gray-150) !important',
      },
    }),
    light: ({ colorMode }) => ({
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '600',
      color:
        colorMode === 'dark'
          ? 'var(--chakra-colors-blue-250)'
          : 'var(--chakra-colors-blue-300)',
      bgColor:
        colorMode === 'dark'
          ? 'var(--chakra-colors-blue-800)'
          : 'var(--chakra-colors-blue-100)',
      h: 'auto',
      rounded: '0.6rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      lineHeight: '20px',
      border: 'none',
      _hover: {
        bg: colorMode === 'dark' ? '#293552' : '#BFD3FD',
      },
      _active: {
        bg: colorMode === 'dark' ? '#354569' : '#97B8FC',
      },
      _focus: {
        boxShadow: '0px 0px 0px 1px transparent',
        outline:
          colorMode === 'dark'
            ? '1px solid var(--chakra-colors-blue-300)'
            : '1px solid var(--chakra-colors-blue-250)',
      },
      _disabled: {
        opacity: 1,
        bgColor:
          colorMode === 'dark'
            ? 'var(--chakra-colors-gray-550) !important'
            : 'var(--chakra-colors-gray-250) !important',
        color:
          colorMode === 'dark'
            ? 'var(--chakra-colors-gray-800) !important'
            : 'var(--chakra-colors-gray-150) !important',
      },
    }),
    outline: ({ colorMode }) => ({
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '600',
      border: '1px solid',
      borderColor:
        colorMode === 'dark'
          ? 'var(--chakra-colors-blue-250)'
          : 'var(--chakra-colors-blue-300)',
      color:
        colorMode === 'dark'
          ? 'var(--chakra-colors-blue-250)'
          : 'var(--chakra-colors-blue-300)',
      bgColor: 'transparent',
      h: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      lineHeight: '20px',
      _hover: {
        bg: colorMode === 'dark' ? '#293552' : '#BFD3FD',
      },
      _active: {
        bg: colorMode === 'dark' ? '#354569' : '#97B8FC',
      },
      _focus: {
        boxShadow: '0px 0px 0px 1px transparent',
        outline:
          colorMode === 'dark'
            ? '1px solid var(--chakra-colors-blue-250)'
            : '1px solid var(--chakra-colors-blue-300)',
      },
      _disabled: {
        opacity: 1,
        bg: 'transparent !important',
        color:
          colorMode === 'dark' ? '#373A43 !important' : '#AFB4BC !important',
        borderColor:
          colorMode === 'dark' ? '#373A43 !important' : '#AFB4BC !important',
      },
    }),
    connect: ({ colorMode }) => ({
      fontSize: '1.3rem',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '600',
      bg: colorMode === 'dark' ? 'gray.600' : 'gray.50',
      border: 'none',
      rounded: '1.2rem',
      display: 'flex',
      justifyContent: 'flex-start',
      h: 'auto',
      p: '1.2rem',
      gap: '1.2rem',
      _hover: {
        bgColor: colorMode === 'dark' ? 'gray.560' : 'gray.60',
      },
    }),
    danger: {
      fontSize: '1.3rem',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '600',
      color: 'white',
      bg: 'red.300',
      rounded: '0.6rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      h: 'auto',
      _hover: {
        bgColor: 'red.400',
      },
    },
  },
  defaultProps: {},
});
