import type { Metadata } from 'next'
import './globals.css'
import { QuestionsDataProvider } from "./components/QuestionsDataProvider";

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <QuestionsDataProvider>
          {children}
        </QuestionsDataProvider>
      </body>
    </html>
  )
}
