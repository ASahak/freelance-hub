import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { ChakraProvider, RootProvider } from '@/providers'
import { IChildren } from '@/common/types/global'
import BaseLayout from '@/components/layout/base'

export const metadata: Metadata = {
  title: 'FreelanceHub | Home',
  description: 'FreelanceHub' /* todo */
}

export default async function RootLayout({ children }: Readonly<IChildren>) {
  const cookieStore = await cookies()

  return (
    <html lang="en">
      <body>
        <ChakraProvider cookieStore={cookieStore.toString()}>
          <RootProvider>
            <BaseLayout>{children}</BaseLayout>
          </RootProvider>
        </ChakraProvider>
      </body>
    </html>
  )
}
