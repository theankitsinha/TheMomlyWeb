'use client'
import * as React from "react"
import Link from "next/link";
import {FcAddressBook, FcCalendar, FcLike, FcMusic, FcOldTimeCamera, FcPackage, FcRating} from "react-icons/fc";

function LeftMenu() {
    return (
        <>
            {/* LEFT MENU */}
            <div className="w-1/5 pt-16 h-full hidden xl:flex flex-col fixed top-0 left-0">
                <ul className="p-4">
                    <li>
                        <Link
                            href="/bookings"
                            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
                        >
                            <FcAddressBook
                                className="w-6 h-auto"
                            />
                            <span className="font-semibold">My Bookings</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/calander"
                            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
                        >
                            <FcCalendar
                                className="w-6 h-auto"
                            />
                            <span className="font-semibold">My Calendar</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/articles"
                            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
                        >
                            <FcPackage
                                className="w-6 h-auto"
                            />
                            <span className="font-semibold">Articles</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/podcasts"
                            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
                        >
                            <FcMusic
                                className="w-6 h-auto"
                            />
                            <span className="font-semibold">Podcasts</span>
                        </Link>
                    </li>

                    <li className="border-b border-gray-200 dark:border-dark-third mt-6"/>
                </ul>
                <div className="flex justify-between items-center px-4 h-4 group">
                    <span className="font-semibold text-gray-500 text-lg dark:text-dark-txt">
                      Your shortcuts
                    </span>
                </div>
                <ul className="p-4">
                    <li>
                        <Link
                            href="https://themomly.com/chat"
                            target="_blank"
                            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
                        >
                            <FcRating
                                className="w-6 h-auto"
                            />
                            <span className="font-semibold">
                              Momly AI
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://themomly.com/showcase"
                            target="_blank"
                            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
                        >
                            <FcOldTimeCamera
                                className="w-6 h-auto"
                            />
                            <span className="font-semibold">
                              Event Showcase
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://themomly.com/membership"
                            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
                        >
                            <FcLike
                                className="w-6 h-auto"
                            />
                            <span className="font-semibold">Subscription</span>
                        </Link>
                    </li>
                </ul>
                <div className="mt-auto p-6 text-sm text-gray-500 dark:text-dark-txt grid grid-cols-2">
                    <Link href="https://themomly.com/about-us" target="_blank">About Us</Link>
                    <Link href="https://themomly.com/terms-and-conditions" target="_blank">Terms & Conditions</Link>
                    <Link href="https://themomly.com/privacy-policy" target="_blank">Privacy policy</Link>
                    <Link href="https://themomly.com/guidelines" target="_blank">Guidelines</Link>
                    <Link href="https://themomly.com/cancellation-and-refund-policy" target="_blank"
                          className="col-span-2">Cancellation & Refund Policy</Link>
                    <span>The Momly © {new Date().getFullYear()}</span>
                </div>

            </div>
            {/* END LEFT MENU */}
        </>

    );
}

export default LeftMenu;
