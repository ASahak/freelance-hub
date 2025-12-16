'use client';

import { memo } from 'react';
import {
  FormControl,
  FormLabel,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

export const Bio = memo(() => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl w="full">
      <FormLabel htmlFor="bio" fontSize="1.4rem">
        Bio
      </FormLabel>
      <Controller
        name="bio"
        control={control}
        render={({ field }) => (
          <Textarea
            id="bio"
            placeholder="I am a Senior Software Engineer..."
            variant="base"
            rows={5}
            {...field}
          ></Textarea>
        )}
      />
      <ErrorMessage
        errors={errors}
        name="bio"
        render={({ message }) => (
          <Text w="full" color="red.300" fontSize="1.3rem">
            {message}
          </Text>
        )}
      />
    </FormControl>
  );
});
