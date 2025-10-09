import { Flex } from '@chakra-ui/react'
import SignIn from '@/containers/auth/signIn'

export default function SignInPage() {
  return (
    <Flex w="full" h="100dvh" align="center" justify="center" bg="gray.50">
      <SignIn />
    </Flex>
  )
}
