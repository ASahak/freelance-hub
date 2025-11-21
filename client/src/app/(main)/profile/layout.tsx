import { Container } from '@/components/ui';
import { Divider, Grid, GridItem, VStack } from '@chakra-ui/react';
import { Avatar } from '@/containers/profile/avatar';
import { SectionsPanel } from '@/containers/profile/sectionsPanel';
import { IChildren } from '@/common/types/global';

export default function ProfileLayout({ children }: IChildren) {
  return (
    <Container display="flex">
      <Grid
        templateColumns={{ base: '1fr', md: '30rem 1fr' }}
        gap={6}
        py={8}
        flex={1}
      >
        <GridItem
          rounded="lg"
          boxShadow="0px 1px 2px 1px #eeeeee"
          px={4}
          py={8}
          minH="full"
        >
          <VStack spacing={4}>
            <Avatar />
            <Divider my={4} />
            <SectionsPanel />
          </VStack>
        </GridItem>

        <GridItem p={8} display="flex">
          {children}
        </GridItem>
      </Grid>
    </Container>
  );
}
