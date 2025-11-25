import { ReactNode } from 'react';

import { Button, Flex } from '@chakra-ui/react';

type IProps = {
  btnSize?: 'sm' | 'md';
  cancelText: string;
  applyText: (() => ReactNode) | string;
  onClose: () => void;
  onApply: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
};
export const Actions = ({
  onClose,
  onApply,
  applyText,
  cancelText,
  isDisabled,
  isLoading,
  btnSize = 'md',
}: IProps) => {
  return (
    <Flex justifyContent="space-between" gap="1.2rem" w="full">
      <Button
        aria-label="Close"
        onClick={onClose}
        variant="light"
        size={btnSize}
        flex={1}
        fontSize="1.4rem"
      >
        {cancelText}
      </Button>
      <Button
        isLoading={isLoading}
        isDisabled={isDisabled}
        onClick={onApply}
        aria-label="Apply"
        variant="primary"
        size={btnSize}
        flex={1}
        fontSize="1.4rem"
      >
        {typeof applyText === 'function' ? applyText() : applyText}
      </Button>
    </Flex>
  );
};
