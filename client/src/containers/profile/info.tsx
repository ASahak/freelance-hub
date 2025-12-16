'use client';

import { memo } from 'react';
import { Heading, Icon, } from '@chakra-ui/react';
import { useProfile } from '@/providers/profileProvider';
import { Gender } from '@libs/types/profile.type';
import { FcBusinesswoman, FcManager } from "react-icons/fc";

export const Info = memo(() => {
  const { profile } = useProfile();

  return profile?.headline ? (
      <Heading
        as="h4"
        w="full"
        fontWeight={400}
        color="gray.400"
        fontSize="1.6rem"
        textAlign="center"
        alignItems="center"
        display="flex"
        justifyContent="center"
        gap={2}
      >
        {profile.gender ? <Icon as={profile.gender === Gender.male ? FcManager : FcBusinesswoman}/> : null}
        {profile.headline}
      </Heading>
  ) : null;
});
