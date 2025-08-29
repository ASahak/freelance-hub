'use client'

import {
  ReactSkeletonProvider,
  SKELETON_ANIMATION_VARIANTS
} from 'react-skeleton-builder'
import {
  GlobalVariablesProvider,
  PopupProvider,
  TanStackQueryProvider
} from '@/providers'
import { IChildren } from '@/common/types/global'

import Popup from '@/components/popup'

export const RootProvider = ({ children }: IChildren) => {
  return (
    <ReactSkeletonProvider
      value={{
        skeletonAnimation: 'slide' as SKELETON_ANIMATION_VARIANTS,
        isDark: true,
        colorTheme: {
          dark: {
            main: 'var(--chakra-colors-gray-700)',
            gradient: 'var(--chakra-colors-gray-600)'
          },
          light: { main: '#f1f1f1', gradient: '#ececec' }
        }
      }}
    >
      <TanStackQueryProvider>
        <GlobalVariablesProvider>
          <PopupProvider>
            {children}
            <Popup />
          </PopupProvider>
        </GlobalVariablesProvider>
      </TanStackQueryProvider>
    </ReactSkeletonProvider>
  )
}
