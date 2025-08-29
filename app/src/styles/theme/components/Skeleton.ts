import { cssVar, defineStyleConfig } from '@chakra-ui/react'

const $startColor = cssVar('skeleton-start-color')
const $endColor = cssVar('skeleton-end-color')

export default defineStyleConfig({
  baseStyle: () => ({
    _light: {
      [$startColor.variable]: 'colors.gray.120',
      [$endColor.variable]: 'colors.gray.50'
    },
    _dark: {
      [$startColor.variable]: 'colors.gray.800',
      [$endColor.variable]: 'colors.gray.600'
    }
  }),
  variants: {
    gray: {
      _light: {
        [$startColor.variable]: 'colors.gray.60',
        [$endColor.variable]: 'colors.gray.100'
      },
      _dark: {
        [$startColor.variable]: 'colors.gray.800',
        [$endColor.variable]: 'colors.gray.600'
      }
    }
  },
  defaultProps: {}
})
