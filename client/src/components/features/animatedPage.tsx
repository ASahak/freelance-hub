'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

const variants = {
  initial: { opacity: 0, x: 0, y: -5, zIndex: 2 },
  in: { opacity: 1, x: 0, y: 0, zIndex: 2 },
};
const pageTransition = {
  ease: 'linear',
  duration: 0.2,
};
export const AnimatedPage = memo(
  ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial="initial"
          animate="in"
          variants={variants}
          transition={pageTransition as never}
          style={{
            flex: 1,
            width: '100%',
            minHeight: '100%',
            display: 'flex',
          }}
        >
          <Flex flex={1} w="full">
            {children}
          </Flex>
        </motion.div>
      </AnimatePresence>
    );
  },
);
