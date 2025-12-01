import { Box, Heading, Input, Text, useToast, VStack } from '@chakra-ui/react';
import { Actions } from '@/components/ui';
import { usePopup } from '@/providers/popupProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { disable2fa } from '@/services/auth';
import { QUERY_FACTORY } from '@/common/constants/queryFactory';
import { useState } from 'react';
import { getErrorMessage } from '@/utils/getErrorMessage';

type IProps = {
  onDisabled: () => void;
};
export const Disable2fa = ({ onDisabled }: IProps) => {
  const { onClose } = usePopup();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [password, setPassword] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: disable2fa,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(QUERY_FACTORY.me, updatedUser);
      onDisabled();
      toast({ title: '2FA Disabled', status: 'success' });
      onClose();
      setPassword('');
    },
    onError: (error) => {
      toast({ title: getErrorMessage(error), status: 'error' });
    },
  });

  return (
    <VStack
      spacing="2rem"
      minW={{ xs: 'full', sm: 'xl' }}
      alignItems="start"
      p={1}
    >
      <Heading size="md" fontSize="2rem" textAlign="center">
        Disable 2FA
      </Heading>
      <Box w="full">
        <Text fontSize="1.5rem" mb={4}>
          To proceed you have to enter your password.
        </Text>
        <Input
          variant="base"
          type="password"
          placeholder="Current Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isDisabled={isPending}
        />
      </Box>

      <Actions
        isDisabled={!password}
        isLoading={isPending}
        onClose={onClose}
        onApply={() => mutate(password)}
        applyText="Disable"
        cancelText="Cancel"
      />
    </VStack>
  );
};
