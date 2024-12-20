import type { Metadata } from 'next'
import { Chivo } from 'next/font/google'
import './globals.css'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import GlobalCssPriority from '../components/globalCssPriority'
import { GlobalStoreProvider } from '../store'

const chivo = Chivo({
  variable: '--font-chivo-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Questions Book',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={chivo.className}>
        <GlobalStoreProvider>
          <GlobalCssPriority>
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          </GlobalCssPriority>
        </GlobalStoreProvider>
      </body>
    </html>
  )
}
