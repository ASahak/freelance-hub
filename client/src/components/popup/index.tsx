import { useRef } from 'react';

import { CloseIcon } from '@chakra-ui/icons';
import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Box,
  Button,
  Flex,
} from '@chakra-ui/react';
import { MobileBottomDrawer } from '@/components/features';
import { usePopup } from '@/providers/popupProvider';
import { useGlobalVariables } from '@/providers/globalVariables';

const overlayColor = '#1717177a'; // gray.800/50
type IProps = {
  isNested?: boolean;
};
function Popup({ isNested }: IProps) {
  const { isMobile } = useGlobalVariables();
  const { motionPreset, nested, onCloseComplete, ...rest } = usePopup();
  const { popupSettings, popupTitle, popupType, isOpen, onClose } = isNested
    ? nested
    : rest;

  const isCentered = popupSettings.isCenter ?? true;
  const modalRef = useRef(null);

  const renderContent = () => {
    switch (popupType) {
      default:
        return <div>Unknown popup type</div>;
    }
  };

  return popupSettings.mobileDrawer && isMobile ? (
    <MobileBottomDrawer
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={onCloseComplete}
    >
      <VStack
        spacing={popupSettings.hideCloseIcon ? '0' : '2.4rem'}
        p="1.6rem"
        borderRadius="xl"
        bg="gray.10"
        w="full"
      >
        <Flex
          justifyContent="space-between"
          alignItems="stretch"
          gap={8}
          w="full"
        >
          {popupTitle ? (
            <Box as="header" flex={1}>
              {typeof popupTitle === 'function' ? (
                popupTitle()
              ) : (
                <Heading variant="page-title" fontSize="2rem">
                  {popupTitle}
                </Heading>
              )}
            </Box>
          ) : null}
          {!popupSettings.hideCloseIcon && (
            <Button variant="unstyled" onClick={onClose}>
              <CloseIcon fontSize="1.5rem" color="gray.400" />
            </Button>
          )}
        </Flex>
        <Box w="full" {...popupSettings.modalBodyProps}>
          {renderContent()}
        </Box>
      </VStack>
    </MobileBottomDrawer>
  ) : (
    <Modal
      initialFocusRef={modalRef}
      key={motionPreset}
      isCentered={isCentered}
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      onCloseComplete={onCloseComplete}
      preserveScrollBarGap
      motionPreset={motionPreset as any}
      scrollBehavior="inside"
      closeOnOverlayClick={popupSettings.closeOnOverlayClick}
    >
      <ModalOverlay bg={overlayColor} backdropFilter="blur(2px)" />
      <ModalContent
        my={10}
        ref={modalRef}
        p="2.4rem"
        borderRadius="xl"
        bg="gray.10"
        w={{
          xs: 'calc(100% - 1.6rem)',
          base: 'calc(100% - 3.9rem)',
          md: 'fit-content',
        }}
        maxW="fit-content"
        {...(popupSettings.modalContainerProps || {})}
      >
        <VStack
          spacing={popupSettings.hideCloseIcon ? '0' : '2.4rem'}
          flex={1}
          overflow="hidden"
          minH={0}
        >
          {popupTitle ? (
            <ModalHeader
              w="full"
              p={0}
              pr={!popupSettings.hideCloseIcon ? '3rem' : 0}
            >
              {typeof popupTitle === 'function' ? (
                popupTitle()
              ) : (
                <Heading variant="page-title" fontSize="2rem">
                  {popupTitle}
                </Heading>
              )}
            </ModalHeader>
          ) : null}
          {!popupSettings.hideCloseIcon && (
            <ModalCloseButton fontSize="1.2rem" top="2.4rem" right="2.4rem" />
          )}
          <ModalBody
            w="full"
            p={0}
            {...popupSettings.modalBodyProps}
            overflow="hidden"
            display="grid"
          >
            {renderContent()}
          </ModalBody>
        </VStack>
      </ModalContent>
    </Modal>
  );
}

export default Popup;
