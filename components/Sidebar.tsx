'use client'
import SidebarRow from "./SidebarRow";
import {useSession} from "next-auth/react";
import {HiMiniUserCircle, HiMiniUserGroup, HiShoppingCart} from "react-icons/hi2";

function Sidebar() {
    const {data: session} = useSession({required: true});
    return (
        <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px]">
            <SidebarRow src={session ? session.user.image : null} title={session ? session.user.name ?? '' : ''}/>
            <SidebarRow Icon={HiMiniUserCircle} title="Profile"/>
            <SidebarRow Icon={HiMiniUserGroup} title="Connections"/>
            <SidebarRow Icon={HiShoppingCart} title="My Booking"/>
        </div>
    )
}

export default Sidebar
