import { memo, type ReactNode } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Text,
  useColorMode,
  UseToastOptions
} from '@chakra-ui/react'

const colorScheme = (
  status: string,
  isDark: boolean
): { bgColor: string; color: string; icon: ReactNode | null } => {
  switch (status) {
    case 'success':
      return {
        icon: (
          <Text
            as="span"
            fontSize="2.4rem"
            className="icon-check-round"
            color="green.700"
          />
        ),
        bgColor: isDark ? '#1B3830' : '#CFECE2',
        color: isDark ? 'white' : 'black'
      }
    case 'info':
      return {
        icon: (
          <Text
            as="span"
            fontSize="2.4rem"
            className="icon-notification"
            color="blue.300"
          />
        ),
        bgColor: isDark ? '#253046' : '#D3DFFA',
        color: isDark ? 'white' : 'black'
      }
    case 'error':
      return {
        icon: (
          <Text
            as="span"
            fontSize="2.4rem"
            className="icon-notification"
            color="red.700"
          />
        ),
        bgColor: isDark ? '#41292A' : '#F1DBDB',
        color: isDark ? 'white' : 'black'
      }
    default:
      return {
        icon: null,
        bgColor: 'initial',
        color: 'initial'
      }
  }
}

export const Toast = memo((props: UseToastOptions) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const { bgColor, color, icon } = colorScheme(props.status as string, isDark)
  return (
    <Alert
      borderRadius="1.2rem"
      bgColor={bgColor}
      color={color}
      p="1.46rem"
      fontSize="1.4rem"
    >
      {icon ? (
        <AlertIcon boxSize="2.6rem" display="flex" alignItems="center">
          {icon}
        </AlertIcon>
      ) : null}
      <Box>
        <AlertTitle m={0} fontSize="1.6rem">
          {props.title}
        </AlertTitle>
        {props.description && (
          <AlertDescription display="block" mt={3} fontSize="1.4rem">
            {props.description}
          </AlertDescription>
        )}
      </Box>
    </Alert>
  )
})
