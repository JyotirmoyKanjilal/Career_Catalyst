import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Career Catalyst - Your AI Interview Coach",
  description: "Get expert answers to your interview questions instantly. Prepare confidently with Career Catalyst.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  )
}

