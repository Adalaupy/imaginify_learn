import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from '@clerk/nextjs'
import { ContextProvider } from "@/context/ContextProvider"
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";



export const metadata: Metadata = {
    title: "Imaginify",
    description: "AI-powered image generator",
};


const IBMPlex = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ['400', '500', '600', '700'],
    variable: '--font-ibm-plex'
})



export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {


    return (

        <ClerkProvider>
            <ContextProvider>
                <html lang="en">
                    <body className={IBMPlex.className}>
                        {children}
                        <Toaster position="bottom-center" />
                    </body>
                </html>
            </ContextProvider>
        </ClerkProvider>
    );
}