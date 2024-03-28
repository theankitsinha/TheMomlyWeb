'use client'
import React, {useEffect, useState} from 'react';
import ComponentsAuthLoginForm from "@/components/auth/components-auth-login-form";
import {SocketProvider} from "@/components/SocketProvider";
import AuthQRLogin from "@/components/auth/AuthQRLogin";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

const CoverLogin = () => {
    const router = useRouter();
    const {status} = useSession();
    if (status === 'authenticated') {
        router.push('/');
    }
    const [width, setWidth] = useState<number>();

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWidth(window.innerWidth);
            window.addEventListener('resize', handleWindowSizeChange);
            return () => {
                window.removeEventListener('resize', handleWindowSizeChange);
            }
        }

    }, []);

    const isMobile = width! <= 768;
    return (
        <>
            <div
                className="flex min-h-screen w-full justify-center  bg-[url('/assets/images/auth/bg.svg')]">
                <div
                    className="p-5 h-[20%] my-auto flex items-center justify-center bg-white w-[90%] sm:w-1/2 rounded-2xl drop-shadow-2xl">
                    <div className="flex flex-col w-full h-full">
                        <div className="my-auto flex flex-col md:grid grid-cols-3 justify-evenly">

                            <div className="m-5 col-span-2">
                                {/*<div className="">*/}
                                {/*    <AuthSliderLayout/>*/}
                                {/*</div>*/}
                                <div className="flex flex-col space-y-2 text-center">
                                    <h1 className="text-2xl font-semibold tracking-tight">
                                        Welcome back!
                                    </h1>
                                    <p className="text-sm text-muted-foreground">
                                        We're so excited to see you again!
                                    </p>
                                </div>
                                <div className="mx-auto mt-2">
                                    <ComponentsAuthLoginForm/>
                                </div>
                            </div>
                            {!isMobile && (
                                <div className="flex flex-col items-center justify-center p-2">
                                    <SocketProvider>
                                        <AuthQRLogin/>
                                    </SocketProvider>
                                </div>
                            )}
                        </div>

                        <div className="mt-5">
                            <p className="mb-0 text-center text-15 text-slate-500 dark:text-zink-200">
                                © {new Date().getFullYear()} The Momly
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default CoverLogin;
