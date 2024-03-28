import type {Metadata} from "next";
import {Noto_Sans as FontSans} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import React, {Suspense} from "react";
import AuthProvider from "@/components/AuthProvider";


const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})
export const metadata: Metadata = {
    title: "Momly : A Safe Space For Women To Find Support",
    description: "Connect with women and experts who are there to listen, support and offer valuable advice on fertility, pregnancy, motherhood and parenting",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <link rel="icon" type="image/png" href="/assets/onlyLogo.svg"/>
            <link rel="apple-touch-icon" type="image/png" href="/assets/onlyLogo.svg"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/assets/onlyLogo.svg"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/assets/onlyLogo.svg"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/assets/onlyLogo.svg"/>
            <link rel="mask-icon" href="/assets/onlyLogo.svg" color="#EE7878"/>
        </head>
        <body
            className={cn(
                "bg-gray-100 dark:bg-dark-main",
                "min-h-screen font-sans antialiased ",
                fontSans.variable
            )}
        >
        <AuthProvider>
            <Suspense>
                {children}
            </Suspense>

        </AuthProvider>
        </body>
        </html>
    );
}
