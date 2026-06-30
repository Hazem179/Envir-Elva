import type { Metadata } from 'next'
import { Fredoka, Nunito } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})
const nunito = Nunito({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Envir & Elva — Learn to Save Our Planet',
  description:
    'Join Envir and Elva on a playful eco-adventure: scroll the story, read comics, and become an eco-hero.',
}

export const viewport = {
  themeColor: '#0f4f3b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
