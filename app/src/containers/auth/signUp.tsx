'use client'

import { useState } from 'react'
import NextLink from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
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
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
  VStack,
  Divider
} from '@chakra-ui/react'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'
import { ErrorMessage } from '@hookform/error-message'
import { FcGoogle } from 'react-icons/fc'
import { SignUpSchema } from '@/utils/validators'
import { UserRole } from '@/common/enums/user'
import { Logo } from '@/components/ui'
import { ROUTES } from '@/common/constants/routes'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      userType: UserRole.GEEK,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = (data: any) => {
    // This function will only be called if the form is valid.
    console.log('Sign up attempt with validated data:', data)
  }

  const onHandleGoogleAuth = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/callback/google`
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={6}>
                <FormControl as="fieldset">
                  <FormLabel as="legend" fontSize="1.6rem">
                    I want to:
                  </FormLabel>
                  <Controller
                    name="userType"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        <SimpleGrid columns={2} spacing={4}>
                          <Radio value={UserRole.GEEK}>
                            <Text as="span" fontSize="1.4rem">
                              Find Work
                            </Text>
                          </Radio>
                          <Radio value={UserRole.CLIENT}>
                            <Text as="span" fontSize="1.4rem">
                              Hire Talent
                            </Text>
                          </Radio>
                        </SimpleGrid>
                      </RadioGroup>
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="userType"
                    render={({ message }) => (
                      <Text w="full" color="red.300" fontSize="1.3rem">
                        {message}
                      </Text>
                    )}
                  />
                </FormControl>

                <SimpleGrid columns={2} spacing={4} w="full">
                  <FormControl>
                    <FormLabel htmlFor="firstName" fontSize="1.4rem">
                      First Name
                    </FormLabel>
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            left={2}
                            bottom={0}
                            m="auto"
                          >
                            <Icon
                              as={FaUser}
                              color="gray.400"
                              fontSize="1.6rem"
                            />
                          </InputLeftElement>
                          <Input
                            id="firstName"
                            variant="base"
                            pl={14}
                            placeholder="John"
                            {...field}
                          />
                        </InputGroup>
                      )}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="firstName"
                      render={({ message }) => (
                        <Text w="full" color="red.300" fontSize="1.3rem">
                          {message}
                        </Text>
                      )}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="lastName" fontSize="1.4rem">
                      Last Name
                    </FormLabel>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="lastName"
                          variant="base"
                          placeholder="Doe"
                          {...field}
                        />
                      )}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="lastName"
                      render={({ message }) => (
                        <Text w="full" color="red.300" fontSize="1.3rem">
                          {message}
                        </Text>
                      )}
                    />
                  </FormControl>
                </SimpleGrid>

                <FormControl>
                  <FormLabel htmlFor="email" fontSize="1.4rem">
                    Email
                  </FormLabel>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
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
                          {...field}
                        />
                      </InputGroup>
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => (
                      <Text w="full" color="red.300" fontSize="1.3rem">
                        {message}
                      </Text>
                    )}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="password" fontSize="1.4rem">
                    Password
                  </FormLabel>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          left={2}
                          bottom={0}
                          m="auto"
                        >
                          <Icon
                            as={FaLock}
                            color="gray.400"
                            fontSize="1.6rem"
                          />
                        </InputLeftElement>
                        <Input
                          id="password"
                          variant="base"
                          pl={14}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a password"
                          {...field}
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
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => (
                      <Text w="full" color="red.300" fontSize="1.3rem">
                        {message}
                      </Text>
                    )}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="confirmPassword" fontSize="1.4rem">
                    Confirm Password
                  </FormLabel>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          left={2}
                          bottom={0}
                          m="auto"
                        >
                          <Icon
                            as={FaLock}
                            color="gray.400"
                            fontSize="1.6rem"
                          />
                        </InputLeftElement>
                        <Input
                          id="confirmPassword"
                          variant="base"
                          pl={14}
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          {...field}
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
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="confirmPassword"
                    render={({ message }) => (
                      <Text w="full" color="red.300" fontSize="1.3rem">
                        {message}
                      </Text>
                    )}
                  />
                </FormControl>

                <Button
                  type="submit"
                  w="full"
                  variant="primary"
                  isLoading={isSubmitting}
                >
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
              onClick={onHandleGoogleAuth}
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
