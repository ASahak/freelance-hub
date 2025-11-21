'use client';

import { memo, useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Heading,
  Switch,
  VStack,
} from '@chakra-ui/react';
import { useAuth } from '@/providers/authProvider';

export const TwoFactorAuth = memo(() => {
  const { user } = useAuth();
  const [enabled, setEnabled] = useState(false);

  const onChange = () => {
    setEnabled(!enabled);
  };

  useEffect(() => {
    if (user) {
      setEnabled(user.isTwoFactorEnabled);
    }
  }, [user]);

  return (
    <VStack spacing={4} alignItems="start" w="full">
      <Heading mb={4} fontSize="2.2rem" fontWeight={500}>
        Two factor authentication
      </Heading>
      <FormControl display="flex" alignItems="center" gap={4}>
        <Switch
          isChecked={enabled}
          size="lg"
          id="two-factor"
          onChange={onChange}
        />
        <FormLabel
          htmlFor="two-factor"
          mb="0"
          fontSize="1.4rem"
          fontWeight={400}
          cursor="pointer"
        >
          Enable 2fa
        </FormLabel>
      </FormControl>
    </VStack>
  );
});
