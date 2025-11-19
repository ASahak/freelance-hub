'use client';

import { memo, useRef, ChangeEvent } from 'react';
import {
  Flex,
  Avatar as ChakraAvatar,
  Button,
  VStack,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadAvatar } from '@/services/user';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { User } from '@libs/types/user.type';

// Define your query key factory (assuming you have one)
const QUERY_FACTORY = {
  me: ['user', 'me'],
};

// --- CLIENT-SIDE VALIDATION CONSTRAINTS ---
const MAX_FILE_SIZE_MB = 2; // 2MB
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_DIMENSION = 2000; // 2000x2000px

export const Avatar = memo(() => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Get the user data from the React Query cache
  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: QUERY_FACTORY.me,
    enabled: false, // Assuming user is already fetched by AuthProvider
  });
  const user: User = userData as User;

  // 2. --- UPLOAD MUTATION ---
  const uploadMutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (updatedUser) => {
      // Update the cache immediately with the new user data
      queryClient.setQueryData(QUERY_FACTORY.me, updatedUser);
      toast({
        title: 'Avatar Updated',
        status: 'success',
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: 'Upload Failed',
        description: getErrorMessage(error),
        status: 'error',
      });
    },
  });

  // 4. --- FILE SELECTION & VALIDATION ---
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Reset the input value so the user can re-upload the same file
    if (fileInputRef.current) fileInputRef.current.value = '';

    if (!file) return;

    // Check 1: File Size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast({
        title: 'File Too Large',
        description: `Please select an image smaller than ${MAX_FILE_SIZE_MB}MB.`,
        status: 'error',
      });
      return;
    }

    // Check 2: File Type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast({
        title: 'Invalid File Type',
        description: 'Please select a JPG, PNG, or WebP image.',
        status: 'error',
      });
      return;
    }

    // Check 3: Dimensions
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(image.src); // Clean up memory
      if (image.width > MAX_DIMENSION || image.height > MAX_DIMENSION) {
        toast({
          title: 'Image Too Large',
          description: `Image dimensions must be ${MAX_DIMENSION}x${MAX_DIMENSION}px or smaller.`,
          status: 'error',
        });
      } else {
        // All checks passed, perform the upload
        uploadMutation.mutate(file);
      }
    };
  };

  // 5. --- RENDER LOGIC ---
  if (isUserLoading) {
    return <Spinner />;
  }

  // This triggers the hidden file input
  const onChooseFile = () => {
    fileInputRef.current?.click();
  };

  const isUploading = uploadMutation.isPending;

  return (
    <VStack spacing={4}>
      {/* Chakra's Avatar component automatically shows a placeholder/initials! */}
      <ChakraAvatar
        size="2xl"
        name={user?.name || user?.email}
        src={user?.avatarUrl || ''}
      />

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        style={{ display: 'none' }}
      />

      <Flex gap={3}>
        <Button
          onClick={onChooseFile}
          isLoading={isUploading}
          isDisabled={isUploading}
        >
          Change Avatar
        </Button>
      </Flex>
    </VStack>
  );
});
