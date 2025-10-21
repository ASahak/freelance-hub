import { Container } from '@/components/ui';
import { Hero } from '@/containers/home/hero';
import { UserTypes } from '@/containers/home/userTypes';
import { HowItWorks } from '@/containers/home/howItWorks';

export default function Home() {
  return (
    <Container>
      <Hero />
      <UserTypes />
      <HowItWorks />
    </Container>
  );
}
