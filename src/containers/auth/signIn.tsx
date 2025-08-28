'use client'

import { useState, FormEvent } from 'react'
import NextLink from 'next/link'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Text,
  VStack,
  Divider
} from '@chakra-ui/react'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Logo } from '@/components/ui'
import { ROUTES } from '@/common/constants/routes'

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Authentication logic will be handled by Supabase integration
    console.log('Sign in attempt:', formData)
  }

  return (
    <VStack spacing={8} w="full" maxW="2xl" position="relative" zIndex={1}>
      <Logo />

      <Card
        p={8}
        w="full"
        shadow="lg"
        borderWidth={1}
        rounded="xl"
        borderColor="gray.100"
        bg="white"
      >
        <CardHeader textAlign="center">
          <Heading as="h1" size="xl" fontWeight="bold">
            Welcome back
          </Heading>
          <Text color="gray.400" display="inline" fontSize="1.4rem">
            Sign in to your FreelanceHub account
          </Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={6}>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel htmlFor="email" fontSize="1.4rem">
                    Email
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      left={2}
                      bottom={0}
                      m="auto"
                    >
                      <Icon
                        as={FaEnvelope}
                        color="gray.400"
                        fontSize="1.6rem"
                      />
                    </InputLeftElement>
                    <Input
                      id="email"
                      type="email"
                      variant="base"
                      pl={14}
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="password" fontSize="1.4rem">
                    Password
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      left={2}
                      bottom={0}
                      m="auto"
                    >
                      <Icon as={FaLock} color="gray.400" fontSize="1.6rem" />
                    </InputLeftElement>
                    <Input
                      id="password"
                      variant="base"
                      pl={14}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <InputRightElement right={2} bottom={0} m="auto">
                      <Button
                        variant="unstyled"
                        size="lg"
                        display="flex"
                        h="fit-content"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon
                          as={showPassword ? FaEyeSlash : FaEye}
                          color="gray.500"
                        />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Flex w="full" justify="flex-end">
                  <Link
                    as={NextLink}
                    href={ROUTES.FORGOT_PASS}
                    fontSize="1.2rem"
                    color="blue.300"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    Forgot password?
                  </Link>
                </Flex>

                <Button type="submit" w="full" variant="primary">
                  Sign In
                </Button>
              </VStack>
            </form>

            <Flex w="full" align="center" gap={4}>
              <Divider />
              <Text
                fontSize="1.2rem"
                color="gray.400"
                whiteSpace="nowrap"
                textTransform="uppercase"
              >
                Or continue with
              </Text>
              <Divider />
            </Flex>

            <Button
              variant="popover-btn"
              w="full"
              justifyContent="center"
              gap={3}
              onClick={() => console.log('google')}
            >
              <Icon as={FcGoogle} fontSize="1.6rem" />
              Sign In with Google
            </Button>

            <Text fontSize="1.4rem" color="gray.400">
              Don&apos;t have an account?{' '}
              <Link
                as={NextLink}
                href={ROUTES.SIGN_UP}
                color="blue.300"
                fontWeight="medium"
                _hover={{ textDecoration: 'underline' }}
              >
                Sign up
              </Link>
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  )
}

export default SignIn
