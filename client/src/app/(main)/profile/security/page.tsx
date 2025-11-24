import { VStack } from '@chakra-ui/react';
import { SecurityForm } from '@/containers/profile/security';

export default function SecurityPage() {
  return (
    <VStack spacing={6} flex={1}>
      <SecurityForm />
    </VStack>
  );
}
