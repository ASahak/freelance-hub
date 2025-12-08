import type { Metadata } from 'next';
import { IWithChildren } from '@/common/types/global';
import BaseLayout from '@/components/layout/base';

export const metadata: Metadata = {
  title: 'FreelanceHub | Home',
  description: 'FreelanceHub' /* todo */,
};

export default function MainLayout({ children }: Readonly<IWithChildren<any>>) {
  return <BaseLayout>{children}</BaseLayout>;
}
