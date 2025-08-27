'use client'

import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { SmartImage } from '@/components/ui'
import { ROUTES } from '@/common/constants/routes'
import { useRouter } from 'next/navigation'

export const Hero = () => {
  const router = useRouter()

  return (
    <Stack
      align={'center'}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
      direction={{ base: 'column', md: 'row' }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading fontWeight={700} fontSize={{ base: '5xl', lg: '8xl' }}>
          <Text as="span" position="relative">
            Hire the best
          </Text>
          <br />
          <Text as="span" color="blue.400">
            freelancers for your projects!
          </Text>
        </Heading>
        <Text color="gray.300" fontSize="3xl" fontWeight="500">
          Connect with skilled professionals worldwide. From web development to
          graphic design, find the perfect freelancer for your next project.
        </Text>
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: 'column', sm: 'row' }}
        >
          <Button
            size="lg"
            variant="primary"
            onClick={() => router.push(ROUTES.GEEKS)}
          >
            Find Geeks
          </Button>
          <Button
            size="lg"
            justifyContent="center"
            variant="popover-btn"
            fontWeight={600}
            onClick={() => router.push(ROUTES.CREATE_JOB)}
          >
            Post a Job
          </Button>
        </Stack>
      </Stack>
      <Flex
        flex={1}
        justify="center"
        align="center"
        position="relative"
        w="full"
      >
        <Box
          position={'relative'}
          height={{ base: '30rem', md: '35rem', lg: '40rem' }}
          rounded="2xl"
          boxShadow="2xl"
          width="full"
          overflow="hidden"
        >
          <SmartImage
            src="/hero.webp"
            alt="hero"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{
              objectFit: 'cover',
              borderRadius: '0.4rem'
            }}
          />
        </Box>
      </Flex>
    </Stack>
  )
}
