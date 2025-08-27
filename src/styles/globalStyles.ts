import { isMobile } from 'react-device-detect'

import { mode } from '@chakra-ui/theme-tools'

import theme from '@/styles/theme'

export default {
  global: (props: any) => ({
    ':root': {
      '--toast-z-index': theme.zIndices.toast,
      '--header-height': '6.8rem'
    },
    html: {
      fontSize: '10px',
      [`@media only screen and (min-width: ${props.theme.breakpoints['4xl']})`]:
        {
          fontSize: '18px'
        }
    },
    'body *': {
      fontFamily:
        'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    },
    body: {
      bgColor: 'gray.10',
      ...(!isMobile && {
        overflow: 'hidden'
      })
    },
    '#chakra-toast-manager-top-right': {
      top: '10rem !important'
    },
    '.w-full': {
      width: '100%'
    },
    '.sr-only': {
      border: '0 !important',
      clip: 'rect(1px, 1px, 1px, 1px) !important',
      WebkitClipPath: 'inset(50%) !important',
      clipPath: 'inset(50%) !important',
      height: '1px !important',
      margin: '-1px !important',
      overflow: 'hidden !important',
      padding: '0 !important',
      position: 'absolute !important',
      width: '1px !important',
      whiteSpace: 'nowrap !important'
    },
    /*Mobile bottom drawer*/
    '.mobile-drawer-blur-backdrop:not(:has(.mobile-bottom-drawer-container .mobile-drawer-blur-backdrop))':
      {
        backdropFilter: 'blur(3px)'
      },
    /*_____________*/
    // Custom scrollbar
    '.increase-height-hover': {
      transition: 'width .1s',
      '&:hover, &:active': {
        width: '.8rem !important'
      }
    },
    '.increase-width-hover': {
      transition: 'height .1s',
      '&:hover, &:active': {
        height: '.8rem !important'
      }
    },
    // _________
    '.non-visible-scroll': {
      '@media screen and (hover: hover)': {
        '::-webkit-scrollbar': {
          width: '0px',
          height: '0px'
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: 'transparent'
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: 'transparent'
        }
      }
    },
    '.prevent_rtl': {
      direction: 'ltr',
      textAlign: 'left'
    }
  })
}
