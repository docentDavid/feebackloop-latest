import "./globals.css"

// Verwijder de keywords array omdat die mogelijk problemen veroorzaakt
export const metadata = {
  title: "FeedbackLoop",
  description: "A platform for providing structured feedback to students based on learning outcomes",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}



import './globals.css'