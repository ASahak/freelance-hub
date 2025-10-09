import { defineStyleConfig } from '@chakra-ui/react'

export default defineStyleConfig({
  baseStyle: {
    fontFamily: 'inherit'
  },
  sizes: {},
  variants: {
    'amount-input': ({ colorMode }) => ({
      field: {
        border: 'none',
        transition: 'box-shadow .3s',
        boxShadow: '0px 0px 2px 1px transparent',
        borderRadius: 'md',
        bgColor: 'transparent',
        color: colorMode === 'dark' ? 'white' : 'black',
        fontSize: '1.2rem',
        pl: 0,
        _placeholder: {
          color: 'gray.400'
        },
        _invalid: {
          borderColor: 'red.400'
        },
        _focus: {
          boxShadow: 'none',
          borderColor: 'transparent'
        }
      }
    }),
    base: ({ colorMode }) => ({
      field: {
        border: '1px solid',
        borderColor: colorMode === 'dark' ? '#25272D' : '#E3E5E8',
        boxShadow: 'none',
        borderRadius: '0.8rem ',
        bgColor: colorMode === 'dark' ? 'gray.700' : 'white',
        color: colorMode === 'dark' ? 'white' : 'black',
        fontSize: '1.4rem',
        py: '1.2rem',
        px: '1.4rem',
        h: '4rem',
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
    })
  },
  defaultProps: {}
})
