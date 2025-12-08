'use client';

import { Flex, VStack } from '@chakra-ui/react';
import Header from './header';
import Footer from './footer';
import { IWithChildren } from '@/common/types/global';
import { AnimatedPage } from '@/components/features';

const BaseLayout = ({ children }: IWithChildren<any>) => {
  return (
    <VStack as="main" h="100dvh" overflowX="hidden" spacing={0}>
      <Header />
      <Flex w="full" flex={1}>
        <AnimatedPage>{children}</AnimatedPage>
      </Flex>
      <Footer />
    </VStack>
  );
};
export default BaseLayout;
