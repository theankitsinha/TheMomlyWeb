import {Metadata} from 'next';
import Link from 'next/link';
import React from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";

export const metadata: Metadata = {
    title: 'Momly : 404',
};

const NotFound = () => {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <div
                className="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:aspect-square before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#FF595C_0%,rgba(67,97,238,0)_50.73%)] before:opacity-10 md:py-20">
                <div className="relative">
                    <Image src="/assets/404-light.svg" alt="404"
                           priority
                           width={200} height={200}
                           className="light-img mx-auto -mt-10 w-full max-w-xs object-cover md:-mt-14 md:max-w-xl"/>
                    <p className="mt-5 text-base dark:text-white">The page you requested was not found!</p>
                    <Button className="m-2  w-3/4">
                        <Link href="/">
                            Goto Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
