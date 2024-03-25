import Image from "next/image";
import React from "react";

function SidebarRow({src, Icon, title}: { src?: string | null | undefined, Icon?: any, title: string }) {
    return (
        <div className="flex p-3 cursor-pointer">
            {src && (
                <Image
                    className="rounded-full"
                    src={src}
                    width={30}
                    height={30}
                    layout="fixed"
                    alt={title}/>
            )}
            {Icon && (
                <Icon className="h-8 w-8 text-primary"/>
            )}
            <p className="hidden sm:inline-flex font-medium ml-2 items-center">{title}</p>
        </div>
    )
}

export default SidebarRow
