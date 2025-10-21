'use client';

import { ReactNode } from 'react';
import {
  ReactSkeletonProvider,
  SKELETON_ANIMATION_VARIANTS,
} from 'react-skeleton-builder';
import {
  AuthProvider,
  GlobalVariablesProvider,
  PopupProvider,
  TanStackQueryProvider,
} from '@/providers';

import Popup from '@/components/popup';
import { IUser } from '@/common/interfaces/user';

type IProps = {
  children: ReactNode;
  initialUser: IUser | null;
};

export const RootProvider = ({ children, initialUser }: IProps) => {
  return (
    <ReactSkeletonProvider
      value={{
        skeletonAnimation: 'slide' as SKELETON_ANIMATION_VARIANTS,
        isDark: true,
        colorTheme: {
          dark: {
            main: 'var(--chakra-colors-gray-700)',
            gradient: 'var(--chakra-colors-gray-600)',
          },
          light: { main: '#f1f1f1', gradient: '#ececec' },
        },
      }}
    >
      <TanStackQueryProvider initialUser={initialUser}>
        <GlobalVariablesProvider>
          <PopupProvider>
            <AuthProvider>{children}</AuthProvider>
            <Popup />
          </PopupProvider>
        </GlobalVariablesProvider>
      </TanStackQueryProvider>
    </ReactSkeletonProvider>
  );
};
