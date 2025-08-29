'use client'

import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { FaSearch, FaComments, FaStar, FaCreditCard } from 'react-icons/fa'
import { Container } from '@/components/ui'

interface Step {
  icon: IconType
  title: string
  description: string
  color: 'primary' | 'secondary' | 'accent' | 'warning'
}

const steps: Step[] = [
  {
    icon: FaSearch,
    title: '1. Post or Browse',
    description: 'Clients post projects, freelancers browse opportunities.',
    color: 'primary'
  },
  {
    icon: FaComments,
    title: '2. Connect & Discuss',
    description: 'Chat about project details and requirements.',
    color: 'secondary'
  },
  {
    icon: FaStar,
    title: '3. Work Together',
    description: 'Collaborate on the project with built-in tools.',
    color: 'accent'
  },
  {
    icon: FaCreditCard,
    title: '4. Get Paid',
    description: 'Secure payments upon project completion.',
    color: 'warning'
  }
]

const getColorStyles = (color: Step['color']) => {
  switch (color) {
    case 'primary':
      return {
        bgGradient: 'linear(to-br, purple.400, purple.600)',
        color: 'white',
        hoverShadow: '0 0 25px rgba(147, 112, 219, 0.7)',
        borderColor: 'purple.200'
      }
    case 'secondary':
      return {
        bgGradient: 'linear(to-br, teal.400, cyan.500)',
        color: 'white',
        hoverShadow: '0 0 25px rgba(0, 128, 128, 0.6)',
        borderColor: 'teal.200'
      }
    case 'accent':
      return {
        bgGradient: 'linear(to-br, pink.400, pink.500)',
        color: 'white',
        hoverShadow: '0 0 25px rgba(218, 112, 214, 0.7)',
        borderColor: 'pink.200'
      }
    case 'warning':
      return {
        bgGradient: 'linear(to-br, orange.400, yellow.500)',
        color: 'white',
        hoverShadow: '0 0 25px rgba(255, 165, 0, 0.6)',
        borderColor: 'orange.200'
      }
  }
}

export const HowItWorks = () => {
  return (
    <Box as="section" py={20}>
      <Container>
        <VStack spacing={6} textAlign="center" mb={16}>
          <Heading
            as="h2"
            fontWeight="bold"
            fontSize={{ base: '3xl', md: '5xl' }}
          >
            How It Works
          </Heading>
          <Text fontSize="2rem" color="gray.400" mx="auto">
            Getting started is simple. Follow these easy steps to begin your
            freelancing journey.
          </Text>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={8}
          maxW="100rem"
          mx="auto"
        >
          {steps.map((step, index) => {
            const styles = getColorStyles(step.color)
            return (
              <Card
                key={index}
                className="group"
                variant="outline"
                borderColor="gray.100"
                borderWidth={2}
                transition="all 0.3s ease"
                _hover={{
                  boxShadow: 'xl',
                  borderColor: styles.borderColor
                }}
                position="relative"
                overflow="visible"
              >
                <CardBody px={8} py={10}>
                  <VStack spacing={6} textAlign="center">
                    <Flex
                      borderRadius="2xl"
                      justifyContent="center"
                      alignItems="center"
                      w="5rem"
                      h="5rem"
                      mx="auto"
                      boxShadow="lg"
                      transition="all 0.3s ease"
                      bgGradient={styles.bgGradient}
                      color={styles.color}
                    >
                      <Icon as={step.icon} boxSize={8} />
                    </Flex>
                    <Heading as="h3" size="lg">
                      {step.title}
                    </Heading>
                    <Text color="gray.400" fontSize="1.6rem" textAlign="center">
                      {step.description}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            )
          })}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
