import { defineStyleConfig } from '@chakra-ui/react'

export default defineStyleConfig({
  baseStyle: {},
  sizes: {},
  variants: {
    base: ({ colorMode }) => ({
      list: {
        boxShadow: '0px 4px 16px 0px #070F1A29',
        borderRadius: '1.2rem',
        py: '1.2rem',
        display: 'flex',
        flexDirection: 'column',
        touchAction: 'none',
        width: '100%',
        backgroundColor: colorMode === 'dark' ? 'gray.560' : 'white'
      },
      item: {
        bgColor: 'transparent',
        color: colorMode === 'dark' ? 'white' : 'black',
        px: '1.6rem',
        py: '1.2rem',
        _hover: {
          bgColor: colorMode === 'dark' ? '#FFFFFF0A' : '#E3E5E8'
        },
        _active: {
          bgColor: colorMode === 'dark' ? '#FFFFFF0A' : '#AFB4BC'
        },
        _focus: {
          bgColor: colorMode === 'dark' ? '#FFFFFF0A' : '#E3E5E8'
        }
      }
    })
  },
  defaultProps: {}
})
