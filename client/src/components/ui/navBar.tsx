'use client'

import {
  Flex,
  Button,
  Icon,
  Link,
  useDisclosure,
  HStack,
  VStack
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { memo } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/common/constants/routes'
import { RemoveScroll } from 'react-remove-scroll'
import { AnimatePresence, domAnimation, LazyMotion, m } from 'motion/react'
import { Logo, Container } from '@/components/ui'
import { useAuth } from '@/providers/authProvider'
import { User } from '@/components/layout/header/user'

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Find Geeks',
    href: ROUTES.GEEKS
  },
  {
    label: 'Find Work',
    href: ROUTES.JOBS
  },
  {
    label: 'Post a Job',
    href: ROUTES.CREATE_JOB
  }
]
const variants = {
  initial: { opacity: 0, x: 0, y: -40 },
  in: { opacity: 1, x: 0, y: 0 }
}
const drawerTransition = {
  ease: 'linear',
  duration: 0.2
}
export const NavBar = memo(() => {
  const { isOpen, onToggle } = useDisclosure()
  const router = useRouter()
  const { user } = useAuth()

  return (
    <Flex
      flex={1}
      justifyContent="flex-end"
      gap={{ base: 6, md: 16 }}
      align="center"
    >
      <Flex display={{ base: 'none', md: 'flex' }}>
        {NAV_ITEMS.map((navItem) => (
          <Link
            p={6}
            fontSize="1.5rem"
            fontWeight={500}
            color="gray.400"
            _hover={{
              textDecoration: 'none',
              color: 'gray.500'
            }}
            as={NextLink}
            key={navItem.label}
            href={navItem.href}
          >
            {navItem.label}
          </Link>
        ))}
      </Flex>
      {user ? (
        <User data={user} />
      ) : (
        <Flex gap={6}>
          <Link
            as={NextLink}
            href={ROUTES.SIGN_IN}
            fontSize="1.5rem"
            fontWeight={600}
            px="1rem"
            h="4rem"
            display="flex"
            alignItems="center"
          >
            Log in
          </Link>
          <Button variant="primary" onClick={() => router.push(ROUTES.SIGN_UP)}>
            Sign Up
          </Button>
        </Flex>
      )}
      <Flex display={{ base: 'flex', md: 'none' }}>
        <Button
          variant="popover-btn"
          p={0}
          w="4rem"
          h="4rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={onToggle}
        >
          <Icon as={HamburgerIcon} fontSize="3rem" />
        </Button>
        <RemoveScroll
          enabled={isOpen}
          style={{ position: 'relative', zIndex: 0 }}
        >
          <Flex
            position="fixed"
            left="0"
            top="0"
            h="100dvh"
            zIndex={1}
            flexDir="column"
            alignItems="flex-end"
          >
            <AnimatePresence mode="wait">
              {isOpen && (
                <LazyMotion features={domAnimation}>
                  <m.main
                    initial="initial"
                    animate="in"
                    exit={{ opacity: 0, y: -40 }}
                    variants={variants}
                    transition={drawerTransition as never}
                    style={{ height: '100%' }}
                  >
                    <VStack bgColor="gray.10" spacing={0} h="full" w="100dvw">
                      <Container>
                        <HStack
                          spacing={4}
                          justifyContent="space-between"
                          h="var(--header-height)"
                          alignItems="center"
                          w="full"
                        >
                          <Logo isSmall />
                          <Button
                            variant="popover-btn"
                            p={0}
                            px="0.4rem"
                            w="4rem"
                            h="4rem"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            onClick={onToggle}
                          >
                            <Icon as={CloseIcon} fontSize="2rem" />
                          </Button>
                        </HStack>
                      </Container>
                      <Flex
                        flexDir="column"
                        w="full"
                        h="full"
                        position="relative"
                      >
                        {NAV_ITEMS.map((navItem) => (
                          <Link
                            p={6}
                            fontSize="1.5rem"
                            fontWeight={500}
                            color="gray.400"
                            _hover={{
                              textDecoration: 'none',
                              color: 'gray.500'
                            }}
                            as={NextLink}
                            key={navItem.label}
                            href={navItem.href}
                          >
                            {navItem.label}
                          </Link>
                        ))}
                      </Flex>
                    </VStack>
                  </m.main>
                </LazyMotion>
              )}
            </AnimatePresence>
          </Flex>
        </RemoveScroll>
      </Flex>
    </Flex>
  )
})
