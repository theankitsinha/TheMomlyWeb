import React from "react";
import {Metadata} from "next";
import Link from "next/link";
import Image from "next/image";

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
            <div
                className="relative flex flex-col w-full overflow-hidden xl:flex-row  justify-center momly-gradient">

                <div
                    className="min-h-[calc(100vh_-_theme('spacing.4')_*_2)] mx-3  shrink-0 p-10 flex items-center justify-center m-4 bg-white w-1/2 rounded-2xl drop-shadow-2xl">
                    <div className="flex flex-col w-full h-full">
                        <div className="my-auto">
                            {/*<div className="">*/}
                            {/*    <AuthSliderLayout/>*/}
                            {/*</div>*/}
                            <div className="flex flex-col space-y-2 text-center">
                                <Link href="https://themomly.com" target="_blank">
                                    <Image
                                        src="/assets/logo.svg"
                                        alt="momlyLogo"
                                        width={200}
                                        height={100}
                                        className="block mx-auto mb-14 h-16 w-auto"
                                    />
                                </Link>
                                <h1 className="text-2xl font-semibold tracking-tight">
                                    Login to Momly
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Enter your email and password to login
                                </p>
                            </div>
                            <div className="lg:w-[30rem] mx-auto mt-10">
                                {children}
                                <p className="p-4 text-center text-sm text-muted-foreground">
                                    By clicking continue, you agree to our{" "}
                                    <Link
                                        href="https://themomly.com/terms-and-conditions"
                                        className="underline underline-offset-4 hover:text-primary"
                                    >
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="https://themomly.com/privacy-policy"
                                        className="underline underline-offset-4 hover:text-primary"
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>

                        <div className="mt-5">
                            <p className="mb-0 text-center text-15 text-slate-500 dark:text-zink-200">
                                © 2024 The Momly
                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}
