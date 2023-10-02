
import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import Provider from '@/components/Provider';
import { headers } from "next/headers";






export const metadata = {
  title: 'Likesgiving',
  description: 'Generated by create next app',

}



export default function RootLayout({ children }) {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  const isDislike = pathname.includes("dislike")



  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

      <body className={`${inter.className} ${isDislike ? 'blackbg' : ''}`}>

        <Provider>
          {children}
        </Provider>



      </body>
    </html>
  )
}
