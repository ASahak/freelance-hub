import type { Metadata } from 'next';
import { IChildren } from '@/common/types/global';
import BaseLayout from '@/components/layout/base';

export const metadata: Metadata = {
  title: 'FreelanceHub | Home',
  description: 'FreelanceHub' /* todo */,
};

export default function MainLayout({ children }: Readonly<IChildren>) {
  return <BaseLayout>{children}</BaseLayout>;
}
