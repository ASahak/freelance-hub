'use client'

import { memo } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useGlobalVariables } from '@/providers/globalVariables'
import { NavBar, Logo, Container } from '@/components/ui'

const Header = () => {
  const { isMobile } = useGlobalVariables()

  return (
    <Box
      as="header"
      w="full"
      pos="sticky"
      top={0}
      zIndex={22}
      backdropFilter="blur(4px)"
      bgColor="rgba(255, 255, 255, 0.8)"
      borderBottom="1px solid"
      borderColor="gray.150"
    >
      <Container h="var(--header-height)">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          h="inherit"
          gap="4rem"
        >
          <Logo isSmall={isMobile} />
          <NavBar isMobile={isMobile} />
        </Flex>
      </Container>
    </Box>
  )
}

export default memo(Header)
