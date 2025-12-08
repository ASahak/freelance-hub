import { Box, Text, VStack } from '@chakra-ui/react';
import { Actions } from '@/components/ui';
import { usePopup } from '@/providers/popupProvider';

interface IProps {
  isLoading: boolean;
  onProceed: () => void;
}

export const Confirm = ({ onProceed, isLoading }: IProps) => {
  const { onClose } = usePopup();

  return (
    <VStack
      spacing="2rem"
      minW={{ xs: 'full', sm: 'xl' }}
      alignItems="start"
      p={1}
    >
      <Box w="full">
        <Text fontSize="1.8rem" mb={4}>
          Are you sure to proceed?
        </Text>
      </Box>

      <Actions
        isLoading={isLoading}
        onClose={onClose}
        onApply={onProceed}
        applyText="Confirm"
        cancelText="Cancel"
      />
    </VStack>
  );
};
