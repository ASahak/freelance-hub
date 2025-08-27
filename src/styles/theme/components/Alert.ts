import { defineStyleConfig } from '@chakra-ui/react'

export default defineStyleConfig({
  baseStyle: {
    container: {
      padding: 5
    },
    title: {
      marginBottom: 2,
      fontWeight: 500,
      fontSize: '1.4rem'
    },
    description: {
      fontSize: '1.3rem'
    },
    icon: {
      width: '2rem'
    }
  },
  variants: {
    error: () => ({
      container: {
        background: '#FB30301A',
        boxShadow: '0 0 0px 0.5px #FB3030',
        borderRadius: '0.571rem',
        padding: '1.2rem'
      },
      description: {
        fontSize: '1.4rem',
        lineHeight: '2.2rem'
      }
    }),
    warning: () => ({
      container: {
        background: '#F0B5421A',
        boxShadow: '0 0 0px 0.5px #F0B542',
        borderRadius: '0.571rem',
        padding: '1.2rem'
      },
      description: {
        fontSize: '1.4rem',
        lineHeight: '2.2rem'
      }
    }),
    info: () => ({
      container: {
        background: 'blue.100',
        boxShadow: '0 0 0px 0.5px var(--chakra-colors-blue-200)',
        borderRadius: '0.571rem',
        padding: '1.2rem'
      },
      description: {
        fontSize: '1.4rem',
        lineHeight: '2.2rem'
      }
    })
  }
})
