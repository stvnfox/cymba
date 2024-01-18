import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './globals.css'

config.autoAddCss = false
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cymba',
  description: 'Cymba is a streamlined application designed to empower music enthusiasts to create, edit, and manage their Spotify playlists effortlessly. Whether you\'re a casual listener or a dedicated curator, Cymba provides a seamless and intuitive platform to enhance your Spotify playlist experience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' container mx-auto text-white bg-neutral-800'}>
          {children}
      </body>
    </html>
  )
}
