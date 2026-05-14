import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Leenar Demo',
  description: 'Supabase + Vercel — provisioned by Leenar',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
