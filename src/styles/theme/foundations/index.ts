import colors from './colors'
export default {
  shadows: {
    md: '0 0.9rem 3.4rem -0.4rem rgba(0, 0, 0, 0.05)'
  },
  colors,
  zIndices: {
    modal: 10000,
    toast: 10002,
    popover: 10001
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
    disableTransitionOnChange: false
  }
}
