'use client';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';
import {
  FaSearch,
  FaUpload,
  FaCheckCircle,
  FaBriefcase,
  FaStar,
  FaUsers,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

type IFeature = {
  icon: IconType;
  title: string;
  description: string;
};
const FeatureItem = ({
  icon,
  colorScheme,
  title,
  description,
}: IFeature & { colorScheme: string }) => (
  <HStack alignItems="start" spacing={4}>
    <Box
      bg={`${colorScheme}.100`}
      w="4rem"
      h="4rem"
      p={2}
      borderRadius="lg"
      mt={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Icon as={icon} fontSize="1.8rem" color={`${colorScheme}.500`} />
    </Box>
    <Box>
      <Text fontWeight="semibold" fontSize="1.6rem" mb={1}>
        {title}
      </Text>
      <Text color="gray.500" fontSize="1.4rem">
        {description}
      </Text>
    </Box>
  </HStack>
);

const clientFeatures: IFeature[] = [
  {
    icon: FaUpload,
    title: 'Post Your Project',
    description: 'Describe your project and requirements in detail.',
  },
  {
    icon: FaUsers,
    title: 'Receive Proposals',
    description: 'Get competitive bids from qualified freelancers.',
  },
  {
    icon: FaCheckCircle,
    title: 'Hire & Collaborate',
    description: 'Choose the best freelancer and start working together.',
  },
];

const freelancerFeatures = [
  {
    icon: FaSearch,
    title: 'Browse Opportunities',
    description: 'Find projects that match your skills and interests.',
  },
  {
    icon: FaUpload,
    title: 'Submit Proposals',
    description: 'Send personalized proposals to win projects.',
  },
  {
    icon: FaCheckCircle,
    title: 'Get Paid Securely',
    description: 'Receive payments safely through our platform.',
  },
];

export const UserTypes = () => {
  return (
    <Box as="section" py={20}>
      <VStack spacing={6} textAlign="center" mb={16}>
        <Heading
          as="h2"
          fontWeight="bold"
          fontSize={{ base: '3xl', md: '5xl' }}
        >
          Whether you&apos;re hiring or looking for work,
          <br />
          <Text
            as="span"
            bgGradient="linear(to-r, blue.500, purple.500)"
            bgClip="text"
          >
            we&apos;ve got you covered
          </Text>
        </Heading>
        <Text fontSize="2rem" color="gray.400" mx="auto">
          Choose your journey and join thousands of successful professionals
        </Text>
      </VStack>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={12}
        maxW="100rem"
        mx="auto"
      >
        {/* For Clients Card */}
        <Card
          size="lg"
          p={6}
          variant="outline"
          className="group"
          borderColor="gray.100"
          borderWidth={2}
          transition="all 0.3s ease"
          _hover={{
            boxShadow: 'xl',
            borderColor: 'blue.200',
          }}
        >
          <CardHeader textAlign="center" pb={8}>
            <Box
              bgGradient="linear(to-br, blue.400, blue.300)"
              p={4}
              borderRadius="2xl"
              w="fit-content"
              mx="auto"
              mb={6}
              boxShadow="lg"
            >
              <Icon as={FaBriefcase} boxSize={12} color="white" />
            </Box>
            <Heading as="h3" size="lg" mb={3}>
              For Clients
            </Heading>
            <Text fontSize="1.6rem" textAlign="center" color="gray.500">
              Find skilled freelancers for your projects
            </Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={6}>
              <VStack spacing={4} align="stretch" w="full">
                {clientFeatures.map((feature) => (
                  <FeatureItem
                    key={feature.title}
                    {...feature}
                    colorScheme="blue"
                  />
                ))}
              </VStack>
              <Button variant="primary" w="full" size="lg">
                Post a Project
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {/* For Freelancers Card */}
        <Card
          size="lg"
          p={6}
          variant="outline"
          className="group"
          borderColor="gray.100"
          borderWidth={2}
          transition="all 0.3s ease"
          _hover={{
            boxShadow: 'xl',
            borderColor: 'purple.100',
          }}
        >
          <CardHeader textAlign="center" pb={8}>
            <Box
              bgGradient="linear(to-br, purple.400, purple.500)"
              p={4}
              borderRadius="2xl"
              w="fit-content"
              mx="auto"
              mb={6}
              boxShadow="lg"
            >
              <Icon as={FaStar} boxSize={12} color="white" />
            </Box>
            <Heading as="h3" size="lg" mb={3}>
              For Freelancers
            </Heading>
            <Text fontSize="1.6rem" textAlign="center" color="gray.500">
              Showcase your skills and find great projects
            </Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={6}>
              <VStack spacing={4} align="stretch" w="full">
                {freelancerFeatures.map((feature) => (
                  <FeatureItem
                    key={feature.title}
                    {...feature}
                    colorScheme="purple"
                  />
                ))}
              </VStack>
              <Button variant="purple" w="full" size="lg">
                Start Freelancing
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};
