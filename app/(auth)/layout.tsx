import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Login to Momly",
};

export default function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
