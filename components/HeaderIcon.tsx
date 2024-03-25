import React from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

function HeaderIcon({ActiveIcon, DisabledIcon, link, className, title}: {
    link: string,
    title?: string,
    className?: string,
    ActiveIcon: any
    DisabledIcon: any
}) {
    const pathname = usePathname()
    const active = pathname === link
    return (
        <>
            <li className={cn("w-1/5 md:w-max text-center rounded-xl hover:bg-gray-200 inline-block", className)}>
                <Link
                    href={link}
                    className={cn("w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center flex justify-center md:inline-block  dark:hover:bg-dark-third dark:text-dark-txt", active ? "border-b-4  border-primary text-primary" : "text-gray-600")}
                >
                    {active ? (<ActiveIcon
                        className="w-5 h-auto sm:w-7 m-1 text-current "
                    />) : (<DisabledIcon
                        className="w-5 h-auto sm:w-7 m-1 text-current "
                    />)}


                </Link>
            </li>
        </>
    );
}

export default HeaderIcon;
