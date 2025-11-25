'use client';

import { memo } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { Controller, useFormContext } from 'react-hook-form';

export const TwoFactorAuth = memo(() => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <VStack spacing={4} alignItems="start" w="full">
      <Heading mb={4} fontSize="2.2rem" fontWeight={500}>
        Two factor authentication
      </Heading>
      <Controller
        name="isTwoFactorEnabled"
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <Box>
            <FormControl display="flex" alignItems="center" gap={4}>
              <Switch
                size="lg"
                id="two-factor"
                ref={ref}
                isChecked={!!value}
                onChange={onChange}
              />
              <FormLabel
                htmlFor="two-factor"
                mb="0"
                fontSize="1.4rem"
                fontWeight={400}
                cursor="pointer"
              >
                {value ? 'Disable' : 'Enable'} 2fa
              </FormLabel>
            </FormControl>
            <ErrorMessage
              errors={errors}
              name="isTwoFactorEnabled"
              render={({ message }) => (
                <Text w="full" color="red.300" fontSize="1.3rem">
                  {message}
                </Text>
              )}
            />
          </Box>
        )}
      />
    </VStack>
  );
});
