import { defineStyleConfig } from '@chakra-ui/react'

export default defineStyleConfig({
  baseStyle: {
    fontFamily: 'inherit'
  },
  sizes: {
    sm: {
      field: {
        h: '3.2rem',
        fontSize: '1rem',
        p: '.7rem 1rem',
        rounded: '0.4rem'
      }
    },
    md: {
      field: {
        h: '4rem',
        fontSize: '1.4rem',
        p: '.9rem 1.2rem',
        rounded: '0.6rem'
      }
    },
    lg: {
      field: {
        h: '4.8rem',
        fontSize: '1.6rem',
        p: '1.2rem 1.6rem',
        rounded: '0.8rem'
      }
    }
  },
  variants: {
    base: {
      border: '1px solid',
      borderColor: 'gray.150',
      boxShadow: 'none',
      borderRadius: '0.8rem ',
      bgColor: 'white',
      color: 'black',
      fontSize: '1.4rem',
      py: '1.2rem',
      px: '1.4rem',
      _placeholder: {
        color: 'gray.400'
      },
      _invalid: {
        borderColor: 'red.400'
      },
      _focus: {
        borderColor: 'blue.300'
      }
    }
  },
  defaultProps: {}
})
