import { defineStyleConfig } from '@chakra-ui/react';

import { getExactUnit } from '@/utils/helpers/global';

export default defineStyleConfig({
  baseStyle: {
    fontFamily: 'inherit',
    wordBreak: 'break-all',
    padding: '0',
  },
  sizes: {
    sm: {
      fontSize: '0.8rem',
      padding: '0.2rem 0.6rem',
      height: '2.2rem',
    },
    md: {
      fontSize: '1.2rem',
      height: '2.9rem',
      padding: '0.5rem 0.8rem',
    },
    lg: {
      fontSize: '1.5rem',
      height: '3.5rem',
      padding: '0.8rem 1.4rem',
    },
  },
  variants: {
    'pill-success-fill': ({ size, colorMode }) => ({
      gap: 2,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '1.2rem',
      bgColor: colorMode === 'dark' ? '#10bc6f38' : 'green.100',
      border: '1px solid',
      borderColor: 'var(--chakra-colors-green-300)',
      color: colorMode === 'dark' ? 'gray.100' : 'gray.800',
      h: 'fit-content',
      lineHeight: 'initial',
      textTransform: 'capitalize',
      fontSize: getExactUnit(size, {
        lg: '1.4rem',
        md: '1.2rem',
        sm: '1rem',
      }),
      fontWeight: 500,
    }),
    'pill-warn-fill': ({ size, colorMode }) => ({
      gap: 2,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '1.2rem',
      bgColor: colorMode === 'dark' ? '#f19d5524' : 'orange.100',
      border: '1px solid',
      borderColor: 'var(--chakra-colors-orange-200)',
      color: colorMode === 'dark' ? 'gray.100' : 'gray.800',
      h: 'fit-content',
      lineHeight: 'initial',
      textTransform: 'capitalize',
      fontSize: getExactUnit(size, {
        lg: '1.4rem',
        md: '1.2rem',
        sm: '1rem',
      }),
      fontWeight: 500,
    }),
    'pill-danger-fill': ({ size, colorMode }) => ({
      gap: 2,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '1.2rem',
      bgColor: colorMode === 'dark' ? '#f19d5524' : 'red.100',
      border: '1px solid',
      borderColor: 'var(--chakra-colors-red-200)',
      color: colorMode === 'dark' ? 'gray.100' : 'gray.800',
      h: 'fit-content',
      lineHeight: 'initial',
      textTransform: 'capitalize',
      fontSize: getExactUnit(size, {
        lg: '1.4rem',
        md: '1.2rem',
        sm: '1rem',
      }),
      fontWeight: 500,
    }),
  },
  defaultProps: {
    size: 'md',
  },
});
