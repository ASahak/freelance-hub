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
    'popover-btn': ({ colorMode }) => ({
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '500',
      color:
        colorMode === 'dark'
          ? 'var(--chakra-colors-blue-300)'
          : 'var(--chakra-colors-gray-450)',
      bgColor: 'transparent',
      borderColor:
        colorMode === 'dark'
          ? 'var(--chakra-colors-gray-600)'
          : 'var(--chakra-colors-gray-150)',
      border: '1px solid',
      rounded: '0.8rem',
      display: 'flex',
      h: 'auto',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '1.4rem',
      _hover: {
        bgColor: 'transparent',
        borderColor:
          colorMode === 'dark'
            ? 'var(--chakra-colors-blue-350)'
            : 'var(--chakra-colors-blue-250)',
      },
      _active: {
        bgColor: 'transparent',
        borderColor:
          colorMode === 'dark'
            ? 'var(--chakra-colors-blue-350)'
            : 'var(--chakra-colors-blue-250)',
        _hover: {
          borderColor:
            colorMode === 'dark'
              ? 'var(--chakra-colors-blue-350)'
              : 'var(--chakra-colors-blue-250)',
        },
      },
      _focus: {
        boxShadow: 'none',
        bgColor: 'transparent',
        borderColor:
          colorMode === 'dark'
            ? 'var(--chakra-colors-blue-350)'
            : 'var(--chakra-colors-blue-250)',
        _hover: {
          borderColor:
            colorMode === 'dark'
              ? 'var(--chakra-colors-blue-350)'
              : 'var(--chakra-colors-blue-250)',
        },
      },
      _disabled: {
        opacity: 0.7,
        borderColor:
          colorMode === 'dark'
            ? 'var(--chakra-colors-gray-600) !important'
            : 'var(--chakra-colors-gray-150) !important',
        color:
          colorMode === 'dark' ? '#373A43 !important' : '#AFB4BC !important',
      },
      _invalid: {
        borderColor:
          colorMode === 'dark'
            ? 'var(--chakra-colors-magenta-350)'
            : 'var(--chakra-colors-red-300)',
      },
    }),
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
    switcher: ({ colorMode }) => ({
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '400',
      color: colorMode === 'dark' ? 'gray.450' : 'gray.300',
      bgColor: colorMode === 'dark' ? 'gray.800' : 'gray.50',
      rounded: { base: '0.5rem', md: '0.7rem' },
      h: { base: '2.4rem', md: '2.8rem' },
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      p: { base: '0 1rem', md: '0.2rem 1rem' },
      fontSize: '1.2rem',
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
    text: ({ colorMode }) => ({
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '600',
      border: 'none',
      p: '.2rem .4rem',
      color:
        colorMode === 'dark'
          ? 'var(--chakra-colors-blue-250)'
          : 'var(--chakra-colors-blue-300)',
      bgColor: 'transparent',
      h: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
      },
    }),
    'primary-magenta': ({ colorMode }) => ({
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '600',
      color: colorMode === 'dark' ? '#F4F4F6' : 'white',
      bgColor:
        colorMode === 'dark' ? 'var(--chakra-colors-magenta-350)' : '#A61F67',
      h: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      _hover: {
        bg: colorMode === 'dark' ? '#ED5AA8' : '#84104E',
      },
      _active: {
        bg: colorMode === 'dark' ? '#F386C0' : '#650639',
      },
      _focus: {
        boxShadow: '0px 0px 0px 1px transparent',
        outline:
          colorMode === 'dark'
            ? '1px solid var(--chakra-colors-magenta-350)'
            : '1px solid #A61F67',
      },
      _disabled: {
        opacity: 1,
        bg: colorMode === 'dark' ? '#373A43 !important' : '#AFB4BC !important',
        color:
          colorMode === 'dark' ? '#191B1F !important' : '#E3E5E8 !important',
      },
    }),
    'light-green': ({ colorMode }) => ({
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '600',
      color:
        colorMode === 'dark'
          ? 'var(--chakra-colors-green-300)'
          : 'var(--chakra-colors-green-400)',
      bgColor:
        colorMode === 'dark'
          ? 'var(--chakra-colors-green-500)'
          : 'var(--chakra-colors-green-100)',
      h: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      _hover: {
        bg:
          colorMode === 'dark'
            ? 'var(--chakra-colors-green-700)'
            : 'var(--chakra-colors-green-150)',
      },
      _active: {
        bg:
          colorMode === 'dark'
            ? 'var(--chakra-colors-green-700)'
            : 'var(--chakra-colors-green-150)',
      },
      _focus: {
        boxShadow: '0px 0px 0px 1px transparent',
        outline:
          colorMode === 'dark'
            ? '1px solid var(--chakra-colors-green-400)'
            : '1px solid var(--chakra-colors-green-400)',
      },
      _disabled: {
        bgColor:
          colorMode === 'dark'
            ? 'var(--chakra-colors-gray-550) !important'
            : 'var(--chakra-colors-gray-250) !important',
        color:
          colorMode === 'dark'
            ? 'var(--chakra-colors-gray-800) !important'
            : 'var(--chakra-colors-gray-150) !important',
        opacity: 1,
      },
    }),
    'light-magenta': ({ colorMode }) => ({
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '600',
      color:
        colorMode === 'dark'
          ? 'var(--chakra-colors-magenta-350)'
          : 'var(--chakra-colors-magenta-400)',
      bgColor:
        colorMode === 'dark'
          ? 'var(--chakra-colors-magenta-800)'
          : 'var(--chakra-colors-magenta-100)',
      h: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      _hover: {
        bg:
          colorMode === 'dark'
            ? 'var(--chakra-colors-magenta-700)'
            : 'var(--chakra-colors-magenta-150)',
      },
      _active: {
        bg:
          colorMode === 'dark'
            ? 'var(--chakra-colors-magenta-600)'
            : 'var(--chakra-colors-magenta-200)',
      },
      _focus: {
        boxShadow: '0px 0px 0px 1px transparent',
        outline:
          colorMode === 'dark'
            ? '1px solid var(--chakra-colors-magenta-350)'
            : '1px solid var(--chakra-colors-magenta-400)',
      },
      _disabled: {
        bgColor:
          colorMode === 'dark'
            ? 'var(--chakra-colors-gray-550) !important'
            : 'var(--chakra-colors-gray-250) !important',
        color:
          colorMode === 'dark'
            ? 'var(--chakra-colors-gray-800) !important'
            : 'var(--chakra-colors-gray-150) !important',
        opacity: 1,
      },
    }),
    'outline-magenta': ({ colorMode }) => ({
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '600',
      border: '1px solid',
      borderColor:
        colorMode === 'dark' ? 'var(--chakra-colors-magenta-350)' : '#A61F67',
      color:
        colorMode === 'dark' ? 'var(--chakra-colors-magenta-350)' : '#A61F67',
      bgColor: 'transparent',
      h: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      _hover: {
        bg: colorMode === 'dark' ? '#49273F' : '#E8C4D8',
      },
      _active: {
        bg: colorMode === 'dark' ? '#643556' : '#DBA3C2',
      },
      _focus: {
        boxShadow: '0px 0px 0px 1px transparent',
        outline:
          colorMode === 'dark'
            ? '1px solid var(--chakra-colors-magenta-350)'
            : '1px solid #A61F67',
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
    'text-magenta': ({ colorMode }) => ({
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '600',
      border: 'none',
      p: '.2rem .4rem',
      color:
        colorMode === 'dark' ? 'var(--chakra-colors-magenta-350)' : '#A61F67',
      bgColor: 'transparent',
      h: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      _hover: {
        bg: colorMode === 'dark' ? '#49273F' : '#E8C4D8',
      },
      _active: {
        bg: colorMode === 'dark' ? '#643556' : '#DBA3C2',
      },
      _focus: {
        boxShadow: '0px 0px 0px 1px transparent',
        outline:
          colorMode === 'dark'
            ? '1px solid var(--chakra-colors-magenta-350)'
            : '1px solid #A61F67',
      },
      _disabled: {
        opacity: 1,
        bg: 'transparent !important',
        color:
          colorMode === 'dark' ? '#373A43  !important' : '#AFB4BC !important',
      },
    }),
    inverse: ({ colorMode }) => ({
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '600',
      border: 'none',
      p: '.2rem .4rem',
      color: colorMode === 'dark' ? '#F4F4F6' : '#09101C',
      bgColor: 'transparent',
      h: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      _hover: {
        bg: colorMode === 'dark' ? '#25272D' : '#E3E5E8',
      },
      _active: {
        bg: colorMode === 'dark' ? '#373A43' : '#AFB4BC',
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
    secondary: ({ colorMode }) => ({
      fontSize: '1.3rem',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '600',
      color: colorMode === 'dark' ? 'blue.250' : 'blue.300',
      bg: colorMode === 'dark' ? '#2366FB14' : '#2366FB14',
      border: 'none',
      rounded: '0.6rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      h: 'auto',
      _hover: {
        bgColor: colorMode === 'dark' ? 'gray.560' : 'gray.60',
      },
    }),
  },
  defaultProps: {},
});
