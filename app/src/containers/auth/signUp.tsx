'use client'

import { useState, FormEvent } from 'react'
import NextLink from 'next/link'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
  VStack,
  Divider
} from '@chakra-ui/react'
import {
  FaBriefcase,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaUser
} from 'react-icons/fa'
import { ROUTES } from '@/common/constants/routes'
import { Logo } from '@/components/ui'
import { FcGoogle } from 'react-icons/fc'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'freelancer'
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Authentication logic will be handled by Supabase integration
    console.log('Sign up attempt:', formData)
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
            Create your account
          </Heading>
          <Text color="gray.400" display="inline" fontSize="1.4rem">
            Join thousands of freelancers and clients
          </Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={6}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl as="fieldset" isRequired>
                  <FormLabel as="legend" fontSize="1.6rem">
                    I want to:
                  </FormLabel>
                  <RadioGroup
                    value={formData.userType}
                    onChange={(value) =>
                      setFormData({ ...formData, userType: value })
                    }
                  >
                    <SimpleGrid columns={2} spacing={4}>
                      <Radio value="freelancer">
                        <Text as="span" fontSize="1.4rem">
                          Find Work
                        </Text>
                      </Radio>
                      <Radio value="client">
                        <Text as="span" fontSize="1.4rem">
                          Hire Talent
                        </Text>
                      </Radio>
                    </SimpleGrid>
                  </RadioGroup>
                </FormControl>

                <SimpleGrid columns={2} spacing={4} w="full">
                  <FormControl isRequired>
                    <FormLabel htmlFor="firstName" fontSize="1.4rem">
                      First Name
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        left={2}
                        bottom={0}
                        m="auto"
                      >
                        <Icon as={FaUser} color="gray.400" fontSize="1.6rem" />
                      </InputLeftElement>
                      <Input
                        id="firstName"
                        variant="base"
                        pl={14}
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value
                          })
                        }
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="lastName" fontSize="1.4rem">
                      Last Name
                    </FormLabel>
                    <Input
                      id="lastName"
                      variant="base"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </FormControl>
                </SimpleGrid>

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
                      placeholder="your@email.com"
                      variant="base"
                      pl={14}
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
                      placeholder="Create a password"
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

                <FormControl isRequired>
                  <FormLabel htmlFor="confirmPassword" fontSize="1.4rem">
                    Confirm Password
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
                      id="confirmPassword"
                      variant="base"
                      pl={14}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value
                        })
                      }
                    />
                    <InputRightElement right={2} bottom={0} m="auto">
                      <Button
                        variant="unstyled"
                        size="lg"
                        display="flex"
                        h="fit-content"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <Icon
                          as={showConfirmPassword ? FaEyeSlash : FaEye}
                          color="gray.500"
                        />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button type="submit" w="full" variant="primary">
                  Create Account
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
              Sign Up with Google
            </Button>

            <Text fontSize="1.4rem" color="gray.400">
              Already have an account?{' '}
              <Link
                as={NextLink}
                href={ROUTES.SIGN_IN}
                color="blue.300"
                fontWeight="medium"
                _hover={{ textDecoration: 'underline' }}
              >
                Sign in
              </Link>
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  )
}

export default SignUp
