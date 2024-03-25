'use client'
import React from 'react';
import Link from "next/link";
import {signOut} from "next-auth/react"


const LogoutPage = async () => {
    return (
        <div className="w-full max-w-[440px] lg:mt-16">

            <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Log Out</h1>
            <h4 className="text-xl font-bold leading-normal text-white-dark">Are you sure you want to log
                out?</h4>
            <div className="relative inline-flex align-middle gap-4">
                <button
                    className="btn btn-gradient !mt-6 border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] w-[200px]"
                    onClick={() => signOut({callbackUrl: '/auth/login'})}
                >
                    Yes
                </button>
                <Link href='/'
                      className="btn btn-gradient !mt-6 border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] w-[200px]">
                    Cancel
                </Link>
            </div>

        </div>
    );
};

export default LogoutPage;
