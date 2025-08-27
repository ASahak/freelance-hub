import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
  Divider,
  Grid
} from '@chakra-ui/react'
import { Container, Logo } from '@/components/ui'
import { useGlobalVariables } from '@/providers/globalVariables'

const footerLinks = {
  'For Clients': [
    'Post a Project',
    'Browse Freelancers',
    'Enterprise Solutions',
    'Pricing'
  ],
  'For Freelancers': ['Find Work', 'Success Stories', 'Resources', 'Community'],
  Company: ['About Us', 'Careers', 'Press', 'Contact']
}
const Footer = () => {
  const { isMobile } = useGlobalVariables()

  return (
    <Box as="footer" bg="gray.900" color="white" w="full">
      <Container>
        <Box py={16}>
          <Grid
            templateAreas={{
              base: `"logo clients" "freelancers company"`,
              lg: `"logo clients freelancers company"`
            }}
            gap={8}
            templateColumns={{
              base: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)'
            }}
          >
            {/* Brand Column */}
            <VStack gridArea="logo" spacing={6} align="start">
              <HStack spacing={3}>
                <Logo isSmall={isMobile} color="white" />
              </HStack>
              <Text color="whiteAlpha.700" maxW="sm" fontSize="1.4rem">
                The world&apos;s largest marketplace for freelance services.
                Connect, collaborate, and get things done.
              </Text>
            </VStack>

            {/* Links Columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <VStack
                key={category}
                align="start"
                spacing={4}
                gridArea={category.toLowerCase().replace('for ', '')}
              >
                <Heading as="h4" fontSize="1.6rem" fontWeight="semibold">
                  {category}
                </Heading>
                <VStack align="start" spacing={3}>
                  {links.map((link) => (
                    <Link
                      key={link}
                      href="#"
                      color="whiteAlpha.700"
                      _hover={{ color: 'white', textDecoration: 'underline' }}
                      fontSize="1.4rem"
                      transition="color 0.2s ease-in-out"
                    >
                      {link}
                    </Link>
                  ))}
                </VStack>
              </VStack>
            ))}
          </Grid>
        </Box>

        <Divider borderColor="whiteAlpha.300" />

        <Flex
          py={8}
          direction={{ base: 'column-reverse', md: 'row' }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Text color="whiteAlpha.700" fontSize="1.4rem">
            © {new Date().getFullYear()} FreelanceHub. All rights reserved.
          </Text>
          <HStack spacing={6}>
            <Link
              href="#"
              color="whiteAlpha.700"
              _hover={{ color: 'white' }}
              fontSize="1.4rem"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="whiteAlpha.700"
              _hover={{ color: 'white' }}
              fontSize="1.4rem"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              color="whiteAlpha.700"
              _hover={{ color: 'white' }}
              fontSize="1.4rem"
            >
              Cookie Policy
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
export default Footer
