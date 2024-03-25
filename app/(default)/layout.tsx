import "../globals.css";
import React from "react";
import MainLayout from "@/components/layout/MainLayout";


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <MainLayout>{children} </MainLayout>
    );
}
