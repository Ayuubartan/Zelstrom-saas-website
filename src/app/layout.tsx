import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata = {
  title: 'Zelstrom Analytics',
  description: 'Predictive AI for media optimization',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

