import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import AuthCode from 'react-auth-code-input';
import { Box, Flex, Text, useToast, VStack } from '@chakra-ui/react';
import { Actions } from '@/components/ui';
import { usePopup } from '@/providers/popupProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { verify2fa } from '@/services/auth';
import { QUERY_FACTORY } from '@/common/constants/queryFactory';
import { getErrorMessage } from '@/utils/getErrorMessage';

interface IProps {
  data: string;
  onVerified: () => void;
}

export const Qr2fa = ({ data, onVerified }: IProps) => {
  const { onClose } = usePopup();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [verifyCode, setVerifyCode] = useState('');
  const [step, setStep] = useState(0);

  const verifyMutation = useMutation({
    mutationFn: verify2fa,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(QUERY_FACTORY.me, updatedUser);
      toast({ title: '2FA verified', status: 'success' });
      onClose();
      onVerified();
    },
    onError: (error) => {
      toast({ title: getErrorMessage(error), status: 'error' });
    },
  });

  const handleOnChange = (res: string) => {
    setVerifyCode(res);
  };

  const onYes = () => {
    if (step === 0) {
      setStep(step + 1);
    } else {
      verifyMutation.mutate(verifyCode);
    }
  };

  const onCancel = () => {
    if (step === 1) {
      setStep(0);
    } else {
      onClose();
    }
  };

  return (
    <VStack
      spacing="2rem"
      minW={{ xs: 'full', sm: 'xl' }}
      alignItems="start"
      p={1}
    >
      <Box w="full">
        {step === 0 ? (
          <>
            <Text fontSize="1.5rem" mb={4}>
              Scan this QR code with your authenticator app (Google
              Authenticator, Authy, etc.)
            </Text>
            <Flex my={6} justifyContent="center" alignItems="center">
              <QRCodeSVG value={data} size={180} />
            </Flex>
          </>
        ) : (
          <>
            <Text fontSize="1.5rem" mb={4}>
              Enter the 6-digit code from your app
            </Text>
            <AuthCode
              allowedCharacters="numeric"
              onChange={handleOnChange}
              inputClassName="auth-code-input"
              containerClassName="auth-code-input-container"
            />
          </>
        )}
      </Box>

      <Actions
        isDisabled={step === 1 ? verifyCode.length !== 6 : false}
        isLoading={verifyMutation.isPending}
        onClose={onCancel}
        onApply={onYes}
        applyText={step === 0 ? 'Next' : 'Verify'}
        cancelText={step === 0 ? 'Cancel' : 'Back'}
      />
    </VStack>
  );
};
