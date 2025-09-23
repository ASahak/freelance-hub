'use client'

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useBreakpointValue, useToast } from '@chakra-ui/react'
import { IChildren } from '@/common/types/global'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

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
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const serverError = searchParams.get('serverError')
  const toast = useToast()
  const isMobile: boolean | undefined = useBreakpointValue(
    { base: true, md: false },
    { ssr: false }
  )
  const _value = useMemo(
    () => ({
      isMobile: !!isMobile,
      navDrawerIsOpen,
      setNavDrawerIsOpen
    }),
    [navDrawerIsOpen, isMobile]
  )

  useEffect(() => {
    if (serverError) {
      toast({
        title: serverError,
        status: 'error'
      })
      const params = new URLSearchParams(searchParams.toString())

      params.delete('serverError')

      router.push(`${pathname}?${params.toString()}`)
    }
  }, [serverError])

  return (
    <GlobalVariablesContext.Provider value={_value}>
      {children}
    </GlobalVariablesContext.Provider>
  )
}
