'use client'

import React, { type ReactNode } from 'react'

import {
  ChakraProvider as _ChakraProvider,
  cookieStorageManagerSSR,
  UseToastOptions
} from '@chakra-ui/react'

import theme from '@/styles/theme'
import { Toast } from '@/components/ui'

export const ChakraProvider = ({
  children,
  cookieStore
}: {
  children: ReactNode
  cookieStore: string
}) => {
  const colorModeManager = cookieStorageManagerSSR(cookieStore)

  return (
    <_ChakraProvider
      theme={theme}
      colorModeManager={colorModeManager}
      toastOptions={{
        defaultOptions: {
          duration: 4000,
          position: 'top-right', // it has styles with this keyword in the globalStyles.ts file
          render: (props: UseToastOptions) => <Toast {...props} />
        }
      }}
    >
      {children}
    </_ChakraProvider>
  )
}
