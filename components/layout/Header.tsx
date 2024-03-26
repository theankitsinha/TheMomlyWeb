'use client'
import Image from "next/image";

import HeaderIcon from "../HeaderIcon";
import {signOut, useSession} from "next-auth/react";
import {
    HiArchiveBox,
    HiCalendarDays,
    HiHome,
    HiMiniUsers,
    HiOutlineArchiveBox,
    HiOutlineCalendarDays,
    HiOutlineUsers
} from "react-icons/hi2";
import * as React from "react"
import {IoIosLogOut} from "react-icons/io";
import Link from "next/link";
import {HiOutlineHome} from "react-icons/hi";

function Header() {
    const {data: session, status} = useSession({
        required: true,
    });
    return (
        <>
            {/* NAV */}
            <nav
                className="bg-white dark:bg-dark-second h-max md:h-14 w-full shadow flex flex-col md:flex-row items-center justify-center md:justify-between fixed top-0 z-50 border-b dark:border-dark-third">
                {/* LEFT NAV */}
                <div className="flex items-center justify-between w-full md:w-max px-4 py-2">
                    <Link href="/public" className="mr-2 hidden md:inline-block">
                        <Image
                            src="/assets/logo.svg"
                            priority
                            width={200}
                            height={200}
                            layout="fixed"
                            className="w-40 h-auto"
                            alt='momlyLogo'/>
                    </Link>
                    <Link href="/public" className="inline-block md:hidden">
                        <Image
                            src="/assets/logo.svg"
                            priority
                            width={200}
                            height={200}
                            layout="fixed"
                            className="w-24 h-auto"
                            alt='momlyLogoSmall'/>
                    </Link>
                    <IoIosLogOut onClick={() => signOut()}
                                 className="inline-block md:hidden w-6 h-auto cursor-pointer hover:text-primary"/>
                </div>
                {/* END LEFT NAV */}
                {/* MAIN NAV */}
                <ul className="flex w-full lg:w-max items-center justify-center gap-x-2 md:pl-8">
                    <HeaderIcon ActiveIcon={HiHome} DisabledIcon={HiOutlineHome} link='/' title="Home"/>
                    <HeaderIcon ActiveIcon={HiArchiveBox} DisabledIcon={HiOutlineArchiveBox} link='/explore'
                                title="Explore"/>
                    <HeaderIcon ActiveIcon={HiMiniUsers} DisabledIcon={HiOutlineUsers} link='/meet' title="Meet"/>
                    <HeaderIcon ActiveIcon={HiCalendarDays} DisabledIcon={HiOutlineCalendarDays} link='/event'
                                title="Events"/>
                    <HeaderIcon ActiveIcon={HiHome} DisabledIcon={HiOutlineHome} link='/' className="md:hidden"/>
                </ul>
                {/* END MAIN NAV */}
                {/* RIGHT NAV */}
                <ul className="hidden md:flex mx-4 items-center justify-center">
                    {session && (
                        <li className="h-full hidden xl:flex">
                            <Link
                                href="/profile"
                                className="inline-flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-dark-third mx-1"
                            >
                                <Image
                                    src={session.user.profile.avatar}
                                    width={40}
                                    height={40}
                                    alt={session.user.name ?? ''}
                                    className="rounded-full h-auto w-10"
                                />
                                <span className="mx-2 font-semibold dark:text-dark-txt">{session.user.name}</span>
                            </Link>
                        </li>
                    )}
                    <li>
                        <div
                            onClick={() => signOut()}
                            className="text-xl grid place-items-center bg-gray-200 dark:bg-dark-third dark:text-dark-txt rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative">
                            <IoIosLogOut
                                className="w-5 h-auto cursor-pointer hover:text-primary"/>
                        </div>
                    </li>
                </ul>
                {/* END RIGHT NAV */}
            </nav>
            {/* END NAV */}
        </>

    );
}

export default Header;
