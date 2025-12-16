import { Container, Tile } from '@/components/ui';
import { Divider, Grid, GridItem, VStack } from '@chakra-ui/react';
import { Avatar } from '@/containers/profile/avatar';
import { SectionsPanel } from '@/containers/profile/sectionsPanel';
import { IChildren } from '@/common/types/global';
import { Info } from '@/containers/profile/info';
import { ProfileProvider } from '@/providers/profileProvider';

export default function ProfileLayout({ children }: IChildren) {
  return (
    <ProfileProvider>
      <Container display="flex">
        <Grid
          templateColumns={{ base: '1fr', md: '30rem 1fr' }}
          gap={6}
          py={8}
          flex={1}
        >
          <GridItem display="flex">
            <Tile flex={1}>
              <VStack spacing={4}>
                <Avatar />
                <Info />
                <Divider my={4} />
                <SectionsPanel />
              </VStack>
            </Tile>
          </GridItem>

          <GridItem display="flex">{children}</GridItem>
        </Grid>
      </Container>
    </ProfileProvider>
  );
}
