import { Flex } from '@chakra-ui/react';
import ResetPassword from '@/containers/auth/resetPassword';

export default function ResetPasswordPage() {
  return (
    <Flex w="full" h="100dvh" align="center" justify="center" bg="gray.50">
      <ResetPassword />
    </Flex>
  );
}
