'use client';

import { memo, useRef, ChangeEvent } from 'react';
import {
  Flex,
  Avatar as ChakraAvatar,
  Button,
  useToast,
  Icon,
  VStack,
  Heading,
} from '@chakra-ui/react';
import { RxShare2, RxTrash } from 'react-icons/rx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeAvatar, uploadAvatar } from '@/services/user';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { QUERY_FACTORY } from '@/common/constants/queryFactory';
import { useAuth } from '@/providers/authProvider';
import Skeleton from 'react-skeleton-builder';
import { SmartImage } from '@/components/ui';

export const Avatar = memo(() => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const uploadMutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (updatedUser) => {
      // Update the cache immediately with the new user data
      queryClient.setQueryData(QUERY_FACTORY.me, updatedUser);
      toast({
        title: 'Avatar Updated',
        status: 'success',
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

  const removeMutation = useMutation({
    mutationFn: removeAvatar,
    onSuccess: (updatedUser) => {
      // Update the cache immediately with the new user data
      queryClient.setQueryData(QUERY_FACTORY.me, updatedUser);
      toast({
        title: 'Avatar removed',
        status: 'success',
      });
    },
    onError: (error) => {
      toast({
        title: 'Remove Failed',
        description: getErrorMessage(error),
        status: 'error',
      });
    },
  });

  const onRemove = () => {
    removeMutation.mutate();
  };

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Reset the input value so the user can re-upload the same file
    if (fileInputRef.current) fileInputRef.current.value = '';

    if (!file) return;

    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(image.src); // Clean up memory
      uploadMutation.mutate(file);
    };
  };

  // This triggers the hidden file input
  const onChooseFile = () => {
    fileInputRef.current?.click();
  };

  const isUploading = uploadMutation.isPending;

  return (
    <VStack spacing={3} w="full">
      <Flex
        w="14rem"
        h="14rem"
        pos="relative"
        overflow="hidden"
        rounded="full"
        role="group"
      >
        {isUploading ? (
          <Skeleton
            styles={{ width: '14rem', height: '14rem' }}
            grid={{ skeletons: [{ r: '100%' }] }}
          />
        ) : (
          <>
            {!user?.avatarUrl ? (
              <ChakraAvatar size="2xl" w="full" h="full" name={user?.name} />
            ) : (
              <SmartImage
                src={user.avatarUrl}
                alt="Avatar"
                fill
                priority
                containerProps={{ w: '14rem', h: '14rem' }}
                sizes="25rem"
                style={{
                  objectFit: 'cover',
                  borderRadius: '100%',
                }}
              />
            )}

            <Flex
              pos="absolute"
              w="full"
              h="full"
              opacity={0}
              visibility="hidden"
              transition=".2s"
              bgColor="rgba(0, 0, 0, .7)"
              _groupHover={{ opacity: 1, visibility: 'visible' }}
            >
              <Flex
                _groupHover={{ transform: 'translateY(0px)' }}
                transition=".2s"
                transform="translateY(10px)"
                justifyContent="center"
                alignItems="center"
                w="full"
                h="full"
                gap={6}
              >
                <Button variant="unstyled" onClick={onChooseFile}>
                  <Icon as={RxShare2} fontSize="2.8rem" color="white" />
                </Button>
                {user?.avatarUrl ? (
                  <Button variant="unstyled" onClick={onRemove}>
                    <Icon as={RxTrash} fontSize="2.8rem" color="red.400" />
                  </Button>
                ) : null}
              </Flex>
            </Flex>
          </>
        )}

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={onUpload}
          accept="image/png, image/jpeg, image/webp"
          style={{ display: 'none' }}
        />
      </Flex>
      <Heading isTruncated w="full" textAlign="center">
        {user?.name}
      </Heading>
    </VStack>
  );
});
