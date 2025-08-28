import { cookies } from 'next/headers'
import { ChakraProvider, RootProvider } from '@/providers'
import { IChildren } from '@/common/types/global'

export default async function RootLayout({ children }: Readonly<IChildren>) {
  const cookieStore = await cookies()

  return (
    <html lang="en">
      <body>
        <ChakraProvider cookieStore={cookieStore.toString()}>
          <RootProvider>{children}</RootProvider>
        </ChakraProvider>
      </body>
    </html>
  )
}
