import { Flex } from '@chakra-ui/react';
import Verify2fa from '@/containers/auth/verify2fa';

export default function Verify2faPage() {
  return (
    <Flex w="full" h="100dvh" align="center" justify="center" bg="gray.50">
      <Verify2fa />
    </Flex>
  );
}
