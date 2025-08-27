import { defineStyleConfig } from '@chakra-ui/react'

export default defineStyleConfig({
  baseStyle: {
    fontFamily: 'inherit',
    textAlign: 'initial'
  },
  sizes: {},
  variants: {
    infoTitle: ({ colorMode }) => ({
      fontSize: '1.4rem',
      fontWeight: '400',
      color: colorMode === 'dark' ? 'gray.300' : 'gray.450'
    }),
    privacyText: ({ colorMode }) => ({
      fontFamily: 'Montserrat, sans-serif',
      marginBottom: '1.6rem',
      fontSize: '1.6rem',
      lineHeight: '2.4rem',
      color: colorMode === 'dark' ? 'white' : 'gray.800'
    })
  },
  defaultProps: {}
})
