'use client'

import { Flex, VStack } from '@chakra-ui/react'
import Header from './header'
import Footer from './footer'
import { IChildren } from '@/common/types/global'
import { AnimatedPage } from '@/components/features'

const NudeLayout = ({ children }: IChildren) => {
  return (
    <Flex w="full" h="100dvh" align="center" justify="center" bg="gray.50">
      <AnimatedPage>{children}</AnimatedPage>
    </Flex>
  )
}
export default NudeLayout
