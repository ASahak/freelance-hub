import { VStack } from '@chakra-ui/react';
import { TwoFactorAuth } from '@/containers/profile/security/twoFactorAuth';

export default function SecurityPage() {
  return (
    <VStack spacing={6} flex={1}>
      <TwoFactorAuth />
    </VStack>
  );
}
