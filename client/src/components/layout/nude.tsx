'use client';

import { Flex } from '@chakra-ui/react';
import { IWithChildren } from '@/common/types/global';
import { AnimatedPage } from '@/components/features';

const NudeLayout = ({ children }: IWithChildren<any>) => {
  return (
    <Flex w="full" h="100dvh" align="center" justify="center" bg="gray.50">
      <AnimatedPage>{children}</AnimatedPage>
    </Flex>
  );
};
export default NudeLayout;
