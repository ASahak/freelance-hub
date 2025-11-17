import { Container } from '@/components/ui';
import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { Avatar } from '@/containers/profile/avatar';

export default function UserProfile() {
  return (
    <Container>
      <Grid templateColumns="30rem 1fr" gap={2} py={8}>
       <GridItem>
         <VStack spacing={4}>
           <Avatar />
         </VStack>
       </GridItem>
        <GridItem>
          B
        </GridItem>
      </Grid>
    </Container>
  );
}
