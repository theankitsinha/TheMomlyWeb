import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Momly: Login",
    description: "Connect with women and experts who are there to listen, support and offer valuable advice on fertility, pregnancy, motherhood and parenting",
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
