'use client'

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState
} from 'react'
import { isMobile as isMobileNative } from 'react-device-detect'
import { useBreakpointValue } from '@chakra-ui/react'
import { IChildren } from '@/common/types/global'

export interface GlobalVariablesType {
  isMobile: boolean
  navDrawerIsOpen: boolean
  setNavDrawerIsOpen: Dispatch<SetStateAction<boolean>>
}

export const GlobalVariablesContext = createContext<
  GlobalVariablesType | undefined
>(undefined)

export const useGlobalVariables = (): GlobalVariablesType => {
  const context = useContext(GlobalVariablesContext)

  if (context === undefined) {
    throw new Error(
      'useGlobalVariables must be used within a GlobalVariablesProvider'
    )
  }

  return context
}

export const GlobalVariablesProvider = ({ children }: IChildren) => {
  const [navDrawerIsOpen, setNavDrawerIsOpen] = useState(false)
  const isMobile: boolean | undefined = useBreakpointValue(
    { base: true, md: false },
    { ssr: true }
  )
  const _value = useMemo(
    () => ({
      // isMobile: !!(isMobile && isMobileNative),
      isMobile,
      navDrawerIsOpen,
      setNavDrawerIsOpen
    }),
    [navDrawerIsOpen, isMobile]
  )

  return (
    <GlobalVariablesContext.Provider value={_value}>
      {children}
    </GlobalVariablesContext.Provider>
  )
}
